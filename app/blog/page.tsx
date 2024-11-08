import Link from "next/link";
import getPostMetaData from "../lib/getPostMetaData";
import Markdown from 'markdown-to-jsx';


export default function Page() {
	const postMetaData = getPostMetaData();

	const postPreview = postMetaData.map((post, index) => (
		<div key={index} className="w-full flex flex-col justify-start bg-slate-500 p-4 rounded-md my-6">
			<Link href={`/blog/${post.slug}`}>
				<h2>{post.title}</h2>
			</Link>
			<h1>this is a h1 tag </h1>
			<h2>{post.subtitle}</h2>
			<h2>{post.date}</h2>
		</div>
	));
	return <div className="flex flex-col">{postPreview}</div>;
}
