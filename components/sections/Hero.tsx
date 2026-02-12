import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

interface HeroProps {
    mode: "developer" | "designer";
    setMode: (mode: "developer" | "designer") => void;
}

/**
 * Hero Section - Developer/Designer showcase
 * Client component for scroll animations and mode toggling
 */
export function Hero({ mode, setMode }: HeroProps) {
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
                className="relative z-10 mx-auto max-w-[1200px] w-full"
            >
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
                    {/* Left Column: Text Content */}
                    <div className="flex-1 flex flex-col items-start lg:items-start text-center lg:text-left order-2 lg:order-1">
                        <div className="space-y-4">
                            <button
                                onClick={() => setMode("developer")}
                                className={cn(
                                    "block uppercase tracking-wider text-[40px] lg:text-[80px] leading-[1] transition-all duration-200",
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
                                    "block uppercase tracking-wider text-[40px] lg:text-[100px] leading-[1] transition-all duration-200",
                                    mode === "designer"
                                        ? "text-accent font-bold scale-105 origin-center lg:origin-left"
                                        : "text-secondary hover:text-accent"
                                )}
                            >
                                Visual Designer
                            </button>
                        </div>

                        <p
                            className={cn(
                                "text-lg lg:text-xl text-secondary max-w-xl mt-8 transition-all duration-1000 ease-out",
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
                                "flex flex-col sm:flex-row gap-4 mt-8 transition-all duration-1000 ease-out delay-200",
                                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
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

                    {/* Right Column: Image */}
                    <div className="flex-1 w-full max-w-[500px] lg:max-w-none order-1 lg:order-2">
                        <div
                            className={cn(
                                "relative aspect-square rounded-2xl overflow-hidden transition-all duration-1000 ease-out",
                                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                            )}
                        >
                            <Image
                                src="/images/Group 1244830446.png"
                                alt="Portfolio Hero Image"
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className={cn(
                                "absolute inset-0 bg-gradient-to-tr from-surface/20 to-transparent mix-blend-overlay pointer-events-none"
                            )} />
                        </div>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className={cn(
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-5 blur-[100px] rounded-full pointer-events-none transition-colors duration-500",
                    mode === "developer" ? "bg-primary" : "bg-accent"
                )} />
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
