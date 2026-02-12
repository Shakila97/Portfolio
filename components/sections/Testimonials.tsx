"use client";

import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui";

/**
 * Testimonials Section with carousel
 * Client component for interactivity
 */

const testimonials = [
    {
        id: "1",
        name: "Client Name",
        role: "CEO",
        company: "Company Name",
        content:
            "Exceptional work! The attention to detail and professionalism exceeded our expectations. Highly recommended for any project.",
        rating: 5,
    },
    {
        id: "2",
        name: "Client Name",
        role: "Product Manager",
        company: "Tech Corp",
        content:
            "Outstanding developer with great communication skills. Delivered the project on time and with excellent quality.",
        rating: 5,
    },
    {
        id: "3",
        name: "Client Name",
        role: "Founder",
        company: "Startup Inc",
        content:
            "A true professional who understands both design and development. Our product looks and works beautifully.",
        rating: 5,
    },
];

export function Testimonials() {
    const { ref, isVisible } = useScrollAnimation(0.3);
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex(
            (prev) => (prev - 1 + testimonials.length) % testimonials.length
        );
    };

    return (
        <section
            id="testimonials"
            className="w-full px-4 py-16 lg:px-[120px] lg:py-24 bg-surface-elevated"
        >
            <div ref={ref} className="mx-auto max-w-[1200px]">
                <h2
                    className={cn(
                        "text-3xl lg:text-5xl font-bold mb-12 text-center transition-all duration-700 ease-out",
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
                    {/* Testimonial Card */}
                    <Card className="text-center">
                        <Card.Body>
                            {/* Rating Stars */}
                            <div className="flex justify-center gap-1 mb-6">
                                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className="w-5 h-5 text-accent"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            {/* Content */}
                            <p className="text-lg text-secondary mb-8 leading-relaxed">
                                &ldquo;{testimonials[currentIndex].content}&rdquo;
                            </p>

                            {/* Author */}
                            <div>
                                <p className="text-primary font-semibold">
                                    {testimonials[currentIndex].name}
                                </p>
                                <p className="text-sm text-secondary">
                                    {testimonials[currentIndex].role} at{" "}
                                    {testimonials[currentIndex].company}
                                </p>
                            </div>
                        </Card.Body>
                    </Card>

                    {/* Navigation Buttons */}
                    <div className="flex justify-center gap-4 mt-8">
                        <button
                            onClick={prevTestimonial}
                            className="w-10 h-10 rounded-full bg-surface border border-border hover:bg-accent hover:border-accent transition-all duration-300 flex items-center justify-center"
                            aria-label="Previous testimonial"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>
                        <button
                            onClick={nextTestimonial}
                            className="w-10 h-10 rounded-full bg-surface border border-border hover:bg-accent hover:border-accent transition-all duration-300 flex items-center justify-center"
                            aria-label="Next testimonial"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Dots indicator */}
                    <div className="flex justify-center gap-2 mt-4">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={cn(
                                    "w-2 h-2 rounded-full transition-all duration-300",
                                    index === currentIndex
                                        ? "bg-accent w-8"
                                        : "bg-border hover:bg-secondary"
                                )}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
