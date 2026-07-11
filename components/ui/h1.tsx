import { ComponentPropsWithoutRef } from "react";

export function Heading1({ className = "text-gray-900", children, ...props }: ComponentPropsWithoutRef<"h1">) {
    return (
        <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight ${className}`} {...props}>
            {children}
        </h1>
    );
}