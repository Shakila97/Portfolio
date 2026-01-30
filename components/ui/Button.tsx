import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline";
    size?: "sm" | "md" | "lg";
    children: React.ReactNode;
}

/**
 * Button component with variants following composition pattern
 * Server component by default
 */
export function Button({
    variant = "primary",
    size = "md",
    className,
    children,
    ...props
}: ButtonProps) {
    const baseStyles =
        "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 ease-out disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary:
            "bg-white text-black hover:bg-gray-200 active:scale-95",
        secondary:
            "bg-surface-elevated text-primary border border-border hover:bg-[#2a2a2a] active:scale-95",
        outline:
            "border-2 border-white text-white hover:bg-white hover:text-black active:scale-95",
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
    };

    return (
        <button
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            {children}
        </button>
    );
}
