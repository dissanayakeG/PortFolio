import { ComponentPropsWithoutRef, forwardRef } from "react";

export const Select = forwardRef<HTMLSelectElement, ComponentPropsWithoutRef<"select">>(
    ({ className = "border-theme text-gray-900 focus:ring-primary focus:border-primary", children, ...props }, ref) => {
        return (
            <select
                ref={ref}
                className={`border-2 rounded-xl p-4 lg:p-5 w-full text-base lg:text-lg focus:outline-none focus:ring-2 transition-all bg-white cursor-pointer ${className}`}
                {...props}
            >
                {children}
            </select>
        );
    }
);

Select.displayName = "Select";
