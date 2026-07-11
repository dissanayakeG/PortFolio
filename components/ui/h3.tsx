import { ComponentPropsWithoutRef } from "react";

export function Heading3({ className = "text-gray-900", children, ...props }: ComponentPropsWithoutRef<"h3">) {
    return (
        <h3 className={`text-xl sm:text-2xl font-bold ${className}`} {...props}>
            {children}
        </h3>
    );
}