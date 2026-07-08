import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: {
    params: Promise<{
      id: string
    }>
  }
) {
  const { id } = await context.params;
  const word = await prisma.word.findUnique({
    where: {
      id: Number(id)
    },

    include: {
      language: true,
      category: true,
      subCategory: true,
      meanings: true,
      progress: true
    }
  });

  if (!word) {
    return NextResponse.json(
      {
        message: "Word not found"
      },
      {
        status: 404
      }
    );
  }
  return NextResponse.json(word);
}

export async function PUT(
  request: Request,
  context: {
    params: Promise<{
      id: string
    }>
  }
) {
  const { id } = await context.params;
  const body = await request.json();

  const updated = await prisma.word.update({
    where: {
      id: Number(id)
    },
    data: {
      word: body.word,
      languageId: body.languageId,
      categoryId: body.categoryId,
      subCategoryId: body.subCategoryId
    }
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  request: Request,
  context: {
    params: Promise<{
      id: string
    }>
  }
) {
  const { id } = await context.params;
  await prisma.word.delete({
    where: {
      id: Number(id)
    }
  });
  return NextResponse.json({
    success: true
  });
}