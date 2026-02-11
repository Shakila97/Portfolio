
"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Project {
    id: string;
    title: string;
    category: string;
    layout: string;
    description: string;
    technologies: string[];
    image: string;
    images?: string[];
    liveUrl: string;
    githubUrl: string;
}

interface ProjectCardProps {
    project?: Project;
    className?: string;
    fallbackTitle?: string;
    href?: string;
}

export function ProjectCard({ project, className, fallbackTitle, href }: ProjectCardProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Combine main image and gallery images
    const slides = project
        ? [project.image, ...(project.images || [])].filter(Boolean)
        : [];

    // Auto-advance slides on hover
    useEffect(() => {
        if (!isHovered || slides.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 1500); // Change slide every 1.5s

        return () => clearInterval(interval);
    }, [isHovered, slides.length]);

    // Reset to first slide when not hovering
    useEffect(() => {
        if (!isHovered) {
            setCurrentSlide(0);
        }
    }, [isHovered]);

    const CardContent = (
        <div
            className={cn(
                "group relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#555] to-[#333] border border-border hover:border-accent transition-all duration-500 cursor-pointer",
                // If href is provided, this div fills the Link wrapper (w-full h-full)
                // If href is NOT provided, this div IS the card and takes the sizing classes (className)
                href ? "w-full h-full" : className
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Images / Slider */}
            {slides.length > 0 && (
                <>
                    {slides.map((src, index) => (
                        <div
                            key={index}
                            className={cn(
                                "absolute inset-0 transition-opacity duration-700",
                                index === currentSlide ? "opacity-100" : "opacity-0"
                            )}
                        >
                            <img
                                src={src}
                                alt={`${project?.title || fallbackTitle} - Slide ${index + 1}`}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                    ))}

                    {/* Slide Indicators (if multiple) */}
                    {slides.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                            {slides.map((_, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        "w-1.5 h-1.5 rounded-full transition-all duration-300",
                                        index === currentSlide ? "bg-accent w-4" : "bg-white/50"
                                    )}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Content */}
            <h3 className={cn(
                "relative z-10 font-bold text-white uppercase drop-shadow-md",
                className?.includes("h-[520px]") // If tall card check on original className
                    ? "text-2xl tracking-wider [writing-mode:vertical-rl] rotate-180"
                    : "text-xl"
            )}>
                {project?.title || fallbackTitle || "Project"}
            </h3>
        </div>
    );

    if (href) {
        return (
            <Link href={href} className={cn("block", className)}>
                {CardContent}
            </Link>
        );
    }

    return CardContent;
}
