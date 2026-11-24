"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import PostTags from "@/components/blog/PostTags";
import { PostMetadata } from "@/types/Types";
import Loading from "@/components/blog/loading";
import styles from "@/components/content.module.css";

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

	const postPreview = postMetaData.map((post) => (
		<article key={post.slug} className={styles.post}><div><Link className={styles.postTitle} href={`/blog/${post.slug}`}>{post.title}</Link><p className={styles.postSubtitle}>{post.subtitle}</p><div className={styles.postTags}>{post.tags?.map((tag) => <span key={tag}>{tag.trim()}</span>)}</div></div><time className={styles.postDate} dateTime={post.date}>{post.date}</time></article>
	));
	return <div>
			<PostTags
				postMetaDataTags={postMetaDataTags}
				checkedItems={selectedTags}
				selectTags={handleDataFromChild}
			/>
			<div className={styles.postList}>{postPreview}</div>
		</div>;
}
