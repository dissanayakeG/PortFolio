"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import PostTags from "./PostTags";
import { PostMetadata } from "@/app/definitions/Types";

export default function Posts() {
	const [postMetaData, setPostMetaData] = useState<PostMetadata[]>([]);
	const [postMetaDataTags, setPostMetaDataTags] = useState([]);
	const selectedItems = {
		"#PHP": true,
		"#Python": true,
		"#JavaScript": true,
	};

	useEffect(() => {
		fetch("/api/posts")
			.then((res) => res.json())
			.then((data) => setPostMetaData(data));
	}, []);

	useEffect(() => {
		fetch("/api/posts/tags")
			.then((res) => res.json())
			.then((data) => setPostMetaDataTags(data));
	}, []);

	function handleDataFromChild(event: any) {
		console.log("selecting...", event.target.name, event.target.checked);
		const encodedTag = encodeURIComponent(event.target.name);
		try {
			fetch(`/api/posts/filterByTags?tag=${encodedTag}`)
				.then((res) => res.json())
				// .then((data)=>console.log('filtered posts:', data));
				.then((data) => setPostMetaData(data));
		} catch (error) {
			console.error("Error fetching posts:", error);
		}
	}

	if (postMetaData.length == 0) {
		return <div>Loading...</div>;
	}

	const postPreview = postMetaData.map((post, index) => (
		<div
			key={index}
			className="w-full flex flex-col justify-start bg-theme-light p-4 rounded-md my-6"
		>
			<Link href={`/blog/${post.slug}`}>
				<h2 className="text-xl md:text-2xl text-secondary font-bold">
					{post.title}
				</h2>
			</Link>
			<h2 className="text-ls md:text-xl text-white italic">
				{post.subtitle}
			</h2>
			<p className="text-sm md:text-md text-secondary-light italic">{`Added on ${post.date}`}</p>
		</div>
	));
	return (
		<div>
			<PostTags
				postMetaDataTags={postMetaDataTags}
				checkedItems={selectedItems}
				selectTags={handleDataFromChild}
			/>
			{postPreview}
		</div>
	);
}
