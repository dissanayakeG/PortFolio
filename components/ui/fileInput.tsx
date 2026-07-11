import { ComponentPropsWithoutRef } from "react";

export function FileInput({
	className = "border-2 border-theme rounded-xl p-4 w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all file:mr-4 file:py-2 file:px-5 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-light/20 file:text-primary-dark hover:file:bg-primary-light/30 file:transition-colors cursor-pointer",
	...props
}: ComponentPropsWithoutRef<"input">) {
	return (
		<input
			className={`border-2 rounded-xl p-4 lg:p-5 w-full text-base lg:text-lg focus:outline-none focus:ring-2 transition-all bg-white placeholder:text-gray-400 ${className}`}
			{...props}
		/>
	);
}
