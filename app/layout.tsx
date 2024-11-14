import "@/app/ui/global.css";
import { inter,montserrat } from "@/app/ui/fonts";
import Nav from "./ui/components/nav";

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
				</div>
			</body>
		</html>
	);
}
