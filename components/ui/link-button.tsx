import { ComponentPropsWithoutRef, forwardRef } from "react";

export function LinkButton({
	className = "",
	type = "button",
	children,
	...props
}: ComponentPropsWithoutRef<"button">) {
	return (
		<button
			type={type}
			className={`bg-transparent hover:bg-transparent text-primary-dark font-medium mt-3 hover:text-primary-dark gap-1 p-0 shadow-none px-4 py-3 text-sm sm:text-base inline-flex items-center justify-center transition-all active:scale-[0.98] ${className}`}
			{...props}
		>
			{children}
		</button>
	);
}
