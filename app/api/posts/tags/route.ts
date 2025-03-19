import { NextResponse } from "next/server";
import { getPostMetaDataTags } from "@/app/lib/getPostMetaData";

export async function GET() {
    const tags = getPostMetaDataTags();
    return NextResponse.json(tags);
}
