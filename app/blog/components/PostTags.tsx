"use client";
import { clsx } from "clsx";

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

	const selectedTags = (
		<div className="flex flex-wrap text-sm">
			{checkedItems.map((tag) => (
				<div
					key={tag}
					className="p-1 m-1 rounded-md bg-theme text-primary-light"
				>
					{tag}
				</div>
			))}
		</div>
	);

	const postTags = (
		<div className="flex flex-wrap">
			{postMetaDataTags.map((tag, index) => (
				<label
					key={tag}
					className={clsx("flex items-center p-1 m-1 rounded-md", {
						"bg-theme-light text-secondary-light hover:bg-theme hover:text-primary":
							!checkedItems.includes(tag),
						"bg-theme text-primary": checkedItems.includes(tag),
					})}
				>
					<input
						type="checkbox"
						name={tag}
						checked={checkedItems.includes(tag) || false}
						onChange={handleClick}
						className="w-4 h-4 hidden"
					/>
					{tag}
				</label>
			))}
		</div>
	);

	return (
		<div className="space-y-2">
			<div>{selectedTags}</div>
			<hr />
			<div>{postTags}</div>
		</div>
	);
}
