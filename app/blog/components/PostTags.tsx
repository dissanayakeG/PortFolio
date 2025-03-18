"use client";

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
					className={`flex items-center gap-2 mb-2 p-2 m-2 rounded-md bg-theme-light text-secondary-light hover:bg-theme-dark hover:text-secondary hover:border ${
						checkedItems.indexOf(tag) > -1
							? "bg-gray-600 text-secondary"
							: ""
					}`}
				>
					<input
						type="checkbox"
						name={tag}
						checked={checkedItems.indexOf(tag) > -1 || false}
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
