import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const languageId = parseInt(formData.get("languageId") as string);
    const categoryId = parseInt(formData.get("categoryId") as string);
    const subCategoryIdStr = formData.get("subCategoryId") as string | null;
    const subCategoryName = formData.get("subCategoryName") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const text = await file.text();
    const lines = text.split("\n").filter((line) => line.trim());

    if (lines.length < 2) {
      return NextResponse.json(
        { error: "CSV file must have at least a header and one data row" },
        { status: 400 }
      );
    }

    const header = lines[0].toLowerCase();
    if (!header.includes("word") || !header.includes("meaning")) {
      return NextResponse.json(
        { error: "CSV must have 'word' and 'meaning' columns" },
        { status: 400 }
      );
    }

    let subCategoryId: number | null = null;

    if (subCategoryName?.trim()) {
      const existingSubCategory = await prisma.subCategory.findUnique({
        where: {
          name_categoryId: {
            name: subCategoryName.trim(),
            categoryId,
          },
        },
      });

      if (existingSubCategory) {
        subCategoryId = existingSubCategory.id;
      } else {
        const newSubCategory = await prisma.subCategory.create({
          data: {
            name: subCategoryName.trim(),
            categoryId,
          },
        });
        subCategoryId = newSubCategory.id;
      }
    } else if (subCategoryIdStr) {
      subCategoryId = parseInt(subCategoryIdStr);
    }

    const dataLines = lines.slice(1);
    let importedCount = 0;

    for (const line of dataLines) {
      const trimmedLine = line.trim();
      if (!trimmedLine) continue;

      const parts = trimmedLine.split(",");
      if (parts.length < 2) continue;

      const word = parts[0].trim();
      const meaning = parts.slice(1).join(",").trim();

      if (!word || !meaning) continue;

      try {
        await prisma.word.create({
          data: {
            word,
            languageId,
            categoryId,
            subCategoryId,
            meanings: {
              create: [
                {
                  languageId: 1,
                  meaning,
                },
              ],
            },
            progress: {
              create: {},
            },
          },
        });
        importedCount++;
      } catch (error) {
        console.error(`Failed to import word: ${word}`, error);
      }
    }

    return NextResponse.json({
      success: true,
      count: importedCount,
      message: `Successfully imported ${importedCount} words`,
    });
  } catch (error) {
    console.error("Import error:", error);
    return NextResponse.json(
      { error: "Failed to import CSV file" },
      { status: 500 }
    );
  }
}
