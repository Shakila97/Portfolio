"use client";

import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./ProjectCard";

interface ProjectsProps {
    mode: "developer" | "designer";
}

interface Project {
    id: string;
    title: string;
    category: string;
    layout: string;
    description: string;
    technologies: string[];
    image: string;
    liveUrl: string;
    githubUrl: string;
}

/**
 * Projects Section with bento-box layout
 * Client component for scroll animations and dynamic data
 */

// Fallback data in case API fails
const fallbackDesignerProjects = [
    {
        id: "1",
        title: "UI/UX",
        category: "Design",
        layout: "tall", // Tall vertical card
        description: "",
        technologies: [],
        image: "",
        liveUrl: "",
        githubUrl: "",
    },
    {
        id: "2",
        title: "Branding",
        category: "Identity",
        layout: "medium", // Medium height in column
        description: "",
        technologies: [],
        image: "",
        liveUrl: "",
        githubUrl: "",
    },
    {
        id: "3",
        title: "Logo",
        category: "Branding",
        layout: "short", // Short card in column
        description: "",
        technologies: [],
        image: "",
        liveUrl: "",
        githubUrl: "",
    },
    {
        id: "4",
        title: "Social",
        category: "Media",
        layout: "tall", // Tall vertical card
        description: "",
        technologies: [],
        image: "",
        liveUrl: "",
        githubUrl: "",
    },
    {
        id: "5",
        title: "Character",
        category: "Design",
        layout: "short", // Short card in column
        description: "",
        technologies: [],
        image: "",
        liveUrl: "",
        githubUrl: "",
    },
    {
        id: "6",
        title: "Paintings",
        category: "Art",
        layout: "medium", // Medium height in column
        description: "",
        technologies: [],
        image: "",
        liveUrl: "",
        githubUrl: "",
    },
];

const fallbackDeveloperProjects = [
    {
        id: "d1",
        title: "E-Commerce",
        category: "Full Stack",
        layout: "tall",
        description: "",
        technologies: [],
        image: "",
        liveUrl: "",
        githubUrl: "",
    },
    {
        id: "d2",
        title: "Dashboard",
        category: "Frontend",
        layout: "medium",
        description: "",
        technologies: [],
        image: "",
        liveUrl: "",
        githubUrl: "",
    },
    {
        id: "d3",
        title: "API Service",
        category: "Backend",
        layout: "short",
        description: "",
        technologies: [],
        image: "",
        liveUrl: "",
        githubUrl: "",
    },
    {
        id: "d4",
        title: "Portfolio",
        category: "Frontend",
        layout: "tall",
        description: "",
        technologies: [],
        image: "",
        liveUrl: "",
        githubUrl: "",
    },
    {
        id: "d5",
        title: "Chat App",
        category: "Full Stack",
        layout: "short",
        description: "",
        technologies: [],
        image: "",
        liveUrl: "",
        githubUrl: "",
    },
    {
        id: "d6",
        title: "Task Manager",
        category: "Mobile",
        layout: "medium",
        description: "",
        technologies: [],
        image: "",
        liveUrl: "",
        githubUrl: "",
    },
];

export function Projects({ mode }: ProjectsProps) {
    const { ref, isVisible } = useScrollAnimation(0.2);
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch projects from API
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`/api/projects?mode=${mode}`);
                if (response.ok) {
                    const data = await response.json();
                    setProjects(data);
                } else {
                    // Use fallback data if API fails
                    setProjects(mode === "developer" ? fallbackDeveloperProjects : fallbackDesignerProjects);
                }
            } catch (error) {
                console.error("Failed to fetch projects:", error);
                // Use fallback data if API fails
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
            <div ref={ref} className="mx-auto max-w-[1440px]">
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
                        "flex flex-wrap gap-2 mb-8 justify-center transition-all duration-700 ease-out delay-200",
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}
                >
                    {activeFilters.map((filter) => (
                        <button
                            key={filter}
                            className="px-6 py-2 rounded-full bg-surface border border-border hover:bg-accent hover:border-accent transition-all duration-300 text-sm"
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Bento-box layout container */}
                <div
                    className={cn(
                        "flex flex-col md:flex-row gap-4 justify-center transition-all duration-700 ease-out delay-400",
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}
                >
                    {/* Items are hardcoded for now to match specific layout, but data is dynamic */}

                    {/* Column 1: Item 0 (tall) */}
                    <ProjectCard
                        project={projects[0]}
                        fallbackTitle="Project"
                        className="min-w-[260px] h-[520px] flex items-center justify-center shrink-0"
                        href={mode === "designer" && projects[0]?.id ? `/designs/${projects[0].id}` : undefined}
                    />

                    {/* Column 2: Items 1 & 2 */}
                    <div className="flex flex-col gap-4 min-w-[260px] shrink-0">
                        {/* Item 1 (medium) */}
                        <ProjectCard
                            project={projects[1]}
                            fallbackTitle="Project"
                            className="h-[336px] flex items-center justify-center"
                            href={mode === "designer" && projects[1]?.id ? `/designs/${projects[1].id}` : undefined}
                        />

                        {/* Item 2 (short) - LOGO CATEGORY SLIDER */}
                        <ProjectCard
                            project={
                                mode === "designer" && projects.length > 0
                                    ? {
                                        ...projects[2],
                                        title: "Logos",
                                        // Collect images from Rabbit (3), Lytou (7), STC (8) projects
                                        images: projects
                                            .filter(p => ["7", "8"].includes(p.id)) // Get extra logo projects
                                            .map(p => p.image)
                                    }
                                    : projects[2]
                            }
                            fallbackTitle="Project"
                            className="h-[168px] flex items-center justify-center"
                            // Link to full designs page since this is a category showcase
                            href={mode === "designer" ? "/designs" : undefined}
                        />
                    </div>

                    {/* Column 3: Item 3 (tall) */}
                    <ProjectCard
                        project={projects[3]}
                        fallbackTitle="Project"
                        className="min-w-[260px] h-[520px] flex items-center justify-center shrink-0"
                        href={mode === "designer" && projects[3]?.id ? `/designs/${projects[3].id}` : undefined}
                    />

                    {/* Column 4: Items 4 & 5 */}
                    <div className="flex flex-col gap-4 min-w-[260px] shrink-0">
                        {/* Item 4 (short) */}
                        <ProjectCard
                            project={projects[4]}
                            fallbackTitle="Project"
                            className="h-[168px] flex items-center justify-center"
                            href={mode === "designer" && projects[4]?.id ? `/designs/${projects[4].id}` : undefined}
                        />

                        {/* Item 5 (medium) */}
                        <ProjectCard
                            project={projects[5]}
                            fallbackTitle="Project"
                            className="h-[336px] flex items-center justify-center"
                            href={mode === "designer" && projects[5]?.id ? `/designs/${projects[5].id}` : undefined}
                        />
                    </div>
                </div>

                {/* View More Button */}
                <div
                    className={cn(
                        "mt-12 flex justify-center transition-all duration-700 ease-out delay-500",
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}
                >
                    <a
                        href={mode === "designer" ? "/designs" : "#"}
                        className={cn(
                            "group flex items-center gap-2 text-white hover:text-accent transition-colors",
                            mode === "developer" && "hidden" // Hide if no dev page yet, or remove this line if we want it to show
                        )}
                    >
                        <span className="text-lg font-medium">more</span>
                        <svg
                            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}
