import { Experience } from "@/types/Types";
import ExperienceCard from "@/components/portFolio/partials/experienceCard";
import experiences from "@/lib/portFolioData";

//define data outside as this is static data, this helps to reduce memory usage and reusability across this file

export default function Experiences() {
	return (
		<div className="flex flex-col p-4">
			<h1 className="flex justify-center text-secondary text-3xl font-bold italic">
				EXPERIENCES
			</h1>
			<div className="flex flex-col text-white space-y-2">
				{experiences.map((experience: Experience) => {
					return (
						<ExperienceCard
							experience={experience}
							key={experience.duration}
						/>
					);
				})}
			</div>
		</div>
	);
}
