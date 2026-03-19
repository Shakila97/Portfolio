"use client";

import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

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

// Fallback data in case API fails
const fallbackDesignerProjects: Project[] = [
    { id: "1", title: "UI/UX", category: "UI/UX", layout: "tall", description: "Modern user interface design" },
    { id: "2", title: "Branding", category: "Branding", layout: "medium", description: "Brand identity and logo design" },
    { id: "3", title: "Social", category: "Illustration", layout: "short", description: "Social media graphics and content" },
    { id: "4", title: "Character", category: "Illustration", layout: "tall", description: "Character design and illustration" },
    { id: "5", title: "Logo Design", category: "Branding", layout: "short", description: "Professional logo design" },
    { id: "6", title: "Digital Gallery", category: "Key Visuals", layout: "medium", description: "Digital paintings and artwork" },
];

const fallbackDeveloperProjects: Project[] = [
    { id: "d1", title: "E-Commerce", category: "Full Stack", layout: "tall", description: "Next.js & Supabase online store" },
    { id: "d2", title: "Dashboard", category: "Frontend", layout: "medium", description: "React Admin Dashboard with Charts" },
    { id: "d3", title: "API Service", category: "Backend", layout: "short", description: "Node.js Microservices Architecture" },
    { id: "d4", title: "Portfolio", category: "Frontend", layout: "tall", description: "Modern 3D Interactive Portfolio" },
    { id: "d5", title: "Chat App", category: "Full Stack", layout: "short", description: "Real-time chat with Socket.io" },
    { id: "d6", title: "Task Manager", category: "Mobile", layout: "medium", description: "React Native Productivity App" },
];

/** Returns Tailwind height classes based on layout value — desktop only */
function getCardHeight(layout: string): string {
    switch (layout) {
        case "tall": return "lg:h-[520px]";
        case "medium": return "lg:h-[336px]";
        case "short": return "lg:h-[168px]";
        default: return "lg:h-[260px]";
    }
}

