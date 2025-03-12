import "@/app/ui/global.css";
import { inter, montserrat } from "@/app/ui/fonts";
import Nav from "./ui/components/nav";
import Footer from "./ui/components/footer";
import Head from 'next/head';
import { Metadata } from "next";

export const metadata: Metadata = {
	metadataBase: process.env.SITE_URL ? new URL(process.env.SITE_URL) : new URL('http://localhost:3000'),

	// title: "PortFolio | DEV Blog | SL Payee TAX Calculator",
	title:{
		default: "PortFolio | DEV Blog | SL Payee TAX Calculator",
		template: "%s | Madusanka Dissanayake"
	},
	description: "Explore my portfolio, insightful DEV blog, and an SL Payee tax calculator—all in one place.",
	openGraph: {
		title: "PortFolio | DEV Blog | SL Payee TAX Calculator",
		description:"Explore my portfolio, insightful DEV blog, and an SL Payee tax calculator—all in one place.",
		type: "website",
		locale: "en_US",
		url: process.env.SITE_URL ? process.env.SITE_URL : 'http://localhost:3000',
		siteName: "Madusanka's Portfolio",
	}			
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<Head>
				<link rel="icon" href="/favicon.png" sizes="32*32" />
			</Head>
			<body
				className={`${montserrat.className} antialiased bg-theme-dark p-4`}
			>
				<div className="flex flex-col mx-auto max-w-screen-md">
					<Nav />
					{children}
					<div className="w-full h-0.5 bg-theme mt-2"></div>
					<Footer />
				</div>
			</body>
		</html>
	);
}
