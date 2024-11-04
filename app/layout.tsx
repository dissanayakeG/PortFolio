import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";

export default function RootLayout({children,}: {children: React.ReactNode;}) {
	return (
		<html lang="en" className="bg-gray-600 flex justify-center">
			<body className={`${inter.className} antialiased`}>{children}</body>
		</html>
	);
}
