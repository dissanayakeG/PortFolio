import { Experience } from "@/app/definitions/Experiences";

type ExperienceType = {
	experience: Experience;
};

export default function ExperienceCard({ experience }: ExperienceType) {
	const card = (
		<div>
			<div className="flex flex-col sm:flex-row justify-between text-secondary-light text-xl italic">
				<h1>{experience.company}</h1>
				<h1>{experience.duration}</h1>
			</div>
			<p className="text-white italic text-md">
				{experience.skills.toUpperCase()}
			</p>

			<div className="w-full bg-theme h-0.5"></div>

			<div className="ml-2">
				{experience.breakdown
					? experience.breakdown.map((data) => {
							return (
								<div key={data.duration}>
									<div className="flex flex-col sm:flex-row justify-between">
										<h1 className="text-secondary-light">
											{data.designation}
										</h1>
										<h1 className="text-secondary-light">
											{data.duration}
										</h1>
									</div>
									<h1 className="ml-2">{data.notes}</h1>
								</div>
							);
					  })
					: ""}
			</div>
			<div className="w-full bg-theme h-0.5"></div>
		</div>
	);

	return <div className="w-full">{card}</div>;
}
