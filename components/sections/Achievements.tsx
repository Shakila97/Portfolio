"use client";

import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

/**
 * Achievements & Certifications Section
 * Client component with card design matching the uploaded reference
 */

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
                                "group relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border border-border hover:border-accent transition-all duration-500 cursor-pointer",
                                "transition-all duration-500 ease-out",
                                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            )}
                            style={{
                                transitionDelay: isVisible ? `${index * 100 + 200}ms` : "0ms",
                            }}
                        >
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Card content */}
                            <div className="relative z-10 p-6 flex flex-col h-full">
                                {/* Header with icon and date */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        {/* Icon circle */}
                                        <div className="w-12 h-12 rounded-full bg-surface-elevated flex items-center justify-center text-2xl">
                                            {achievement.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-white/90">
                                                {achievement.title}
                                            </h3>
                                            <p className="text-sm text-white/60">{achievement.issuer}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-white/50 whitespace-nowrap ml-2">
                                        {achievement.date}
                                    </span>
                                </div>

                                {/* Certificate/Badge image area */}
                                <div className="aspect-video bg-gradient-to-br from-[#444] to-[#222] rounded-lg mb-4 flex items-center justify-center relative overflow-hidden group/image">
                                    {achievement.certificateUrl ? (
                                        <>
                                            <div className="absolute inset-0 z-0 p-4 flex items-center justify-center bg-[#1a1a1a]">
                                                <img
                                                    src={achievement.certificateUrl}
                                                    alt={achievement.title}
                                                    className="w-full h-full object-contain group-hover/image:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            {/* Decorative pattern */}
                                            <div className="absolute inset-0 opacity-10">
                                                <svg className="w-full h-full" viewBox="0 0 100 100">
                                                    <pattern id={`pattern-${achievement.id}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                                        <circle cx="10" cy="10" r="1" fill="currentColor" />
                                                    </pattern>
                                                    <rect width="100" height="100" fill={`url(#pattern-${achievement.id})`} />
                                                </svg>
                                            </div>

                                            {/* Certificate icon */}
                                            <svg
                                                className="w-16 h-16 text-white/30 relative z-10"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                                />
                                            </svg>
                                        </>
                                    )}
                                </div>

                                {/* Description */}
                                <p className="text-sm text-white/70 mb-4 flex-grow line-clamp-3">
                                    {achievement.description}
                                </p>

                                {/* Category tag */}
                                <div className="flex items-center">
                                    <span className="px-3 py-1 rounded-full bg-black/40 text-xs text-white/80 border border-white/10">
                                        {achievement.category}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
