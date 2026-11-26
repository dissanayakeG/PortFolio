import "@/components/global.css";
import { inter, montserrat } from "@/components/fonts";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
	metadataBase: process.env.SITE_URL
		? new URL(process.env.SITE_URL)
		: new URL("https://madzlabs.com"),

	// title: "PortFolio | DEV Blog | SL PAYE TAX Calculator",
	title: {
		default: "PortFolio | DEV Blog | SL PAYE TAX Calculator",
		template: "%s | Madusanka Dissanayake",
	},
	description:
		"Explore my portfolio, insightful DEV blog, and an SL PAYE tax calculator—all in one place.",
	openGraph: {
		title: "PortFolio | DEV Blog | SL PAYE TAX Calculator",
		description: "Explore my portfolio, insightful DEV blog, and an SL PAYE tax calculator—all in one place.",
		type: "website",
		locale: "en_US",
		url: process.env.SITE_URL || "https://madzlabs.com",
		siteName: "Madusanka's Portfolio",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				className={`${montserrat.className} antialiased bg-theme-dark p-4 sm:p-6`}
			>
				<div className="flex flex-col mx-auto max-w-screen-xl">
					<Nav />
					{children}
					<div className="w-full h-0.5 bg-theme mt-2"></div>
					<Footer />
				</div>
			</body>
		</html>
	);
}
