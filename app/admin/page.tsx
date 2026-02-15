"use client";

import { useState } from "react";
import { ProjectsManager, AchievementsManager, TestimonialsManager } from "@/components/admin";

type Tab = "projects" | "achievements" | "testimonials";

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState<Tab>("projects");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple password protection - in production, use proper authentication
        if (password === "admin123") {
            setIsAuthenticated(true);
        } else {
            alert("Incorrect password");
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-surface flex items-center justify-center px-4">
                <div className="max-w-md w-full">
                    <div className="bg-surface-elevated border border-border rounded-2xl p-8">
                        <h1 className="text-3xl font-bold mb-6 text-center">Admin Login</h1>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:border-accent"
                                    placeholder="Enter admin password"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
                            >
                                Login
                            </button>
                            <p className="text-xs text-secondary text-center mt-4">
                                Default password: admin123
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-surface">
            {/* Header */}
            <header className="bg-surface-elevated border-b border-border sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Portfolio CMS</h1>
                    <button
                        onClick={() => setIsAuthenticated(false)}
                        className="px-4 py-2 text-sm bg-surface border border-border rounded-lg hover:bg-accent hover:border-accent transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </header>

            {/* Navigation Tabs */}
            <div className="bg-surface-elevated border-b border-border">
                <div className="max-w-7xl mx-auto px-4">
                    <nav className="flex gap-4">
                        <button
                            onClick={() => setActiveTab("projects")}
                            className={`px-6 py-4 font-medium border-b-2 transition-colors ${activeTab === "projects"
                                    ? "border-accent text-accent"
                                    : "border-transparent text-secondary hover:text-primary"
                                }`}
                        >
                            Projects
                        </button>
                        <button
                            onClick={() => setActiveTab("achievements")}
                            className={`px-6 py-4 font-medium border-b-2 transition-colors ${activeTab === "achievements"
                                    ? "border-accent text-accent"
                                    : "border-transparent text-secondary hover:text-primary"
                                }`}
                        >
                            Achievements
                        </button>
                        <button
                            onClick={() => setActiveTab("testimonials")}
                            className={`px-6 py-4 font-medium border-b-2 transition-colors ${activeTab === "testimonials"
                                    ? "border-accent text-accent"
                                    : "border-transparent text-secondary hover:text-primary"
                                }`}
                        >
                            Testimonials
                        </button>
                    </nav>
                </div>
            </div>

            {/* Content */}
            <main className="max-w-7xl mx-auto px-4 py-8">
                {activeTab === "projects" && <ProjectsManager />}
                {activeTab === "achievements" && <AchievementsManager />}
                {activeTab === "testimonials" && <TestimonialsManager />}
            </main>
        </div>
    );
}
