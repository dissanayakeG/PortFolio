import AboutMe from "@/components/portFolio/aboutMe";
import TechSkills from "@/components/portFolio/techSkills";
import Experiences from "@/components/portFolio/experiences";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Developer Portfolio",
	description: "Welcome to Madusanka's portfolio—	showcasing projects, skills, and insights in web development. Explore my work, and expertise in modern technologies.",
};

export default function Page() {
	return (
		<>
			<main>
				<AboutMe />
				<TechSkills />
				<Experiences />
			</main>
		</>
	);
}
