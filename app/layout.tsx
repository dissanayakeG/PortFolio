import "@/app/ui/global.css";
import { inter, montserrat } from "@/app/ui/fonts";
import Nav from "./ui/components/nav";
import Footer from "./ui/components/footer";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
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
