import { Experience } from "@/app/definitions/Experiences";
import ExperienceCard from "../partials/experienceCard";

//define data outside as this is static data, this helps to reduce memory usage and reusability across this file
const experiences: Experience[] = [
	{
		company: "OX",
		duration: "July-2019 - November-2022",
		skills: "Laravel,Vue,MySql",
		breakdown: [
			{
				designation: "asc",
				duration: "july-aug",
				notes: "test",
			},
			{
				designation: "asc",
				duration: "july-aug",
				notes: "test",
			},
		],
	},
];

export default function Experiences() {
	return (
		<div className="flex flex-col justify-center items-center p-4">
			<h1 className="flex text-secondary text-3xl font-bold italic">
				EXPERIENCES
			</h1>
			<div>
				{experiences.map((experience: Experience) => {
					return <ExperienceCard experience={experience} />;
				})}
			</div>
		</div>
	);
}
