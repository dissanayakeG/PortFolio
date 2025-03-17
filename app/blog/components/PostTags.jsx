"use client";
import { useEffect, useState } from "react";

export default function PostTags() {
	const [postMetaDataTags, setPostMetaDataTags] = useState([]);

	useEffect(() => {
		fetch("/api/posts")
			.then((res) => res.json())
			.then((data) => setPostMetaDataTags(data));
	}, []);


	const [checkedItems, setCheckedItems] = useState({});

	const handleCheckboxChange = (event) => {
		const { name, checked } = event.target;
		setCheckedItems((prev) => ({
			...prev,
			[name]: checked,
		}));
	};

	const postTags = (
		<div className="flex flex-row flex-wrap">
			{/* <div className="mt-4">
				<h3 className="text-lg font-semibold">Selected Fruits:</h3>
				<ul className="list-disc pl-5">
					{Object.keys(checkedItems).map(
						(key) => checkedItems[key] && <li key={key}>{key}</li>
					)}
				</ul>
			</div> */}
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
						onChange={handleCheckboxChange}
						className="w-4 h-4 hidden"
					/>
					{tag}
				</label>
			))}
		</div>
	);

	return <div>{postTags}</div>;
}
