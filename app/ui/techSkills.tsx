import TechCard from "./partials/techCard";

export default function TechSkills() {
	const techSkills = [
		"skills/php.svg",
		"skills/js.svg",
		"/skills/laravel.png",
		"skills/vue.svg",
		"skills/nodejs.svg",
		"skills/react.svg",
		"skills/flutter.svg",
		"skills/git.svg",
		"skills/ubuntu.svg",
	];

	return (
		<div
			id="tech-skills"
			className="flex flex-wrap justify-center gap-4 p-6"
		>
			{techSkills.map((skill) => {
				return <TechCard key={skill} src={skill} alt={skill} />;
			})}
		</div>
	);
}
