"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

/**
 * Hero Section - Developer/Designer showcase
 * Client component for scroll animations
 */
export function Hero() {
    const { ref, isVisible } = useScrollAnimation(0.2);

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center w-full px-4 py-8 lg:px-[120px] lg:py-16 overflow-hidden"
        >
            {/* Background gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-surface via-surface to-surface-elevated opacity-50" />

            <div
                ref={ref}
                className="relative z-10 mx-auto max-w-[1200px] w-full text-center"
            >
                {/* Main heading with staggered animation */}
                <div className="space-y-4">
                    <h1
                        className={cn(
                            "text-4xl leading-[40px] lg:text-[72px] lg:leading-[80px] font-bold transition-all duration-1000 ease-out",
                            isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-8"
                        )}
                    >
                        <span className="block text-secondary uppercase tracking-wider text-sm lg:text-base mb-4">
                            Developer
                        </span>
                        <span className="block bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                            DESIGNER
                        </span>
                    </h1>

                    <p
                        className={cn(
                            "text-lg lg:text-xl text-secondary max-w-2xl mx-auto transition-all duration-1000 ease-out delay-200",
                            isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-8"
                        )}
                    >
                        Crafting beautiful digital experiences with modern web technologies
                    </p>

                    {/* CTA Buttons */}
                    <div
                        className={cn(
                            "flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 transition-all duration-1000 ease-out delay-400",
                            isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-8"
                        )}
                    >
                        <a
                            href="#projects"
                            className="inline-flex items-center justify-center px-8 py-4 text-lg rounded-lg bg-white text-black hover:bg-gray-200 transition-all duration-300 active:scale-95"
                        >
                            View Projects
                        </a>
                        <a
                            href="#contact"
                            className="inline-flex items-center justify-center px-8 py-4 text-lg rounded-lg border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 active:scale-95"
                        >
                            Get in Touch
                        </a>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent opacity-5 blur-[100px] rounded-full pointer-events-none" />
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-secondary rounded-full flex items-start justify-center p-2">
                    <div className="w-1 h-2 bg-secondary rounded-full" />
                </div>
            </div>
        </section>
    );
}
