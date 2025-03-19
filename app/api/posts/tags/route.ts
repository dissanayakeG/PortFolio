import { NextResponse } from "next/server";
import { getPostMetaDataTags } from "@/app/lib/getPostMetaData";

export async function GET() {
    try {
        const tags = getPostMetaDataTags();
        return NextResponse.json(tags);
    } catch (error) {
        console.error("Error in API route:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
