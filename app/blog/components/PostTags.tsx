"use client";

export default function PostTags({
	postMetaDataTags,
	checkedItems,
	selectTags,
}: {
	postMetaDataTags: string[];
	checkedItems: { [key: string]: boolean };
	selectTags: any;
}) {
	function handleClick(data: any) {
		selectTags(data);
	}

	const postTags = (
		<div className="flex flex-row flex-wrap">
			{postMetaDataTags.map((tag, index) => (
				<label
					key={tag}
					className={`flex items-center gap-2 mb-2 p-2 m-2 rounded-md bg-theme-light text-secondary-light hover:bg-theme-dark hover:text-secondary hover:border ${
						checkedItems[tag] ? "bg-gray-800 text-secondary" : ""
					}`}
				>
					<input
						type="checkbox"
						name={tag}
						checked={checkedItems[tag] || false}
						onChange={handleClick}
						className="w-4 h-4 hidden"
					/>
					{tag}
				</label>
			))}
		</div>
	);

	return <div>{postTags}</div>;
}
