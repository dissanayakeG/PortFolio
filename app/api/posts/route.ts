import { NextResponse } from "next/server";
import { getPostMetaData } from "@/app/lib/getPostMetaData";

export async function GET() {
    const posts = getPostMetaData();
    return NextResponse.json(posts);
}
