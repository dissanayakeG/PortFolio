import { ComponentPropsWithoutRef, forwardRef } from "react";

export function Button({
	className = "bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-md",
	type = "button",
	children,
	...props
}: ComponentPropsWithoutRef<"button">) {
	return (
		<button
			type={type}
			className={`px-4 py-3 text-sm sm:text-base inline-flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${className}`}
			{...props}
		>
			{children}
		</button>
	);
}
