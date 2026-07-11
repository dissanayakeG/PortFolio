import { ComponentPropsWithoutRef } from "react";

export function Input({ className = "border-theme text-gray-900 focus:ring-primary focus:border-primary", ...props }: ComponentPropsWithoutRef<"input">) {
    return (
        <input
            className={`border-2 rounded-xl p-4 lg:p-5 w-full text-base lg:text-lg focus:outline-none focus:ring-2 transition-all bg-white placeholder:text-gray-400 ${className}`}
            {...props}
        />
    );
}