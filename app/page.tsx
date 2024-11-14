import AboutMe from "./ui/components/aboutMe";
import TechSkills from "./ui/components/techSkills";
import Experiences from "./ui/components/experiences";

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
