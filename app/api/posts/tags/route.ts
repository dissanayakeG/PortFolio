import { NextResponse } from "next/server";
import { getPostMetaDataTags } from "@/app/lib/getPostMetaData";

export async function GET() {
    const posts = getPostMetaDataTags();
    return NextResponse.json(posts);
}
