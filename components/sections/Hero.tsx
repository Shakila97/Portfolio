import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { LogoSlider } from "@/components/ui/LogoSlider";

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
            className="relative min-h-screen flex items-center justify-center w-full p-[12px] lg:pl-[120px] lg:pt-[12px] lg:pr-[12px] lg:pb-[12px] overflow-hidden"
        >
            {/* Background gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-surface via-surface to-surface-elevated opacity-50" />

            <div
                ref={ref}
                className="relative z-10 mx-auto max-w-[1440px] w-full"
            >
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
                    {/* Left Column: Text Content */}
                    <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
                        <div className="space-y-2 lg:space-y-4 w-full">
                            <button
                                onClick={() => setMode("developer")}
                                className={cn(
                                    "block uppercase tracking-wider text-[11vw] sm:text-[40px] lg:text-[80px] leading-[1] transition-all duration-200 w-full lg:w-auto",
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
                                    "block uppercase tracking-wider text-[11vw] sm:text-[40px] lg:text-[100px] leading-[1] transition-all duration-200 w-full lg:w-auto",
                                    "pl-[15%] lg:pl-[120px]", // Use percentage for better mobile scaling
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
                                "text-base sm:text-lg lg:text-xl text-secondary max-w-xl mt-6 lg:mt-8 transition-all duration-1000 ease-out",
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
                                "flex flex-col sm:flex-row gap-4 mt-8 transition-all duration-1000 ease-out delay-200 w-full sm:w-auto",
                                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            )}
                        >
                            <a
                                href="#projects"
                                className="inline-flex items-center justify-center px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg rounded-lg bg-white text-black hover:bg-gray-200 transition-all duration-300 active:scale-95"
                            >
                                View Projects
                            </a>
                            <a
                                href="#contact"
                                className="inline-flex items-center justify-center px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg rounded-lg border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 active:scale-95"
                            >
                                Get in Touch
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Image */}
                    <div className="flex-1 w-full max-w-[400px] sm:max-w-[500px] lg:max-w-none order-1 lg:order-2 px-4 sm:px-0">
                        <div
                            className={cn(
                                "relative aspect-square rounded-xl overflow-hidden transition-all duration-1000 ease-out",
                                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                            )}
                        >
                            <Image
                                src={mode === "developer" ? "/images/code.png" : "/images/Group 1244830446.png"}
                                alt={mode === "developer" ? "Developer Mode" : "Designer Mode"}
                                fill
                                className="object-cover transition-opacity duration-500"
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
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] opacity-5 blur-[100px] rounded-full pointer-events-none transition-colors duration-500",
                    mode === "developer" ? "bg-primary" : "bg-accent"
                )} />
            </div>

            {/* Logo Slider */}
            <div className="absolute bottom-0 left-0 w-full z-20 mb-4 sm:mb-0">
                <LogoSlider />
            </div>

            {/* Scroll indicator - hidden on small screens if slider is present, or adjusted */}
            <div className="absolute bottom-24 lg:bottom-32 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
                <div className="w-5 h-8 lg:w-6 lg:h-10 border-2 border-secondary rounded-full flex items-start justify-center p-1.5 lg:p-2">
                    <div className="w-0.5 h-1.5 lg:w-1 lg:h-2 bg-secondary rounded-full" />
                </div>
            </div>
        </section>
    );
}
