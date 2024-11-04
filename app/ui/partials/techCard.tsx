import Image from "next/image";
export default function TechCard({ src, alt }: { src: string; alt: string }) {
	return (
		<div className="flex items-center justify-centers hover:bg-blue-100 p-4 rounded-md">
			<Image src={src} alt={alt} width={60} height={60} />
		</div>
	);
}
