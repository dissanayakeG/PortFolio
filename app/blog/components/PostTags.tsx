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
					className="p-1 m-1 border rounded-md bg-theme text-primary-light"
				>
					{tag}
				</div>
			))}
		</div>
	);

	const postTags = (
		<div className="flex flex-row flex-wrap">
			{postMetaDataTags.map((tag, index) => (
				<label
					key={tag}
					className={clsx(
						"flex items-center gap-2 mb-2 p-2 m-2 rounded-md hover:border",
						{
							"bg-theme-light text-secondary-light hover:bg-theme hover:text-primary":
								!checkedItems.includes(tag),
							"bg-theme text-primary":
								checkedItems.includes(tag),
						}
					)}
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
		<div>
			<div>{selectedTags}</div>
			<div>{postTags}</div>
		</div>
	);
}
