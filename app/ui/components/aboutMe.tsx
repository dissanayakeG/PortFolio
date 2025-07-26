import Image from "next/image";
import ContactCard from "../partials/contactCard";
import { link } from "fs";

export default function AboutMe() {
	const contacts = [
		{ name: "git", src: "/contacts/git.svg", link: process.env.GIT },
		{ name: "gmail", src: "/contacts/gmail.svg", link: process.env.MAIL },
		{ name: "Linkdin", src: "/contacts/linkdin.svg", link: process.env.LINKDIN },
		{ name: "dev-short-notes", src: "/contacts/github_io.svg",link: process.env.GITHUB_IO },
		{ name: "whatsapp", src: "/contacts/whatsapp.svg" ,link: process.env.PHONE},
	];

	const heading: string = "Madusanka Dissanayake";
	const subHeading: string = "I'm a Professional PHP/TypeScript Developer";
	const aboutMe: string = `
					Software engineer with more than 6 years of experience in the full
					software development cycle. Highly adapted to leading
					engineering teams to achieve software development upgrades
					and increase business efficiency while delivering
					world-class solutions to clients.`;

	return (
		<div className="flex flex-col sm:flex-row sm:justify-between items-center p-4">
			<div className="flex flex-col gap-2 ">
				<h1 className="text-xl md:text-2xl font-bold text-secondary italic">
					{heading}
				</h1>
				<p className="text-secondary-light italic">{subHeading}</p>
				<p className="text-white italic text-justify">{aboutMe}</p>
			</div>

			<div className="flex flex-col sm:flex-row justify-between p-2">
				<Image
					src="/profilePicture.jpg"
					alt="flutters profile picture"
					className="flex items-center justify-center p-4 max-w-80 overflow-hidden"
					width={300}
					height={250}
				/>

				<div className="flex sm:flex-col bg-theme-light rounded-md p-1 gap-2">
					{contacts.map((contact) => {
						return (
							<ContactCard
								key={contact.src}
								src={contact.src}
								alt={contact.name}
								link={contact.link ?? "#"}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}
