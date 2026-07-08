import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const { id } = await context.params;
  const body = await request.json();
  const { remembered } = body;

  const wordId = Number(id);

  const existingProgress = await prisma.progress.findUnique({
    where: { wordId },
  });

  if (existingProgress) {
    const updated = await prisma.progress.update({
      where: { wordId },
      data: { remembered },
    });
    return NextResponse.json(updated);
  } else {
    const created = await prisma.progress.create({
      data: {
        wordId,
        remembered,
      },
    });
    return NextResponse.json(created);
  }
}
