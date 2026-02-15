"use client";

import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui";

interface Achievement {
    id: string;
    title: string;
    issuer: string;
    date: string;
    description: string;
    category: string;
    icon: string;
    certificateUrl?: string;
    credentialUrl?: string;
}

/**
 * Achievements & Certifications Section
 * Client component with card design matching the uploaded reference
 */

// Fallback data in case API fails
const fallbackAchievements: Achievement[] = [
    {
        id: "1",
        title: "Enterprise Design Thinking",
        issuer: "IBM",
        date: "Jan 4, 2026",
        description: "The earner has acquired knowledge of applying Enterprise Design Thinking and its value. As a Practitioner, they have the foundation to start applying it to their work.",
        category: "UI/UX",
        icon: "🎯",
    },
    {
        id: "2",
        title: "Advanced React Patterns",
        issuer: "Meta",
        date: "Dec 15, 2025",
        description: "Demonstrated mastery of advanced React patterns including hooks, context, and performance optimization techniques for building scalable applications.",
        category: "Development",
        icon: "⚛️",
    },
    {
        id: "3",
        title: "UX Design Certification",
        issuer: "Google",
        date: "Nov 20, 2025",
        description: "Completed comprehensive training in user experience design, including user research, wireframing, prototyping, and usability testing.",
        category: "Design",
        icon: "🎨",
    },
];

export function Achievements() {
    const { ref, isVisible } = useScrollAnimation(0.3);
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch achievements from API
    useEffect(() => {
        const fetchAchievements = async () => {
            try {
                const response = await fetch("/api/achievements");
                if (response.ok) {
                    const data = await response.json();
                    setAchievements(data);
                } else {
                    setAchievements(fallbackAchievements);
                }
            } catch (error) {
                console.error("Failed to fetch achievements:", error);
                setAchievements(fallbackAchievements);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAchievements();
    }, []);

    return (
        <section
            id="achievements"
            className="w-full px-4 py-16 lg:px-[120px] lg:py-24 bg-surface"
        >
            <div ref={ref} className="mx-auto max-w-[1200px]">
                <h2
                    className={cn(
                        "text-3xl lg:text-5xl font-bold mb-12 transition-all duration-700 ease-out",
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}
                >
                    Achievements & Certification
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {achievements.map((achievement, index) => (
                        <div
                            key={achievement.id}
                            className={cn(
                                "transition-all duration-500 ease-out",
                                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            )}
                            style={{
                                transitionDelay: isVisible ? `${index * 100 + 200}ms` : "0ms",
                            }}
                        >
                            <Card className="h-full hover:border-accent transition-colors duration-300">
                                {/* Icon/Certificate area */}
                                <div className="aspect-video bg-surface rounded-lg mb-4 flex items-center justify-center text-4xl">
                                    {achievement.icon || "🏆"}
                                </div>

                                <Card.Header>
                                    <div className="flex justify-between items-start mb-1">
                                        <Card.Title>{achievement.title}</Card.Title>
                                        <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-surface border border-border">
                                            {achievement.category}
                                        </span>
                                    </div>
                                    <p className="text-sm text-secondary">{achievement.issuer}</p>
                                </Card.Header>

                                <Card.Body>
                                    <p className="text-xs text-secondary mt-2 mb-4 line-clamp-3">
                                        {achievement.description}
                                    </p>
                                    <div className="flex justify-between items-center mt-auto">
                                        <p className="text-xs text-accent font-medium">{achievement.date}</p>
                                        {(achievement.certificateUrl || achievement.credentialUrl) && (
                                            <a
                                                href={achievement.certificateUrl || achievement.credentialUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs text-accent hover:underline"
                                            >
                                                View Source
                                            </a>
                                        )}
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
