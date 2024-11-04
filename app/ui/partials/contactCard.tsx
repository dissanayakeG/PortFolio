import Image from "next/image";

type ContactsProps = {
	src: string;
	alt: string;
};

export default function ContactCard({ src, alt }: ContactsProps) {
	return (
		<Image
			src={src}
			alt={alt}
			width={50}
			height={50}
			className="rounded-xl p-3"
		/>
	);
}
