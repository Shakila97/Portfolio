"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
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
    certificateImage?: string;
    certificateUrl?: string;
    credentialUrl?: string;
}

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

/**
 * Achievements & Certifications Section
 * Mobile: horizontally scrollable carousel cards
 * Desktop: 3-column grid
 */
export function Achievements() {
    const { ref, isVisible } = useScrollAnimation(0.3);
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

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
            className="w-full px-4 py-10 lg:px-[120px] lg:py-24 bg-surface"
        >
            <div ref={ref} className="mx-auto max-w-[1200px]">
                <h2
                    className={cn(
                        "text-2xl lg:text-5xl font-bold mb-6 lg:mb-12 transition-all duration-700 ease-out",
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}
                >
                    Achievements &amp; Certification
                </h2>

                {/* ── MOBILE: horizontal scroll carousel ── */}
                <div
                    ref={scrollRef}
                    className={cn(
                        "lg:hidden flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide transition-all duration-700 ease-out delay-200",
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}
                >
                    {(isLoading ? fallbackAchievements : achievements).map((achievement, index) => (
                        <div
                            key={achievement.id}
                            className="snap-start flex-shrink-0 w-[85vw] max-w-[340px]"
                        >
                            <div className="w-full h-28 relative rounded-xl [background:linear-gradient(180deg,_rgba(255,_255,_255,_0.1),_rgba(153,_153,_153,_0.1))] flex flex-col items-center justify-center py-2 px-0 box-border text-left text-xs text-[#b3b3b3] font-inter">
                                <div className="w-full flex items-center justify-between py-0 px-[8.7px] box-border gap-[6.7px] max-w-full">
                                    {achievement.certificateImage ? (
                                        <Image className="h-24 w-24 rounded flex-shrink-0 object-cover" width={96} height={96} sizes="100vw" src={achievement.certificateImage} alt={achievement.title} />
                                    ) : (
                                        <div className="h-24 w-24 rounded bg-[#090a0a]/50 flex items-center justify-center text-4xl flex-shrink-0">
                                            {achievement.icon || "🏆"}
                                        </div>
                                    )}
                                    <div className="w-[222px] flex flex-col items-start justify-center gap-1 flex-1">
                                        <div className="relative text-base tracking-[-0.04em] leading-[96%] font-semibold text-white line-clamp-2">{achievement.title}</div>
                                        <div className="flex items-center justify-center gap-2.5 text-center">
                                            <div className="relative tracking-[-0.04em] font-semibold text-white">{achievement.issuer}</div>
                                            <div className="relative tracking-[-0.04em]">{achievement.date}</div>
                                        </div>
                                        <div className="w-full flex flex-col items-start justify-center gap-1">
                                            <div className="h-[27px] overflow-hidden shrink-0 flex items-center justify-start w-full">
                                                <div className="self-stretch w-full relative tracking-[-0.04em] leading-[112%] inline-block shrink-0 line-clamp-2 text-left">{achievement.description}</div>
                                            </div>
                                            <div className="self-stretch flex items-center justify-between text-[11px] text-[#e0f0b5]">
                                                <div className="rounded-[6.5px] bg-[#090a0a] flex items-center py-[2.2px] px-[8.7px]">
                                                    <div className="relative tracking-[-0.04em]">{achievement.category}</div>
                                                </div>
                                                {(achievement.certificateUrl || achievement.credentialUrl) && (
                                                    <a
                                                        href={achievement.certificateUrl || achievement.credentialUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="px-2 py-0.5 bg-[#090a0a]/50 border border-[#b3b3b3]/30 rounded-full text-[10px] text-white hover:border-white transition-colors"
                                                    >
                                                        View
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── DESKTOP: 3-column grid ── */}
                <div className="hidden lg:grid grid-cols-3 gap-6">
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
