import Image from "next/image";
import styles from "@/components/home.module.css";

const techSkills = [["PHP", "/skills/php.svg"], ["TypeScript", "/skills/typescript.svg"], ["JavaScript", "/skills/js.svg"], ["Laravel", "/skills/laravel.svg"], ["Vue", "/skills/vue.svg"], ["Node.js", "/skills/node-js.svg"], ["React", "/skills/react.svg"], ["Next.js", "/skills/next-js.svg"], ["Flutter", "/skills/flutter.svg"], ["Git", "/skills/git.svg"], ["Ubuntu", "/skills/ubuntu.svg"]];

export default function TechSkills() {
	return <section className={styles.section} aria-labelledby="skills-title"><div className={styles.sectionHeading}><div><span className={styles.sectionKicker}>01 / Toolkit</span><h2 id="skills-title" className={styles.sectionTitle}>A practical, modern stack.</h2></div><p className={styles.sectionIntro}>Tools chosen for building useful interfaces, dependable systems, and workflows that teams can confidently grow.</p></div><div className={styles.skillsGrid}>{techSkills.map(([name, src]) => <div className={styles.skill} key={name}><Image src={src} alt="" width={48} height={48} /><span>{name}</span></div>)}</div></section>;
}
