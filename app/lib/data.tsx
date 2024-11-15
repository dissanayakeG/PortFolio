import { Experience } from "../definitions/Experiences";

const experiences: Experience[] = [
	{
		company: "OpusXenta",
		duration: "July 2019 - November 2022",
		skills: "Laravel | Vue | MySql",
		breakdown: [
			{
				designation: "Trainee Software Engineer",
				duration: "July 2019 - December 2019",
				notes: "Marster Vue And Laravel",
			},
			{
				designation: "Associate Software Engineer",
				duration: "January 2020 - May 2020",
				notes: "Marster Vue And Laravel",
			},
			{
				designation: "Software Engineer",
				duration: "May 2020 - August 2022",
				notes: "Marster Vue And Laravel",
			},
			{
				designation: "Senior Software Engineer",
				duration: "August 2022 - November 2022",
				notes: "Marster Vue And Laravel",
			},
		],
	},
	{
		company: "Intervest",
		duration: "November 2022 - Present",
		skills: "Laravel | Vue | MySql",
		breakdown: [
			{
				designation: "Senior Software Engineer",
				duration: "November 2022 - Present",
				notes: `Laravel Package developments |
						Using design patterns to develop expandable codes |
						Using PHPUnit and Pest for TDD`,
			},
		],
	},
];

export default experiences;
