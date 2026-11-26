import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const URL = "https://madzlabs.com"
    const siteUrl = process.env.SITE_URL || URL;

    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/test"],
        },
        sitemap: `${siteUrl}/sitemap.xml`
    };
}   