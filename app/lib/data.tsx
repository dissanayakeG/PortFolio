import { Experience } from "../definitions/Experiences";

const experiences: Experience[] = [
	{
		company: "OpusXenta",
		duration: "July 2019 - November 2022",
		skills: "PHP | JavaScript | Laravel | Vue.Js | MySQL",
		breakdown: [
			{
				designation: "Trainee Software Engineer",
				duration: "July 2019 - December 2019",
				notes: "Gained hands-on experience with the Laravel and Vue.js frameworks, focusing on backend and frontend integration.",
			},
			{
				designation: "Associate Software Engineer",
				duration: "January 2020 - May 2020",
				notes: `Developed and integrated advanced Vue.js components, enhancing user interfaces and user experiences. |
						Successfully implemented Google Maps and Google API integration to add geolocation and mapping functionalities.`,
			},
			{
				designation: "Software Engineer",
				duration: "May 2020 - August 2022",
				notes: `Designed and developed scalable technology solutions to meet complex client requirements. |
						Created and implemented advanced Vue.js components, optimizing performance and functionality. | 
						Architected and managed complex database structures for high-performance applications. | 
						Led a cross-functional team, fostering collaboration and delivering projects on time.`,
			},
			{
				designation: "Senior Software Engineer",
				duration: "August 2022 - November 2022",
				notes: `Led the design and development of robust technology solutions, ensuring scalability and maintainability. | 
						Spearheaded database architecture for high-demand applications, optimizing for speed and reliability. | 
						Mentored team members and managed project workflows to ensure high-quality deliverables.
`,
			},
		],
	},
	{
		company: "Intervest",
		duration: "November 2022 - Present",
		skills: "Laravel | Laravel Package Development | Livewire | Alpine.js | Pest | TDD",
		breakdown: [
			{
				designation: "Senior Software Engineer",
				duration: "November 2022 - Present",
				notes: `Developed custom Laravel packages to streamline application functionality and reusability. |
						Applied design patterns to create modular, maintainable, and expandable codebases. |
						Led test-driven development (TDD) using PHPUnit and Pest, ensuring robust and error-free applications. | 
						Collaborated with cross-functional teams to implement innovative solutions and optimize performance.`,
			},
		],
	},
];

export default experiences;
