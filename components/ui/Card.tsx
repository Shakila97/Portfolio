import React from "react";
import { cn } from "@/lib/utils";

/**
 * Card component using Dot Notation pattern for composition
 * Follows blueprint's composition over configuration principle
 */

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function Card({ className, children, ...props }: CardProps) {
    return (
        <div
            className={cn(
                "rounded-lg bg-surface-elevated border border-border p-6 transition-all duration-300",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

Card.Header = function CardHeader({
    className,
    children,
    ...props
}: CardHeaderProps) {
    return (
        <div className={cn("mb-4", className)} {...props}>
            {children}
        </div>
    );
};

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode;
}

Card.Title = function CardTitle({
    className,
    children,
    ...props
}: CardTitleProps) {
    return (
        <h3
            className={cn("text-xl font-bold text-primary", className)}
            {...props}
        >
            {children}
        </h3>
    );
};

interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

Card.Body = function CardBody({
    className,
    children,
    ...props
}: CardBodyProps) {
    return (
        <div className={cn("text-secondary", className)} {...props}>
            {children}
        </div>
    );
};

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

Card.Footer = function CardFooter({
    className,
    children,
    ...props
}: CardFooterProps) {
    return (
        <div className={cn("mt-4 pt-4 border-t border-border", className)} {...props}>
            {children}
        </div>
    );
};
