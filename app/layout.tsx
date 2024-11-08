import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import Nav from "./ui/nav";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" >
			<body className={`${inter.className} antialiased bg-gray-600 p-4`}>
				<div className="flex flex-col">
					<Nav />
					{children}
				</div>
			</body>
		</html>
	);
}
