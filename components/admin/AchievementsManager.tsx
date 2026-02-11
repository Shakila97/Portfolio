"use client";

import { useState, useEffect } from "react";
import { ImageUpload } from "./ImageUpload";

interface Achievement {
    id: string;
    title: string;
    issuer: string;
    date: string;
    description: string;
    category: string;
    icon: string;
    certificateUrl: string;
    credentialUrl: string;
}

export function AchievementsManager() {
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    // Fetch achievements
    const fetchAchievements = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/achievements");
            const data = await response.json();
            setAchievements(data);
        } catch (error) {
            console.error("Failed to fetch achievements:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAchievements();
    }, []);

    // Create or update achievement
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const achievementData = {
            title: formData.get("title") as string,
            issuer: formData.get("issuer") as string,
            date: formData.get("date") as string,
            description: formData.get("description") as string,
            category: formData.get("category") as string,
            icon: formData.get("icon") as string,
            certificateUrl: formData.get("certificateUrl") as string,
            credentialUrl: formData.get("credentialUrl") as string,
        };

        try {
            if (editingAchievement) {
                // Update
                await fetch("/api/achievements", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        id: editingAchievement.id,
                        achievement: achievementData,
                    }),
                });
            } else {
                // Create
                await fetch("/api/achievements", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(achievementData),
                });
            }

            fetchAchievements();
            setIsFormOpen(false);
            setEditingAchievement(null);
        } catch (error) {
            console.error("Failed to save achievement:", error);
        }
    };

    // Delete achievement
    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this achievement?")) return;

        try {
            await fetch(`/api/achievements?id=${id}`, {
                method: "DELETE",
            });
            fetchAchievements();
        } catch (error) {
            console.error("Failed to delete achievement:", error);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Achievements & Certifications</h2>
                <button
                    onClick={() => {
                        setEditingAchievement(null);
                        setIsFormOpen(true);
                    }}
                    className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
                >
                    + Add Achievement
                </button>
            </div>

            {/* Achievements List */}
            {isLoading ? (
                <div className="text-center py-12">Loading...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {achievements.map((achievement) => (
                        <div
                            key={achievement.id}
                            className="bg-surface-elevated border border-border rounded-lg p-4 hover:border-accent transition-colors"
                        >
                            <div className="flex items-start gap-3 mb-3">
                                <div className="text-2xl">{achievement.icon}</div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg">{achievement.title}</h3>
                                    <p className="text-sm text-secondary">{achievement.issuer}</p>
                                    <p className="text-xs text-secondary">{achievement.date}</p>
                                </div>
                            </div>
                            <p className="text-sm text-secondary mb-3 line-clamp-2">
                                {achievement.description}
                            </p>
                            <div className="mb-3">
                                <span className="px-2 py-1 bg-surface text-xs rounded border border-border">
                                    {achievement.category}
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => {
                                        setEditingAchievement(achievement);
                                        setIsFormOpen(true);
                                    }}
                                    className="flex-1 px-3 py-1.5 text-sm bg-surface border border-border rounded hover:bg-accent hover:border-accent hover:text-white transition-colors"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(achievement.id)}
                                    className="flex-1 px-3 py-1.5 text-sm bg-surface border border-red-500/50 text-red-500 rounded hover:bg-red-500 hover:text-white transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Form Modal */}
            {isFormOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-surface-elevated border border-border rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-6">
                            {editingAchievement ? "Edit Achievement" : "Add New Achievement"}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    defaultValue={editingAchievement?.title}
                                    required
                                    className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:border-accent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Issuer</label>
                                <input
                                    type="text"
                                    name="issuer"
                                    defaultValue={editingAchievement?.issuer}
                                    required
                                    className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:border-accent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Date</label>
                                <input
                                    type="text"
                                    name="date"
                                    defaultValue={editingAchievement?.date}
                                    required
                                    placeholder="Jan 4, 2026"
                                    className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:border-accent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Description</label>
                                <textarea
                                    name="description"
                                    defaultValue={editingAchievement?.description}
                                    required
                                    rows={3}
                                    className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:border-accent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Category</label>
                                <input
                                    type="text"
                                    name="category"
                                    defaultValue={editingAchievement?.category}
                                    required
                                    placeholder="UI/UX, Development, Design, etc."
                                    className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:border-accent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Icon (Emoji)</label>
                                <input
                                    type="text"
                                    name="icon"
                                    defaultValue={editingAchievement?.icon}
                                    required
                                    placeholder="🎯"
                                    className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:border-accent"
                                />
                            </div>
                            <div>
                                <ImageUpload
                                    name="certificateUrl"
                                    label="Certificate Image or Badge"
                                    defaultValue={editingAchievement?.certificateUrl}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Credential URL</label>
                                <input
                                    type="text"
                                    name="credentialUrl"
                                    defaultValue={editingAchievement?.credentialUrl}
                                    className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:border-accent"
                                />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
                                >
                                    {editingAchievement ? "Update" : "Create"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsFormOpen(false);
                                        setEditingAchievement(null);
                                    }}
                                    className="flex-1 px-6 py-3 bg-surface border border-border rounded-lg hover:bg-surface-elevated transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
