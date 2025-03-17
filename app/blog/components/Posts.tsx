import { getPostMetaData } from "@/app/lib/getPostMetaData";
import Link from "next/link";
import PostTags from "./PostTags";

export default function Posts() {
	const postMetaData = getPostMetaData();

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
			<PostTags />
			{postPreview}
		</div>
	);
}
