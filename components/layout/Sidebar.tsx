"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
	const pathname = usePathname();

	const links = [
		{ href: "/", label: "Dashboard", icon: "📊" },
		{ href: "/words", label: "Words", icon: "📚" },
		{ href: "/study", label: "Study", icon: "✏️" },
	];

	return (
		<aside className="hidden md:flex md:w-64 lg:w-80 min-h-screen border-r-2 border-gray-200 bg-white shadow-lg p-6 lg:p-10 flex-col">
			<Link href="/" className="block mb-10 lg:mb-16">
				<h1 className="text-2xl lg:text-3xl font-bold text-emerald-600">
					Study Helper
				</h1>
				<p className="text-sm lg:text-base text-gray-600 mt-2 lg:mt-4 font-medium">Master vocabulary, one word at a time</p>
			</Link>

			<nav className="space-y-3 lg:space-y-4 flex-1">
				{links.map((link) => {
					const isActive = pathname === link.href;
					return (
						<Link
							key={link.href}
							href={link.href}
							className={`flex items-center gap-3 lg:gap-5 px-4 lg:px-6 py-4 lg:py-6 rounded-xl font-bold text-base lg:text-xl transition-all ${
								isActive
									? "bg-emerald-600 text-white shadow-lg"
									: "text-gray-700 hover:bg-gray-100"
							}`}
						>
							<span className="text-2xl lg:text-3xl">{link.icon}</span>
							<span>{link.label}</span>
						</Link>
					);
				})}
			</nav>

			<div className="mt-auto pt-6 lg:pt-10 border-t-2 border-gray-200">
				<div className="bg-blue-50 rounded-xl p-4 lg:p-6 border-2 border-blue-200">
					<p className="text-xs lg:text-sm text-gray-800 font-medium leading-relaxed">
						💡 <span className="font-bold">Tip:</span> Review words daily for better retention
					</p>
				</div>
			</div>
		</aside>
	);
}
