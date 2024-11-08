import fs from "fs";
import Markdown from "markdown-to-jsx";
import getPostMetaData from "@/app/lib/getPostMetaData";
import markdownOptions from "../../../markdownOptions";

const getPostContent = (slug: string) => {
	const folder = "posts/";
	const file = `${folder}${slug}.md`;
	const content = fs.readFileSync(file, "utf8");
	return content;
};

//this is for static rendering while npm run build
export const generateStaticParams = async () => {
	const posts = getPostMetaData();
	return posts.map((post) => ({
		slug: post.slug,
	}));
};

const PostPage = async (props: any) => {
	const { slug } = await props.params; //slug is the dynamic folder name
	const content = getPostContent(slug);

	return (
		<div className="flex flex-col">
			<Markdown options={markdownOptions}>{content}</Markdown>
		</div>
	);
};

export default PostPage;
