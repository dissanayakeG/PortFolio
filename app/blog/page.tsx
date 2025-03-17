import { Metadata } from "next";
import Posts from "./components/Posts";

export const metadata: Metadata = {
	title: "Developer Blog",
	description:
		"Dive into developer blog, featuring insights, tutorials, and articles on various technologies, web development trends, and best practices.",
};

export default function Page() {
	return (
		<div className="flex flex-col">
			<Posts />
		</div>
	);
}
