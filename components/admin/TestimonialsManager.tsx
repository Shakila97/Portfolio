"use client";

import { useState, useEffect } from "react";

interface Testimonial {
    id: string;
    name: string;
    role: string;
    company: string;
    content: string;
    rating: number;
    avatar: string;
    featured: boolean;
}

export function TestimonialsManager() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    // Fetch testimonials
    const fetchTestimonials = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/testimonials");
            const data = await response.json();
            setTestimonials(data);
        } catch (error) {
            console.error("Failed to fetch testimonials:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    // Create or update testimonial
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const testimonialData = {
            name: formData.get("name") as string,
            role: formData.get("role") as string,
            company: formData.get("company") as string,
            content: formData.get("content") as string,
            rating: parseInt(formData.get("rating") as string),
            avatar: formData.get("avatar") as string,
            featured: formData.get("featured") === "on",
        };

        try {
            if (editingTestimonial) {
                // Update
                await fetch("/api/testimonials", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        id: editingTestimonial.id,
                        testimonial: testimonialData,
                    }),
                });
            } else {
                // Create
                await fetch("/api/testimonials", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(testimonialData),
                });
            }

            fetchTestimonials();
            setIsFormOpen(false);
            setEditingTestimonial(null);
        } catch (error) {
            console.error("Failed to save testimonial:", error);
        }
    };

    // Delete testimonial
    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this testimonial?")) return;

        try {
            await fetch(`/api/testimonials?id=${id}`, {
                method: "DELETE",
            });
            fetchTestimonials();
        } catch (error) {
            console.error("Failed to delete testimonial:", error);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Testimonials</h2>
                <button
                    onClick={() => {
                        setEditingTestimonial(null);
                        setIsFormOpen(true);
                    }}
                    className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
                >
                    + Add Testimonial
                </button>
            </div>

            {/* Testimonials List */}
            {isLoading ? (
                <div className="text-center py-12">Loading...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="bg-surface-elevated border border-border rounded-lg p-6 hover:border-accent transition-colors"
                        >
                            {/* Rating */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className="w-4 h-4 text-accent"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            {/* Content */}
                            <p className="text-secondary mb-4 line-clamp-3">"{testimonial.content}"</p>

                            {/* Author */}
                            <div className="mb-4">
                                <p className="font-semibold">{testimonial.name}</p>
                                <p className="text-sm text-secondary">
                                    {testimonial.role} at {testimonial.company}
                                </p>
                            </div>

                            {/* Featured badge */}
                            {testimonial.featured && (
                                <div className="mb-4">
                                    <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded">
                                        Featured
                                    </span>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => {
                                        setEditingTestimonial(testimonial);
                                        setIsFormOpen(true);
                                    }}
                                    className="flex-1 px-3 py-1.5 text-sm bg-surface border border-border rounded hover:bg-accent hover:border-accent hover:text-white transition-colors"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(testimonial.id)}
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
                            {editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    defaultValue={editingTestimonial?.name}
                                    required
                                    className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:border-accent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Role</label>
                                <input
                                    type="text"
                                    name="role"
                                    defaultValue={editingTestimonial?.role}
                                    required
                                    className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:border-accent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Company</label>
                                <input
                                    type="text"
                                    name="company"
                                    defaultValue={editingTestimonial?.company}
                                    required
                                    className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:border-accent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Testimonial Content</label>
                                <textarea
                                    name="content"
                                    defaultValue={editingTestimonial?.content}
                                    required
                                    rows={4}
                                    className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:border-accent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Rating</label>
                                <select
                                    name="rating"
                                    defaultValue={editingTestimonial?.rating || 5}
                                    className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:border-accent"
                                >
                                    <option value="5">5 Stars</option>
                                    <option value="4">4 Stars</option>
                                    <option value="3">3 Stars</option>
                                    <option value="2">2 Stars</option>
                                    <option value="1">1 Star</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Avatar URL</label>
                                <input
                                    type="text"
                                    name="avatar"
                                    defaultValue={editingTestimonial?.avatar}
                                    className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:border-accent"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="featured"
                                    id="featured"
                                    defaultChecked={editingTestimonial?.featured}
                                    className="w-4 h-4"
                                />
                                <label htmlFor="featured" className="text-sm font-medium">
                                    Featured Testimonial
                                </label>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
                                >
                                    {editingTestimonial ? "Update" : "Create"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsFormOpen(false);
                                        setEditingTestimonial(null);
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
