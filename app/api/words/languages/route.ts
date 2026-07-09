import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const languages =
        await prisma.language.findMany();

    return NextResponse.json(languages);
}