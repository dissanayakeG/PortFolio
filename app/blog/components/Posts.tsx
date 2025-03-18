"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import PostTags from "./PostTags";
import { PostMetadata } from "@/app/definitions/Types";
import Loading from "./loading";

export default function Posts() {
	const [postMetaData, setPostMetaData] = useState<PostMetadata[]>([]);
	const [postMetaDataTags, setPostMetaDataTags] = useState<string[]>([]);
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [loading, setLoading] = useState<boolean>(true); // Add loading state

	useEffect(() => {
		getAllPosts();
		getAllTags();
	}, []);

	const getAllPosts = () => {
		setLoading(true); // Start loading
		fetch("/api/posts")
			.then((res) => res.json())
			.then((data) => {
				setPostMetaData(data);
				setLoading(false); // Stop loading after data is fetched
			})
			.catch(() => setLoading(false));
	};

	const getAllTags = () => {
		fetch("/api/posts/tags")
			.then((res) => res.json())
			.then((data) => setPostMetaDataTags(data));
	};

	function handleDataFromChild(event: React.ChangeEvent<HTMLInputElement>) {
		setSelectedTags((prevSelectedTags) => {
			let updatedTags = [...prevSelectedTags];
			const tagIndex = updatedTags.indexOf(event.target.name);

			if (event.target.checked) {
				updatedTags.push(event.target.name.trim());
			} else {
				if (tagIndex > -1) {
					updatedTags.splice(tagIndex, 1);
				}
			}

			const uniqueTags = [...new Set(updatedTags)];

			if (uniqueTags.length === 0) {
				getAllPosts();
			} else {
				const encodedTags = uniqueTags
					.map(encodeURIComponent)
					.join(",");
				fetch(`/api/posts/filterByTags?tags=${encodedTags}`)
					.then((res) => res.json())
					.then((data) => setPostMetaData(data))
					.catch((error) =>
						console.error("Error fetching posts:", error)
					);
			}

			return uniqueTags; // Ensure state updates correctly
		});
	}

	// Show the Loading component while fetching data
	if (loading) {
		return <Loading />;
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
				checkedItems={selectedTags}
				selectTags={handleDataFromChild}
			/>
			{postPreview}
		</div>
	);
}
