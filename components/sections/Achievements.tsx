"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui";

/**
 * Achievements & Certifications Section
 * Client component for scroll animations
 */

const achievements = [
    {
        id: "1",
        title: "Achievement Title",
        issuer: "Organization Name",
        date: "2024",
    },
    {
        id: "2",
        title: "Achievement Title",
        issuer: "Organization Name",
        date: "2024",
    },
    {
        id: "3",
        title: "Achievement Title",
        issuer: "Organization Name",
        date: "2023",
    },
];

export function Achievements() {
    const { ref, isVisible } = useScrollAnimation(0.3);

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
                                {/* Certificate placeholder */}
                                <div className="aspect-video bg-surface rounded-lg mb-4 flex items-center justify-center">
                                    <svg
                                        className="w-16 h-16 text-secondary"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                        />
                                    </svg>
                                </div>

                                <Card.Header>
                                    <Card.Title>{achievement.title}</Card.Title>
                                </Card.Header>

                                <Card.Body>
                                    <p className="text-sm mb-2">{achievement.issuer}</p>
                                    <p className="text-xs text-accent">{achievement.date}</p>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
