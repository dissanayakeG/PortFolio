"use client";
import { clsx } from "clsx";
import styles from "@/components/content.module.css";

export default function PostTags({
	postMetaDataTags,
	checkedItems,
	selectTags,
}: {
	postMetaDataTags: string[];
	checkedItems: string[];
	selectTags: any;
}) {
	function handleClick(event: React.ChangeEvent<HTMLInputElement>) {
		selectTags(event);
	}

	const postTags = (
		<div className={styles.tagList}>
			{postMetaDataTags.map((tag, index) => (
				<label
					key={tag}
					className={clsx(styles.tag, {
						[styles.tagActive]: checkedItems.includes(tag),
					})}
				>
					<input
						type="checkbox"
						name={tag}
						checked={checkedItems.includes(tag) || false}
						onChange={handleClick}
					/>
					{tag}
				</label>
			))}
		</div>
	);

	return <div><span className={styles.filterLabel}>{checkedItems.length ? `Filtering by: ${checkedItems.join(", ")}` : "Filter by topic"}</span>{postTags}</div>;
}
