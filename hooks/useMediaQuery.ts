"use client";

import { useSyncExternalStore } from "react";

/**
 * Custom hook to detect media query matches
 * Uses useSyncExternalStore to properly sync with external window.matchMedia API
 * @param query - Media query string (e.g., "(min-width: 768px)")
 * @returns boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
    const subscribe = (callback: () => void) => {
        const matchMedia = window.matchMedia(query);
        matchMedia.addEventListener("change", callback);
        return () => {
            matchMedia.removeEventListener("change", callback);
        };
    };

    const getSnapshot = () => {
        return window.matchMedia(query).matches;
    };

    const getServerSnapshot = () => {
        return false;
    };

    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
