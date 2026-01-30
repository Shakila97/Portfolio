"use client";

import { useRef, useState, useEffect } from "react";

/**
 * Custom hook for scroll-based animations using IntersectionObserver
 * Zero-library approach following the blueprint
 * @param threshold - Percentage of element visibility to trigger animation (0-1)
 * @returns ref to attach to element and isVisible state
 */
export function useScrollAnimation(threshold = 0.3) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(element); // Trigger once for performance
                }
            },
            { threshold }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [threshold]);

    return { ref, isVisible };
}
