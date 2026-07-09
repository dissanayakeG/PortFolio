import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  context: {
    params: Promise<{
      id: string;
      meaningId: string;
    }>;
  }
) {
  const { meaningId } = await context.params;
  const body = await request.json();

  const updated = await prisma.meaning.update({
    where: {
      id: Number(meaningId),
    },
    data: {
      meaning: body.meaning,
    },
  });

  return NextResponse.json(updated);
}
