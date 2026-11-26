import { Metadata } from "next";
import Posts from "@/components/blog/Posts";
import styles from "@/components/content.module.css";

export const metadata: Metadata = {
	alternates: { canonical: "/blog" },
	title: "Developer Blog",
	description:
		"Dive into developer blog, featuring insights, tutorials, and articles on various technologies, web development trends, and best practices.",
};

export default function Page() {
	return <main className={styles.page}><section className={styles.masthead}><span className={styles.kicker}>Developer journal</span><h1>Notes from the build.</h1><p>Practical writing about software craftsmanship, web development, testing, and the tools behind reliable products.</p></section><div className={styles.blogBody}><Posts /></div></main>;
}
