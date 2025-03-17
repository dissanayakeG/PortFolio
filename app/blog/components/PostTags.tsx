import {getPostMetaDataByTags,getPostMetaDataTags,} from "@/app/lib/getPostMetaData";

export default function PostTags() {
	const postMetaDataTags = getPostMetaDataTags();

	const postTags = (
		<div className="flex flex-row flex-wrap">
			{postMetaDataTags.map((tag, index) => (
				<div
					key={index}
					className="bg-theme-light p-4 rounded-md my-6 mr-2 hover:bg-theme-dark hover:border"
				>
					<h2 className="text-md md:text-md text-secondary font-bold">
						{tag}
					</h2>
				</div>
			))}
		</div>
	);

	return <div>{postTags}</div>;
}
