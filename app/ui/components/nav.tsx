"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
	href: string;
	children: React.ReactNode;
};

function NavLink({ href, children }: NavLinkProps) {
	const pathname = usePathname();

	return (
		<Link
			className={clsx("hover:text-secondary", {
				"text-secondary":
					pathname === href || pathname.startsWith(href + "/"),
				"text-white": !(
					pathname === href || pathname.startsWith(href + "/")
				),
			})}
			href={href}
		>
			{children}
		</Link>
	);
}

export default function Nav() {
	const pathname = usePathname();
	return (
		<ul className="flex p-2 bg-theme-dark w-full rounded-sm mb-4 sticky top-2 border-2 border-theme">
			<li className="mr-6">
				<NavLink href="/">Home</NavLink>
			</li>
			<li className="mr-6">
				<NavLink href="/blog">Blog</NavLink>
			</li>

			<li className="mr-6">
				<NavLink href="/taxCalculator">Payee Tax (SL 2025)</NavLink>
			</li>
		</ul>
	);
}