/** Single project card */
function ProjectCard({ project, isVertical }: { project: Project; isVertical?: boolean }) {
    const heightClass = getCardHeight(project.layout);

    return (
        <div
            className={cn(
                "group relative rounded-2xl overflow-hidden border border-border",
                "hover:border-accent transition-all duration-500 cursor-pointer",
                "flex items-center justify-center",
                // Mobile: fixed compact height; Desktop: layout-based height
                "h-[160px]",
                heightClass,
                project.image ? "" : "bg-gradient-to-br from-[#555] to-[#333]"
            )}
        >
            {/* Background image */}
            {project.image && (
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${project.image})` }}
                />
            )}

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />

            {/* Hover accent overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Title */}
            <h3
                className={cn(
                    "relative z-10 font-bold text-white/90 uppercase tracking-wider text-lg",
                    "drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]",
                    // Writing mode only on desktop tall cards
                    isVertical && "lg:text-2xl lg:[writing-mode:vertical-rl] lg:rotate-180"
                )}
            >
                {project.title}
            </h3>

            {/* Category badge visible always */}
            <span className="absolute bottom-2 left-2 z-10 px-2 py-0.5 bg-black/60 border border-white/20 text-white/70 text-[10px] rounded-full backdrop-blur-sm">
                {project.category}
            </span>

            {/* Hover info overlay */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white/80 text-xs text-center mb-2 line-clamp-2 drop-shadow">
                    {project.description}
                </p>
                {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 justify-center">
                        {project.technologies.slice(0, 3).map((tech, i) => (
                            <span
                                key={i}
                                className="px-2 py-0.5 bg-black/50 border border-white/20 text-white/70 text-xs rounded-full backdrop-blur-sm"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                )}
                <div className="flex gap-2 mt-2">
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="px-3 py-1 bg-accent text-white text-xs rounded-full hover:bg-accent/80 transition-colors"
                        >
                            Live ↗
                        </a>
                    )}
                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="px-3 py-1 bg-black/60 border border-white/30 text-white text-xs rounded-full hover:bg-white/20 transition-colors"
                        >
                            GitHub
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

/**
 * Groups projects into columns for the desktop bento layout
 */
function buildColumns(projects: Project[]): Project[][] {
    const columns: Project[][] = [];
    let i = 0;

    while (i < projects.length) {
        const p = projects[i];
        const layout = p.layout;

        if (layout === "tall") {
            columns.push([p]);
            i++;
        } else if (layout === "short") {
            const next = projects[i + 1];
            if (next && next.layout === "medium") {
                columns.push([p, next]);
                i += 2;
            } else {
                columns.push([p]);
                i++;
            }
        } else if (layout === "medium") {
            const next = projects[i + 1];
            if (next && next.layout === "short") {
                columns.push([p, next]);
                i += 2;
            } else {
                columns.push([p]);
                i++;
            }
        } else {
            columns.push([p]);
            i++;
        }
    }

    return columns;
}

export function Projects({ mode }: ProjectsProps) {
    const { ref, isVisible } = useScrollAnimation(0.2);
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState("All");

    useEffect(() => {
        const fetchProjects = async () => {
            setIsLoading(true);
            setActiveFilter("All");
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

    const filtered = activeFilter === "All"
        ? projects
        : projects.filter((p) => p.category === activeFilter);

    const columns = buildColumns(filtered);

    return (
        <section
            id="projects"
            className="w-full px-4 py-10 lg:px-[120px] lg:py-24 bg-surface-elevated"
        >
            <div ref={ref} className="mx-auto max-w-[1200px]">
                <h2
                    className={cn(
                        "text-2xl lg:text-5xl font-bold mb-6 lg:mb-12 transition-all duration-700 ease-out",
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}
                >
                    {mode === "developer" ? "Development Projects" : "Design Showcase"}
                </h2>

                {/* Filter tabs – horizontal scroll on mobile */}
                <div
                    className={cn(
                        "flex gap-2 lg:gap-4 mb-6 lg:mb-12 overflow-x-auto pb-2 scrollbar-hide transition-all duration-700 ease-out delay-200",
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}
                >
                    {activeFilters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={cn(
                                "flex-shrink-0 px-4 py-1.5 lg:px-6 lg:py-2 rounded-full border transition-all duration-300 text-xs lg:text-sm",
                                activeFilter === filter
                                    ? "bg-accent border-accent text-white"
                                    : "bg-surface border-border hover:bg-accent hover:border-accent"
                            )}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Loading state */}
                {isLoading ? (
                    <div className="grid grid-cols-2 lg:hidden gap-3">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-[160px] rounded-2xl bg-surface animate-pulse" />
                        ))}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="flex items-center justify-center h-40 text-secondary text-base">
                        No projects found in this category.
                    </div>
                ) : (
                    <>
                        {/* ── MOBILE layout: 2-column grid ── */}
                        <div
                            className={cn(
                                "grid grid-cols-2 gap-3 lg:hidden transition-all duration-700 ease-out delay-400",
                                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            )}
                        >
                            {filtered.map((project) => (
                                <ProjectCard key={project.id} project={project} isVertical={false} />
                            ))}
                        </div>

                        {/* ── DESKTOP layout: bento-box columns ── */}
                        <div
                            className={cn(
                                "hidden lg:flex flex-row flex-wrap gap-4 justify-center transition-all duration-700 ease-out delay-400",
                                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            )}
                        >
                            {columns.map((col, colIdx) => {
                                const isTallSingle = col.length === 1 && col[0].layout === "tall";

                                if (col.length === 1) {
                                    return (
                                        <div key={col[0].id} className="min-w-[260px]">
                                            <ProjectCard project={col[0]} isVertical={isTallSingle} />
                                        </div>
                                    );
                                }

                                return (
                                    <div key={`col-${colIdx}`} className="flex flex-col gap-4 min-w-[260px]">
                                        {col.map((p) => (
                                            <ProjectCard key={p.id} project={p} isVertical={false} />
                                        ))}
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
