"use client";

import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui";

interface ProjectsProps {
    mode: "developer" | "designer";
}

interface Project {
    id: string;
    title: string;
    category: string;
    layout: string;
    description: string;
    technologies?: string[];
    image?: string;
    liveUrl?: string;
    githubUrl?: string;
}

/**
 * Projects Section with grid layout
 * Client component for scroll animations and dynamic data
 */

// Fallback data in case API fails
const fallbackDesignerProjects = [
    {
        id: "1",
        title: "UI/UX",
        category: "Design",
        layout: "tall",
        description: "Modern user interface design",
    },
    {
        id: "2",
        title: "Branding",
        category: "Identity",
        layout: "medium",
        description: "Brand identity and logo design",
    },
    {
        id: "3",
        title: "Social",
        category: "Media",
        layout: "short",
        description: "Social media graphics and content",
    },
    {
        id: "4",
        title: "Character",
        category: "Design",
        layout: "tall",
        description: "Character design and illustration",
    },
    {
        id: "5",
        title: "Logo",
        category: "Branding",
        layout: "short",
        description: "Professional logo design",
    },
    {
        id: "6",
        title: "Paintings",
        category: "Art",
        layout: "medium",
        description: "Digital paintings and artwork",
    },
];

const fallbackDeveloperProjects = [
    {
        id: "d1",
        title: "E-Commerce",
        category: "Full Stack",
        layout: "tall",
        description: "Next.js & Supabase online store",
    },
    {
        id: "d2",
        title: "Dashboard",
        category: "Frontend",
        layout: "medium",
        description: "React Admin Dashboard with Charts",
    },
    {
        id: "d3",
        title: "API Service",
        category: "Backend",
        layout: "short",
        description: "Node.js Microservices Architecture",
    },
    {
        id: "d4",
        title: "Portfolio",
        category: "Frontend",
        layout: "tall",
        description: "Modern 3D Interactive Portfolio",
    },
    {
        id: "d5",
        title: "Chat App",
        category: "Full Stack",
        layout: "short",
        description: "Real-time chat with Socket.io",
    },
    {
        id: "d6",
        title: "Task Manager",
        category: "Mobile",
        layout: "medium",
        description: "React Native Productivity App",
    },
];

export function Projects({ mode }: ProjectsProps) {
    const { ref, isVisible } = useScrollAnimation(0.2);
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/projects?mode=${mode}`);
                if (response.ok) {
                    const data = await response.json();
                    setProjects(data);
                } else {
                    setProjects(mode === "developer" ? fallbackDeveloperProjects : fallbackDesignerProjects);
                }
            } catch (error) {
                console.error("Failed to fetch projects:", error);
                setProjects(mode === "developer" ? fallbackDeveloperProjects : fallbackDesignerProjects);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, [mode]);

    const activeFilters = mode === "developer"
        ? ["All", "Full Stack", "Frontend", "Backend", "Mobile"]
        : ["All", "UI/UX", "Branding", "Illustration", "Key Visuals"];

    return (
        <section
            id="projects"
            className="w-full px-4 py-16 lg:px-[120px] lg:py-24 bg-surface-elevated"
        >
            <div ref={ref} className="mx-auto max-w-[1200px]">
                <h2
                    className={cn(
                        "text-3xl lg:text-5xl font-bold mb-12 transition-all duration-700 ease-out",
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}
                >
                    {mode === "developer" ? "Development Projects" : "Design Showcase"}
                </h2>

                {/* Filter tabs */}
                <div
                    className={cn(
                        "flex flex-wrap gap-4 mb-12 transition-all duration-700 ease-out delay-200",
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}
                >
                    {activeFilters.map(
                        (filter) => (
                            <button
                                key={filter}
                                className="px-6 py-2 rounded-full bg-surface border border-border hover:bg-accent hover:border-accent transition-all duration-300 text-sm"
                            >
                                {filter}
                            </button>
                        )
                    )}
                </div>

                {/* Bento-box layout container */}
                <div
                    className={cn(
                        "flex flex-col md:flex-row gap-4 justify-center transition-all duration-700 ease-out delay-400",
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}
                >
                    {/* Column 1: UI/UX (tall) */}
                    <div
                        className={cn(
                            "group relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#555] to-[#333] border border-border hover:border-accent transition-all duration-500 cursor-pointer",
                            "min-w-[260px] h-[520px] flex items-center justify-center"
                        )}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <h3 className="relative z-10 text-2xl font-bold text-white/75 uppercase tracking-wider [writing-mode:vertical-rl] rotate-180">
                            {projects[0]?.title || "UI/UX"}
                        </h3>
                    </div>

                    {/* Column 2: Branding + Logo */}
                    <div className="flex flex-col gap-4 min-w-[260px]">
                        {/* Branding (medium) */}
                        <div
                            className={cn(
                                "group relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#555] to-[#333] border border-border hover:border-accent transition-all duration-500 cursor-pointer",
                                "h-[336px] flex items-center justify-center"
                            )}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <h3 className="relative z-10 text-xl font-bold text-white/75 uppercase">
                                {projects[1]?.title || "Branding"}
                            </h3>
                        </div>

                        {/* Logo (short) */}
                        <div
                            className={cn(
                                "group relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#555] to-[#333] border border-border hover:border-accent transition-all duration-500 cursor-pointer",
                                "h-[168px] flex items-center justify-center"
                            )}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <h3 className="relative z-10 text-xl font-bold text-white/75 uppercase">
                                {projects[2]?.title || "Logo"}
                            </h3>
                        </div>
                    </div>

                    {/* Column 3: Social (tall) */}
                    <div
                        className={cn(
                            "group relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#555] to-[#333] border border-border hover:border-accent transition-all duration-500 cursor-pointer",
                            "min-w-[260px] h-[520px] flex items-center justify-center"
                        )}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <h3 className="relative z-10 text-2xl font-bold text-white/75 uppercase tracking-wider [writing-mode:vertical-rl] rotate-180">
                            {projects[3]?.title || "Social"}
                        </h3>
                    </div>

                    {/* Column 4: Character + Paintings */}
                    <div className="flex flex-col gap-4 min-w-[260px]">
                        {/* Character (short) */}
                        <div
                            className={cn(
                                "group relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#555] to-[#333] border border-border hover:border-accent transition-all duration-500 cursor-pointer",
                                "h-[168px] flex items-center justify-center"
                            )}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <h3 className="relative z-10 text-xl font-bold text-white/75 uppercase">
                                {projects[4]?.title || "Character"}
                            </h3>
                        </div>

                        {/* Paintings (medium) */}
                        <div
                            className={cn(
                                "group relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#555] to-[#333] border border-border hover:border-accent transition-all duration-500 cursor-pointer",
                                "h-[336px] flex items-center justify-center"
                            )}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <h3 className="relative z-10 text-xl font-bold text-white/75 uppercase">
                                {projects[5]?.title || "Paintings"}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
