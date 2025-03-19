// import { NextResponse } from "next/server";
// import { getPostMetaData } from "@/app/lib/getPostMetaData";

// export async function GET() {
//     const posts = getPostMetaData();
//     return NextResponse.json(posts);
// }

import { NextResponse } from "next/server";
import { getPostMetaData } from "@/app/lib/getPostMetaData";

export async function GET() {
    try {
        console.log("Fetching post metadata...");
        const posts = getPostMetaData();
        console.log("Fetched posts:", posts);
        return NextResponse.json(posts);
    } catch (error) {
        console.error("Error in API route:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
