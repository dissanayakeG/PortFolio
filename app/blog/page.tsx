import Link from "next/link";
import getPostMetaData from "../lib/getPostMetaData";

export default function Page() {
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
	return <div className="flex flex-col">{postPreview}</div>;
}
