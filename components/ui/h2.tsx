import { ComponentPropsWithoutRef } from "react";

export function Heading2({ className = "text-gray-900", children, ...props }: ComponentPropsWithoutRef<"h2">) {
    return (
        <h2 className={`text-2xl sm:text-3xl font-bold ${className}`} {...props}>
            {children}
        </h2>
    );
}