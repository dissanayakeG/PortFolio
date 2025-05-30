import TechCard from "../partials/techCard";

export default function TechSkills() {
	const techSkills = [
		"/skills/php.svg",
		"/skills/typescript.svg",
		"/skills/js.svg",
		"/skills/laravel.svg",
		"/skills/vue.svg",
		"/skills/node-js.svg",
		"/skills/react.svg",
		"/skills/next-js.svg",
		"/skills/flutter.svg",
		"/skills/git.svg",
		"/skills/ubuntu.svg",
	];

	return (
		<div
			id="tech-skills"
			className=" flex flex-col justify-center items-center"
		>
			<h1 className="flex text-secondary text-3xl font-bold italic">
				MY SKILLS
			</h1>

			<div className="flex flex-wrap justify-center gap-4 p-6">
				{techSkills.map((skill) => {
					return <TechCard key={skill} src={skill} alt={skill} />;
				})}
			</div>
		</div>
	);
}
