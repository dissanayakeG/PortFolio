import { ComponentPropsWithoutRef } from "react";
import Link from "next/link";

export function CustomLink({
	className = "text-primary hover:text-primary-dark underline",
	children,
	...props
}: ComponentPropsWithoutRef<typeof Link>) {
	return (
		<Link
			className={`text-secondary hover:text-secondary-dark no-underline hover:underline text-sm font-semibold transition-colors duration-200 ${className}`}
			{...props}
		>
			{children}
		</Link>
	);
}
