import Image from "next/image";
import Link from "next/link";
import styles from "@/components/home.module.css";

const contacts = [
	{ name: "GitHub", src: "/contacts/git.svg", link: process.env.GIT },
	{ name: "Email", src: "/contacts/gmail.svg", link: process.env.MAIL },
	{ name: "LinkedIn", src: "/contacts/linkdin.svg", link: process.env.LINKDIN },
	{ name: "Developer notes", src: "/contacts/github_io.svg", link: process.env.GITHUB_IO },
	{ name: "WhatsApp", src: "/contacts/whatsapp.svg", link: process.env.PHONE },
];

export default function AboutMe() {
	return <section className={styles.hero} aria-labelledby="intro-title"><div className={styles.heroCopy}><span className={styles.eyebrow}>Software engineer · Sri Lanka</span><h1 id="intro-title" className={styles.heroTitle}>Building software that feels <em>considered.</em></h1><p className={styles.lede}>I&apos;m Madusanka Dissanayake, a PHP and TypeScript developer with more than six years of experience across the full software development cycle. I build maintainable products, lead teams, and turn complex requirements into reliable systems.</p><div className={styles.actions}><a className={styles.primaryAction} href="#experience">Explore experience</a><Link className={styles.secondaryAction} href="/blog">Read developer notes</Link></div></div><div className={styles.portraitWrap}><div className={styles.portraitFrame}><Image className={styles.portrait} src="/profilePicture.jpg" alt="Madusanka Dissanayake" width={600} height={600} priority /></div><p className={styles.portraitNote}>Laravel · TypeScript · product-minded engineering</p><div className={styles.socials} aria-label="Contact links">{contacts.filter(({ link }) => Boolean(link)).map((contact) => <Link className={styles.socialLink} href={contact.link!} key={contact.name} target="_blank" rel="noreferrer" aria-label={contact.name}><Image src={contact.src} alt="" width={22} height={22} /></Link>)}</div></div></section>;
}
