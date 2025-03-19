import { NextResponse } from "next/server";
import { getPostMetaData } from "@/app/lib/getPostMetaData";

export async function GET() {
    try {
        const posts = getPostMetaData();
        return NextResponse.json(posts);
    } catch (error) {
        console.error("Error in API route:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
