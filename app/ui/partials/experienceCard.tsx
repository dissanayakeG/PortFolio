import { Experience } from "@/app/definitions/Experiences";

type ExperienceType = {
	experience: Experience;
};

export default function ExperienceCard({ experience }: ExperienceType) {
	return <div>{experience.company}</div>;
}
