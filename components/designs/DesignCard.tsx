"use client";

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

interface DesignCardProps {
    project: Project;
    className?: string;
}

export function DesignCard({ project, className }: DesignCardProps) {
    return (
        <Link href={`/designs/${project.id}`} className="block group">
            <div
                className={cn(
                    "relative rounded-xl overflow-hidden bg-surface border border-border hover:border-accent transition-all duration-300",
                    className
                )}
            >
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                </div>

                {/* Content */}
                <div className="p-4 bg-surface-elevated">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-accent transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-secondary text-sm font-medium uppercase tracking-wide">
                        {project.category}
                    </p>
                </div>
            </div>
        </Link>
    );
}
