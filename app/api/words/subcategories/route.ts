import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get("categoryId");

  const subCategories = await prisma.subCategory.findMany({
    where: categoryId ? { categoryId: parseInt(categoryId) } : undefined,
    include: {
      category: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return NextResponse.json(subCategories);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, categoryId } = body;

  const existing = await prisma.subCategory.findUnique({
    where: {
      name_categoryId: {
        name,
        categoryId,
      },
    },
  });

  if (existing) {
    return NextResponse.json(existing);
  }

  const newSubCategory = await prisma.subCategory.create({
    data: {
      name,
      categoryId,
    },
    include: {
      category: true,
    },
  });

  return NextResponse.json(newSubCategory);
}
