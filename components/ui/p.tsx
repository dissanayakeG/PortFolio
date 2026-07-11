import { ComponentPropsWithoutRef } from "react";

export function Paragraph({ className = "text-gray-700", children, ...props }: ComponentPropsWithoutRef<"p">) {
    return (
        <p className={`text-base sm:text-lg leading-relaxed ${className}`} {...props}>
            {children}
        </p>
    );
}