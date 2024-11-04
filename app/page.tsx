import Link from "next/link";
import styles from "@/app/ui/home.module.css";
import { lusitana } from "@/app/ui/fonts";
import Image from "next/image";
import AboutMe from "./ui/aboutMe";
import TechSkills from "./ui/techSkills";

export default function Page() {
	return (
		<>
			<main>
				<AboutMe />
				<TechSkills />
			</main>
		</>
	);
}
