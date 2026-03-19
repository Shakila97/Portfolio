"use client";

import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

/**
 * Contact Form Section
 * Mobile: compact full-width form with smaller padding
 * Desktop: centered max-width form (unchanged)
 */
export function Contact() {
    const { ref, isVisible } = useScrollAnimation(0.3);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitStatus("success");
            setFormData({ name: "", email: "", message: "" });
            setTimeout(() => setSubmitStatus("idle"), 3000);
        }, 1000);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <section
            id="contact"
            className="w-full px-4 py-10 lg:px-[120px] lg:py-24 bg-surface"
        >
            <div ref={ref} className="mx-auto max-w-[800px]">
                <h2
                    className={cn(
                        "text-2xl lg:text-5xl font-bold mb-6 lg:mb-12 text-center transition-all duration-700 ease-out",
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}
                >
                    Contact Me
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className={cn(
                        "space-y-4 lg:space-y-6 transition-all duration-700 ease-out delay-200",
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}
                >
                    {/* Name Input */}
                    <div>
                        <label htmlFor="name" className="block text-xs lg:text-sm font-medium text-secondary mb-1.5 lg:mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2.5 lg:px-4 lg:py-3 bg-surface-elevated border border-border rounded-lg focus:outline-none focus:border-accent transition-colors duration-300 text-primary text-sm lg:text-base"
                            placeholder="Your name"
                        />
                    </div>

                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-xs lg:text-sm font-medium text-secondary mb-1.5 lg:mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2.5 lg:px-4 lg:py-3 bg-surface-elevated border border-border rounded-lg focus:outline-none focus:border-accent transition-colors duration-300 text-primary text-sm lg:text-base"
                            placeholder="your.email@example.com"
                        />
                    </div>

                    {/* Message Textarea */}
                    <div>
                        <label htmlFor="message" className="block text-xs lg:text-sm font-medium text-secondary mb-1.5 lg:mb-2">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={5}
                            className="w-full px-3 py-2.5 lg:px-4 lg:py-3 bg-surface-elevated border border-border rounded-lg focus:outline-none focus:border-accent transition-colors duration-300 text-primary resize-none text-sm lg:text-base"
                            placeholder="Your message..."
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full px-6 py-3 lg:px-8 lg:py-4 bg-white text-black rounded-lg hover:bg-gray-200 transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm lg:text-base"
                    >
                        {isSubmitting ? "Sending..." : "Send Message"}
                    </button>

                    {/* Success Message */}
                    {submitStatus === "success" && (
                        <div className="p-3 lg:p-4 bg-accent/10 border border-accent rounded-lg text-center">
                            <p className="text-accent text-sm">Message sent successfully! I&apos;ll get back to you soon.</p>
                        </div>
                    )}
                </form>
            </div>
        </section>
    );
}
