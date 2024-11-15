import Image from "next/image";
import Link from "next/link";

type ContactsProps = {
	src: string;
	alt: string;
	link: string;
};

export default function ContactCard({ src, alt, link }: ContactsProps) {
	return (
		<Link href={link}>
			<Image
				src={src}
				alt={alt}
				width={50}
				height={50}
				className="rounded-xl p-3 hover:bg-theme"
			/>
		</Link>
	);
}
