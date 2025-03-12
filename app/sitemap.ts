import { MetadataRoute } from "next";
import getPostMetaData from "./lib/getPostMetaData";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    const postMetaData = getPostMetaData();
    
    const postUrls = postMetaData.map((post) => {
        return {
            url: `${process.env.SITE_URL}/blog/${post.slug}`,
            lastModified: new Date(post.date),
        }
    });

    return [
        {
            url: `${process.env.SITE_URL}`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${process.env.SITE_URL}/blog`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${process.env.SITE_URL}/taxCalculator`,
            lastModified: new Date().toISOString(),
        },
        ...postUrls
    ]
}