import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

interface HeroProps {
    mode: "developer" | "designer";
    setMode: (mode: "developer" | "designer") => void;
}

/**
 * Hero Section - Developer/Designer showcase
 * Mobile: image on top, text below, full-width stacked buttons
 * Desktop (lg+): side-by-side layout
 */
export function Hero({ mode, setMode }: HeroProps) {
    const { ref, isVisible } = useScrollAnimation(0.2);

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center w-full px-4 pt-14 pb-8 lg:px-[120px] lg:py-16 overflow-hidden"
        >
            {/* Background gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-surface via-surface to-surface-elevated opacity-50" />

            <div
                ref={ref}
                className="relative z-10 mx-auto max-w-[1200px] w-full"
            >
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-16">

                    {/* Image – on mobile: top, full width; on desktop: right column */}
                    <div className="w-full max-w-[280px] mx-auto lg:mx-0 lg:flex-1 lg:max-w-none order-1 lg:order-2">
                        <div
                            className={cn(
                                "relative aspect-square rounded-2xl overflow-hidden transition-all duration-1000 ease-out",
                                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            )}
                        >
                            {/* Developer mode image */}
                            <Image
                                src="/images/hero-developer.png"
                                alt="Developer Mode"
                                fill
                                className={cn(
                                    "object-cover transition-opacity duration-700 ease-in-out",
                                    mode === "developer" ? "opacity-100" : "opacity-0"
                                )}
                                priority
                            />
                            {/* Designer mode image */}
                            <Image
                                src="/images/Group 1244830446.png"
                                alt="Designer Mode"
                                fill
                                className={cn(
                                    "object-cover transition-opacity duration-700 ease-in-out",
                                    mode === "designer" ? "opacity-100" : "opacity-0"
                                )}
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-surface/20 to-transparent mix-blend-overlay pointer-events-none" />
                        </div>
                    </div>

                    {/* Text Content – on mobile: below image; on desktop: left column */}
                    <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1 w-full">
                        <div className="space-y-0 lg:space-y-4">
                            <button
                                onClick={() => setMode("developer")}
                                className={cn(
                                    "block uppercase tracking-wider text-[38px] sm:text-[48px] lg:text-[80px] leading-[1.05] transition-all duration-200",
                                    mode === "developer"
                                        ? "text-primary font-bold scale-105 origin-center lg:origin-left"
                                        : "text-secondary hover:text-primary"
                                )}
                            >
                                Developer
                            </button>
                            <button
                                onClick={() => setMode("designer")}
                                className={cn(
                                    "block uppercase tracking-wider text-[38px] sm:text-[48px] lg:text-[100px] leading-[1.05] transition-all duration-200",
                                    mode === "designer"
                                        ? "text-accent font-bold scale-105 origin-center lg:origin-left"
                                        : "text-secondary hover:text-accent"
                                )}
                            >
                                Designer
                            </button>
                        </div>

                        <p
                            className={cn(
                                "text-sm lg:text-xl text-secondary max-w-xs lg:max-w-xl mt-4 lg:mt-8 transition-all duration-1000 ease-out",
                                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            )}
                        >
                            {mode === "developer"
                                ? "Building robust, scalable, and high-performance web solutions."
                                : "Crafting beautiful, intuitive, and engaging digital experiences."}
                        </p>

                        {/* CTA Buttons */}
                        <div
                            className={cn(
                                "flex flex-row gap-3 mt-5 lg:mt-8 w-full lg:w-auto transition-all duration-1000 ease-out delay-200",
                                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            )}
                        >
                            <a
                                href="#projects"
                                className="inline-flex flex-1 lg:flex-none items-center justify-center px-5 py-2.5 lg:px-8 lg:py-4 text-sm lg:text-lg rounded-lg bg-white text-black hover:bg-gray-200 transition-all duration-300 active:scale-95 font-medium"
                            >
                                View Projects
                            </a>
                            <a
                                href="#contact"
                                className="inline-flex flex-1 lg:flex-none items-center justify-center px-5 py-2.5 lg:px-8 lg:py-4 text-sm lg:text-lg rounded-lg border border-white text-white hover:bg-white hover:text-black transition-all duration-300 active:scale-95 font-medium"
                            >
                                Get in Touch
                            </a>
                        </div>
                    </div>
                </div>

                {/* Decorative glow */}
                <div className={cn(
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] opacity-5 blur-[100px] rounded-full pointer-events-none transition-colors duration-500",
                    mode === "developer" ? "bg-primary" : "bg-accent"
                )} />
            </div>

            {/* Scroll indicator – hidden on small mobile to avoid clutter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce hidden sm:flex">
                <div className="w-6 h-10 border-2 border-secondary rounded-full flex items-start justify-center p-2">
                    <div className="w-1 h-2 bg-secondary rounded-full" />
                </div>
            </div>
        </section>
    );
}
