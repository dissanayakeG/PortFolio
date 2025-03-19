import fs from "fs";
import path from "path";

import matter from "gray-matter";
import { PostMetadata } from "@/app/definitions/Types";

// const folder = "posts";
// const files = fs.readdirSync(folder);
// const markDownPosts = files.filter((file) => file.endsWith(".md"));

let markDownPosts: string[];

const folder = path.join(process.cwd(), "posts"); // Ensure correct absolute path
if (fs.existsSync(folder)) {
    const files = fs.readdirSync(folder);
    markDownPosts = files.filter((file) => file.endsWith(".md"));
    console.log(markDownPosts); // Debugging
} else {
    console.error("Posts directory does not exist in production.");
}

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
	return formatPosts(posts);
};

const getPostMetaDataTags = (): string[] => {
	return getStaticTags();
	// return getPostTags();
};

const getStaticTags = (): string[] => {
	const tags: string[] = [
		"#php",
		"#js",
		"#laravel",
		"#vuejs",
		"#reactjs",
		"#tdd",
		"#nextjs",
		"#nuxtjs",
		"#spa",
		"#authentication",
		"#LaravelPackageDevelopment",
	];
	let upperCaseTags: string[] = [];

	tags.forEach((tag: string) => upperCaseTags.push(tag.trim().toUpperCase()));

	return upperCaseTags;
};

const getPostTags = (): string[] => {
	let tags: string[] = [];

	markDownPosts.forEach((fileName) => {
		const fileContents = fs.readFileSync(`posts/${fileName}`, "utf8");
		const matterResult = matter(fileContents);
		matterResult.data.tags?.split(",").forEach((tag: string) => {
			tags.push(tag.trim());
		});
	});
	// Remove duplicates and empty tags
	return [...new Set(tags.flat())].filter(Boolean);
};

const getPostMetaDataByTags = async (searchTags: string[]): Promise<PostMetadata[]> => {
	const posts: PostMetadata[] = [];

	markDownPosts.forEach((fileName) => {
		const fileContents = fs.readFileSync(`posts/${fileName}`, "utf8");
		const matterResult = matter(fileContents);

		//Change search tags to upperCase
		searchTags = searchTags.map((tag: string) => {
			return tag.trim().toUpperCase();
		});

		//Change post tags to upperCase
		const postTags = matterResult.data.tags?.split(",")
				.map((tag: string) => tag.trim().toUpperCase())
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
				tags: postTags,
			});
		}
	});

	return formatPosts(posts);
};

const formatPosts = (posts: PostMetadata[]) => {
	let compare = (a: PostMetadata, b: PostMetadata) => {
		if (a.date > b.date) {
			return -1;
		}
		if (a.date > b.date) {
			return 1;
		}
		return 0;
	};
	return posts.sort(compare);
};

export { getPostMetaData, getPostMetaDataTags, getPostMetaDataByTags };
