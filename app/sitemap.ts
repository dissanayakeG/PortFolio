import { MetadataRoute } from "next";
import getPostMetaData from "./lib/getPostMetaData";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    const siteUrl = process.env.SITE_URL || "https://madusankadissanayake.com";

    const postMetaData = getPostMetaData();
    
    const postUrls = postMetaData.map((post) => {
        return {
            url: `${siteUrl}/blog/${post.slug}`,
            lastModified: new Date(post.date),
        }
    });

    return [
        {
            url: `${siteUrl}`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${siteUrl}/blog`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${siteUrl}/taxCalculator`,
            lastModified: new Date().toISOString(),
        },
        ...postUrls
    ]
}