import fs from "fs";
import Markdown from "markdown-to-jsx";
import { getPostMetaData } from "@/lib/getPostMetaData";
import markdownOptions from "@/lib/markdownOptions";
import { Metadata } from "next";
import styles from "@/components/content.module.css";

const getPostContent = (slug: string) => {
	const folder = "posts/";
	const file = `${folder}${slug}.md`;
	const content = fs.readFileSync(file, "utf8");
	return content;
};

//this is for static rendering while npm run build
export const generateStaticParams = async () => {
	const posts = getPostMetaData();
	return posts.map((post) => ({
		slug: post.slug,
	}));
};

export async function generateMetadata(
	props: any
): Promise<Metadata | undefined> {
	const { slug } = await props.params;
	const post = getPostMetaData().find((post) => post.slug === slug);
	const URL = "https://madzlabs.com"
	const siteUrl = process.env.SITE_URL || URL;

	if (!post) return;

	return {
		alternates: { canonical: `/blog/${encodeURIComponent(post.slug)}` },
		title: post.title,
		description: post?.title + " | " + post?.subtitle,
		openGraph: {
			title: post.title,
			description: post?.title + " | " + post?.subtitle,
			type: "article",
			locale: "en_US",
			url: siteUrl + "/blog/" + post.slug,
			siteName: "Madusanka's Portfolio",
			images: [
				// {
				//  url: urlForImage(post?.body?.find((b:any)=>b._type==="image")).width(1200).height(630).url(), //If use sanity
				// 	url: "https://www.madusankadissanayake.com/images/"+post.slug+".png",
				// 	width: 800,
				// 	height: 600,
				// 	alt: post.title
				// }
			],
		},
	};
}

const PostPage = async (props: any) => {
	const { slug } = await props.params; //slug is the dynamic folder name
	const content = getPostContent(slug);

	return <main className={styles.page}><article className={styles.article}><Markdown options={markdownOptions}>{content}</Markdown></article></main>;
};

export default PostPage;
