import Image from "next/image";
import Button from "@/app/ui/partials/button";
import ContactCard from "./partials/contactCard";

export default function AboutMe() {
	const contacts = [
		{ name: "git", src: "contacts/git.svg" },
		{ name: "gmail", src: "contacts/gmail.svg" },
		{ name: "Linkdin", src: "contacts/linkdin.svg" },
		{ name: "twitter", src: "contacts/twitter.svg" },
		{ name: "whatsapp", src: "contacts/whatsapp.svg" },
	];

	return (
		<div className="flex">
			{/* name  */}
			<div className="flex flex-col gap-2 justify-center items-center">
				<h1 className="text-2xl font-bold text-amber-500">
					Jhon Smith
				</h1>
				<p className="text-slate-200">
					I'm a Professional PHP/Javascript Developer
				</p>
				<Button text="Contact me"></Button>
			</div>

			<div className="flex justify-between p-2">
				{/* image */}
				<div className="flex items-center justify-center p-4 max-w-80 overflow-hidden">
					<Image
						src="/Avatar.jpg"
						alt="flutters profile picture"
						className="mr-4"
						width={250}
						height={250}
					/>
				</div>

				{/* contact */}
				<div className="flex flex-col">
					{contacts.map((contact) => {
						return (
							<ContactCard
								key={contact.src}
								src={contact.src}
								alt={contact.name}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}
