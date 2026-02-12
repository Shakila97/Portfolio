"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui";

interface ProjectsProps {
    mode: "developer" | "designer";
}

/**
 * Projects Section with grid layout
 * Client component for scroll animations
 */

const designerProjects = [
    {
        id: "1",
        title: "UI/UX",
        category: "Design",
        description: "Modern user interface design",
    },
    {
        id: "2",
        title: "Branding",
        category: "Identity",
        description: "Brand identity and logo design",
    },
    {
        id: "3",
        title: "Social",
        category: "Media",
        description: "Social media graphics and content",
    },
    {
        id: "4",
        title: "Character",
        category: "Design",
        description: "Character design and illustration",
    },
    {
        id: "5",
        title: "Logo",
        category: "Branding",
        description: "Professional logo design",
    },
    {
        id: "6",
        title: "Paintings",
        category: "Art",
        description: "Digital paintings and artwork",
    },
];

const developerProjects = [
    {
        id: "d1",
        title: "E-Commerce",
        category: "Full Stack",
        description: "Next.js & Supabase online store",
    },
    {
        id: "d2",
        title: "Dashboard",
        category: "Frontend",
        description: "React Admin Dashboard with Charts",
    },
    {
        id: "d3",
        title: "API Service",
        category: "Backend",
        description: "Node.js Microservices Architecture",
    },
    {
        id: "d4",
        title: "Portfolio",
        category: "Frontend",
        description: "Modern 3D Interactive Portfolio",
    },
    {
        id: "d5",
        title: "Chat App",
        category: "Full Stack",
        description: "Real-time chat with Socket.io",
    },
    {
        id: "d6",
        title: "Task Manager",
        category: "Mobile",
        description: "React Native Productivity App",
    },
];

export function Projects({ mode }: ProjectsProps) {
    const { ref, isVisible } = useScrollAnimation(0.2);

    const activeProjects = mode === "developer" ? developerProjects : designerProjects;
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

                {/* Projects grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activeProjects.map((project, index) => (
                        <div
                            key={project.id}
                            className={cn(
                                "transition-all duration-500 ease-out",
                                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            )}
                            style={{
                                transitionDelay: isVisible ? `${index * 100 + 400}ms` : "0ms",
                            }}
                        >
                            <Card className="group hover:border-accent cursor-pointer h-full">
                                {/* Project image placeholder */}
                                <div className="aspect-video bg-surface rounded-lg mb-4 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="w-full h-full flex items-center justify-center text-4xl text-secondary">
                                        {project.title.charAt(0)}
                                    </div>
                                </div>

                                <Card.Header>
                                    <Card.Title>{project.title}</Card.Title>
                                    <p className="text-sm text-accent mt-1">{project.category}</p>
                                </Card.Header>

                                <Card.Body>
                                    <p className="text-sm">{project.description}</p>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
