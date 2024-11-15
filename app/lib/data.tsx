import { Experience } from "../definitions/Experiences";

const experiences: Experience[] = [
	{
		company: "OpusXenta",
		duration: "July 2019 - November 2022",
		skills: "PHP | JavaScript | Laravel | VueJs | MySql",
		breakdown: [
			{
				designation: "Trainee Software Engineer",
				duration: "July 2019 - December 2019",
				notes: "Focused in mastering Laravel framework and VueJs Framework",
			},
			{
				designation: "Associate Software Engineer",
				duration: "January 2020 - May 2020",
				notes: `Created and implemented complex VueJs components |
						Integrated google map and Google API`,
			},
			{
				designation: "Software Engineer",
				duration: "May 2020 - August 2022",
				notes: `Designed, modified and implemented technology solutions |
						Created and implemented complex VueJs components | 
						Designed complex database designs | 
						Managed 4 junior developers`,
			},
			{
				designation: "Senior Software Engineer",
				duration: "August 2022 - November 2022",
				notes: `Designed, modified and implemented technology solutions | 
						Designed complex database designing | 
						Managed 4 junior developers`,
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
