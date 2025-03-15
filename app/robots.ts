import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const siteUrl = process.env.SITE_URL || "https://madusankadissanayake.com";

    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/test"],
        },
        sitemap: `${siteUrl}/sitemap.xml`
    };
}   