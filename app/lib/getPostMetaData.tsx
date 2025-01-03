import fs from "fs";
import matter from "gray-matter";
import { PostMetadata } from "@/app/definitions/Types";

const getPostMetaData = (): PostMetadata[] => {
	const folder = "posts";
	const files = fs.readdirSync(folder);
	const markDownPosts = files.filter((file) => file.endsWith(".md"));
	// const slugs = markDownPosts.map((file) => file.replace(".md", ""));
	const posts = markDownPosts.map((fileName) => {
		const fileContents = fs.readFileSync(`posts/${fileName}`, "utf8");
		const matterResult = matter(fileContents);

		return {
			title: matterResult.data.title,
			subtitle: matterResult.data.subtitle,
			date: matterResult.data.date,
			slug: fileName.replace(".md", ""),
		};
	});
	return posts;
};

export default getPostMetaData;
