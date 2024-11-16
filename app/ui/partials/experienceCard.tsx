import { Experience } from "@/app/definitions/Experiences";

type ExperienceType = {
	experience: Experience;
};

export default function ExperienceCard({ experience }: ExperienceType) {
	const renderNotes = (notes: string) => {
		return notes
			.split("|")
			.map((segment, index) => <div key={index}>{segment}</div>);
	};

	const renderBreakdown = () =>
		experience.breakdown?.map((data) => (
			<div key={data.duration} className="mb-4">
				<div className="flex flex-col sm:flex-row justify-between">
					<h1 className="text-secondary-light">{data.designation}</h1>
					<h1 className="text-secondary-light">{data.duration}</h1>
				</div>

				{/* The && operator is used to check if data.notes is truthy (not null, undefined, false, 0, NaN, or an empty string). */}

				{data.notes && (
					<h1 className="ml-2 text-sm">{renderNotes(data.notes)}</h1>
				)}
			</div>
		));

	return (
		<div className="w-full">
			<div>
				<div className="flex flex-col sm:flex-row justify-between text-secondary-light text-xl italic">
					<h1>{experience.company}</h1>
					<h1>{experience.duration}</h1>
				</div>

				<p className="text-white italic text-md font-bold">
					{experience.skills.toUpperCase()}
				</p>

				<div className="w-full h-0.5 bg-theme-light my-4"></div>

				<div>{renderBreakdown()}</div>

				<div className="w-full h-0.5 bg-theme my-4"></div>
			</div>
		</div>
	);
}
