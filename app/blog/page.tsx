import Link from "next/link";
import getPostMetaData from "../lib/getPostMetaData";

export default function Page() {
	const postMetaData = getPostMetaData();

	const postPreview = postMetaData.map((post, index) => (
		<div
			key={index}
			className="w-full flex flex-col justify-start bg-slate-500 p-4 rounded-md my-6"
		>
			<Link href={`/blog/${post.slug}`}>
				<h2 className="text-xl md:text-2xl text-amber-500 font-bold">
					{post.title}
				</h2>
			</Link>
			<h2 className="pl-2 text-ls md:text-xl text-amber-200 italic">
				{post.subtitle}
			</h2>
			<p className="pl-2 text-sm md:text-md text-slate-200">{`Added on ${post.date}`}</p>
		</div>
	));
	return <div className="flex flex-col">{postPreview}</div>;
}
