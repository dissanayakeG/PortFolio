import { NextRequest, NextResponse } from "next/server";
import { getPostMetaDataByTags } from "@/app/lib/getPostMetaData";
import { PostMetadata } from "@/app/definitions/Types";



export async function GET(req: NextRequest): Promise<NextResponse> {
    const { searchParams } = new URL(req.url);
    const tag: string | null = searchParams.get("tag");

    console.log('from route:', tag);

    if (!tag) {
        return NextResponse.json({ error: "Tag is required" }, { status: 400 });
    }

    const posts: PostMetadata[] = getPostMetaDataByTags([tag.trim()]);
    return NextResponse.json(posts);
}
