"use client";

import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui";

interface Testimonial {
    id: string;
    name: string;
    role: string;
    company: string;
    content: string;
    rating: number;
    avatar?: string;
    featured?: boolean;
}

// Fallback data in case API fails
const fallbackTestimonials: Testimonial[] = [
    {
        id: "1",
        name: "Sarah Johnson",
        role: "CEO",
        company: "TechStart Inc",
        content: "Exceptional work! The attention to detail and professionalism exceeded our expectations. Highly recommended for any project.",
        rating: 5,
    },
    {
        id: "2",
        name: "Michael Chen",
        role: "Product Manager",
        company: "Tech Corp",
        content: "Outstanding developer with great communication skills. Delivered the project on time and with excellent quality.",
        rating: 5,
    },
    {
        id: "3",
        name: "Emily Rodriguez",
        role: "Founder",
        company: "Startup Inc",
        content: "A true professional who understands both design and development. Our product looks and works beautifully.",
        rating: 5,
    },
];

/**
 * Testimonials Section with carousel
 * Mobile: compact card with avatar initials, smaller text
 * Desktop: full-size card with prev/next controls
 */
export function Testimonials() {
    const { ref, isVisible } = useScrollAnimation(0.3);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await fetch("/api/testimonials");
                if (response.ok) {
                    const data = await response.json();
                    setTestimonials(data);
                } else {
                    setTestimonials(fallbackTestimonials);
                }
            } catch (error) {
                console.error("Failed to fetch testimonials:", error);
                setTestimonials(fallbackTestimonials);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    const nextTestimonial = () => {
        if (testimonials.length === 0) return;
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        if (testimonials.length === 0) return;
        setCurrentIndex(
            (prev) => (prev - 1 + testimonials.length) % testimonials.length
        );
    };

    const current = testimonials[currentIndex];

    return (
        <section
            id="testimonials"
            className="w-full px-4 py-10 lg:px-[120px] lg:py-24 bg-surface-elevated"
        >
            <div ref={ref} className="mx-auto max-w-[1200px]">
                <h2
                    className={cn(
                        "text-2xl lg:text-5xl font-bold mb-6 lg:mb-12 text-center transition-all duration-700 ease-out",
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}
                >
                    Testimonial
                </h2>

                <div
                    className={cn(
                        "relative max-w-3xl mx-auto transition-all duration-700 ease-out delay-200",
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}
                >
                    {isLoading || testimonials.length === 0 ? (
                        <Card className="text-center">
                            <Card.Body>
                                <p className="text-secondary py-8 lg:py-12">
                                    {isLoading ? "Loading testimonials..." : "No testimonials available"}
                                </p>
                            </Card.Body>
                        </Card>
                    ) : (
                        <>
                            {/* Testimonial Card */}
                            <div className="bg-surface-elevated border border-border rounded-2xl p-6 lg:p-8 text-center">
                                {/* Rating Stars */}
                                <div className="flex justify-center gap-1 mb-4 lg:mb-6">
                                    {[...Array(current?.rating || 5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className="w-4 h-4 lg:w-5 lg:h-5 text-accent"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>

                                {/* Content */}
                                <p className="text-sm lg:text-lg text-secondary mb-5 lg:mb-8 leading-relaxed">
                                    &ldquo;{current?.content || ''}&rdquo;
                                </p>

                                {/* Author with avatar initials */}
                                <div className="flex items-center justify-center gap-3">
                                    <div className="w-9 h-9 lg:w-11 lg:h-11 rounded-full bg-surface border border-border flex items-center justify-center text-sm font-bold text-accent flex-shrink-0">
                                        {current?.name?.charAt(0) || "?"}
                                    </div>
                                    <div className="text-left">
                                        <p className="text-primary font-semibold text-sm lg:text-base">
                                            {current?.name || ''}
                                        </p>
                                        <p className="text-xs lg:text-sm text-secondary">
                                            {current?.role || ''} at {current?.company || ''}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Navigation */}
                            <div className="flex justify-center gap-4 mt-5 lg:mt-8">
                                <button
                                    onClick={prevTestimonial}
                                    className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-surface border border-border hover:bg-accent hover:border-accent transition-all duration-300 flex items-center justify-center"
                                    aria-label="Previous testimonial"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={nextTestimonial}
                                    className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-surface border border-border hover:bg-accent hover:border-accent transition-all duration-300 flex items-center justify-center"
                                    aria-label="Next testimonial"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>

                            {/* Dots indicator */}
                            <div className="flex justify-center gap-2 mt-3">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={cn(
                                            "h-2 rounded-full transition-all duration-300",
                                            index === currentIndex
                                                ? "bg-accent w-6 lg:w-8"
                                                : "bg-border hover:bg-secondary w-2"
                                        )}
                                        aria-label={`Go to testimonial ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
