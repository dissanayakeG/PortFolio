import { ComponentPropsWithoutRef } from "react";

export function Label({ className = "text-gray-700", children, ...props }: ComponentPropsWithoutRef<"label">) {
    return (
        <label className={`block text-sm sm:text-base font-semibold mb-1.5 ${className}`} {...props}>
            {children}
        </label>
    );
}