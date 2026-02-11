"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

/**
 * Navigation Component
 * Client component for interactivity (mobile menu, scroll effects)
 */
export function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { href: "#home", label: "Home" },
        { href: "#about", label: "About" },
        { href: "#projects", label: "Projects" },
        { href: "#contact", label: "Contact Me" },
    ];

    const handleLinkClick = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-surface-elevated/95 backdrop-blur-md border-b border-border"
                    : "bg-transparent"
            )}
        >
            <div className="w-full px-4 lg:px-[120px]">
                <div className="mx-auto max-w-[1200px] flex items-center justify-between h-16">
                    {/* Logo */}
                    <a href="#home" className="text-xl font-bold">
                        Portfolio
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-secondary hover:text-primary transition-colors duration-300"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
                        aria-label="Toggle menu"
                    >
                        <span
                            className={cn(
                                "w-6 h-0.5 bg-primary transition-all duration-300",
                                isMobileMenuOpen && "rotate-45 translate-y-2"
                            )}
                        />
                        <span
                            className={cn(
                                "w-6 h-0.5 bg-primary transition-all duration-300",
                                isMobileMenuOpen && "opacity-0"
                            )}
                        />
                        <span
                            className={cn(
                                "w-6 h-0.5 bg-primary transition-all duration-300",
                                isMobileMenuOpen && "-rotate-45 -translate-y-2"
                            )}
                        />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={cn(
                    "fixed inset-0 top-16 bg-surface-elevated/98 backdrop-blur-md md:hidden transition-all duration-300 overflow-y-auto",
                    isMobileMenuOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                )}
            >
                <div className="min-h-full p-4">
                    <div className="flex flex-col gap-4 pt-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={handleLinkClick}
                                className="text-2xl text-secondary hover:text-primary transition-colors duration-300 py-3"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}
