import fs from "fs";
import matter from "gray-matter";
import { PostMetadata } from "@/app/definitions/Types";

const folder = "posts";
const files = fs.readdirSync(folder);
const markDownPosts = files.filter((file) => file.endsWith(".md"));

const getPostMetaData = (): PostMetadata[] => {
	// const slugs = markDownPosts.map((file) => file.replace(".md", ""));
	const posts = markDownPosts.map((fileName) => {
		const fileContents = fs.readFileSync(`posts/${fileName}`, "utf8");
		const matterResult = matter(fileContents);

		return {
			title: matterResult.data.title,
			subtitle: matterResult.data.subtitle,
			date: matterResult.data.date,
			slug: fileName.replace(".md", ""),
			tags: matterResult.data.tags?.split(","),
		};
	});
	return posts;
};

const getPostMetaDataTags = (): string[] => {
	let tags: string[] = [];

	markDownPosts.forEach((fileName) => {
		const fileContents = fs.readFileSync(`posts/${fileName}`, "utf8");
		const matterResult = matter(fileContents);
		tags.push(matterResult.data.tags?.split(","));
	});
	// Remove duplicates and empty tags
	return [...new Set(tags.flat())].filter(Boolean);
};

const getPostMetaDataByTags = (searchTags: Array<string>): PostMetadata[] => {
	const posts: PostMetadata[] = [];

	console.log("from lib:", searchTags);

	markDownPosts.forEach((fileName) => {
		const fileContents = fs.readFileSync(`posts/${fileName}`, "utf8");
		const matterResult = matter(fileContents);

		const postTags =
			matterResult.data.tags
				?.split(",")
				.map((tag: string) => tag.trim())
				.filter(Boolean) || [];

		// Check if any of the search tags match the post tags
		const hasMatchingTag = postTags.some((postTag: string) =>
			searchTags.includes(postTag)
		);

		if (hasMatchingTag) {
			posts.push({
				title: matterResult.data.title,
				subtitle: matterResult.data.subtitle,
				date: matterResult.data.date,
				slug: fileName.replace(".md", ""),
				tags: matterResult.data.tags?.split(","),
			});
		}
	});

	return posts;
};

export { getPostMetaData, getPostMetaDataTags, getPostMetaDataByTags };
