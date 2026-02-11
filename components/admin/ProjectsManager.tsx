"use client";

import { useState, useEffect } from "react";
import { ImageUpload } from "./ImageUpload";

interface Project {
    id: string;
    title: string;
    category: string;
    layout: string;
    description: string;
    technologies: string[];
    image: string;
    images?: string[];
    liveUrl: string;
    githubUrl: string;
}

export function ProjectsManager() {
    const [mode, setMode] = useState<"developer" | "designer">("developer");
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    // Fetch projects
    const fetchProjects = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/projects?mode=${mode}`);
            const data = await response.json();
            setProjects(data);
        } catch (error) {
            console.error("Failed to fetch projects:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, [mode]);

    // Create or update project
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const projectData = {
            title: formData.get("title") as string,
            category: formData.get("category") as string,
            layout: formData.get("layout") as string,
            description: formData.get("description") as string,
            technologies: (formData.get("technologies") as string).split(",").map(t => t.trim()),
            image: formData.get("image") as string,
            images: [0, 1, 2, 3]
                .map(i => formData.get(`gallery_image_${i}`) as string)
                .filter(Boolean),
            liveUrl: formData.get("liveUrl") as string,
            githubUrl: formData.get("githubUrl") as string,
        };

        try {
            if (editingProject) {
                // Update
                await fetch("/api/projects", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        mode,
                        id: editingProject.id,
                        project: projectData,
                    }),
                });
            } else {
                // Create
                await fetch("/api/projects", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        mode,
                        project: projectData,
                    }),
                });
            }

            fetchProjects();
            setIsFormOpen(false);
            setEditingProject(null);
        } catch (error) {
            console.error("Failed to save project:", error);
        }
    };

    // Delete project
    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return;

        try {
            await fetch(`/api/projects?mode=${mode}&id=${id}`, {
                method: "DELETE",
            });
            fetchProjects();
        } catch (error) {
            console.error("Failed to delete project:", error);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex gap-4">
                    <button
                        onClick={() => setMode("developer")}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${mode === "developer"
                            ? "bg-accent text-white"
                            : "bg-surface border border-border hover:bg-surface-elevated"
                            }`}
                    >
                        Developer Projects
                    </button>
                    <button
                        onClick={() => setMode("designer")}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${mode === "designer"
                            ? "bg-accent text-white"
                            : "bg-surface border border-border hover:bg-surface-elevated"
                            }`}
                    >
                        Designer Projects
                    </button>
                </div>
                <button
                    onClick={() => {
                        setEditingProject(null);
                        setIsFormOpen(true);
                    }}
                    className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
                >
                    + Add Project
                </button>
            </div>

            {/* Projects List */}
            {isLoading ? (
                <div className="text-center py-12">Loading...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="bg-surface-elevated border border-border rounded-lg p-4 hover:border-accent transition-colors"
                        >
                            <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                            <p className="text-sm text-secondary mb-2">{project.category}</p>
                            <p className="text-sm text-secondary mb-3 line-clamp-2">
                                {project.description}
                            </p>
                            <div className="flex gap-2 mb-3 flex-wrap">
                                {project.technologies.map((tech, i) => (
                                    <span
                                        key={i}
                                        className="px-2 py-1 bg-surface text-xs rounded border border-border"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => {
                                        setEditingProject(project);
                                        setIsFormOpen(true);
                                    }}
                                    className="flex-1 px-3 py-1.5 text-sm bg-surface border border-border rounded hover:bg-accent hover:border-accent hover:text-white transition-colors"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(project.id)}
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
                            {editingProject ? "Edit Project" : "Add New Project"}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    defaultValue={editingProject?.title}
                                    required
                                    className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:border-accent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Category</label>
                                <input
                                    type="text"
                                    name="category"
                                    defaultValue={editingProject?.category}
                                    required
                                    className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:border-accent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Layout</label>
                                <select
                                    name="layout"
                                    defaultValue={editingProject?.layout || "medium"}
                                    className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:border-accent"
                                >
                                    <option value="tall">Tall</option>
                                    <option value="medium">Medium</option>
                                    <option value="short">Short</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Description</label>
                                <textarea
                                    name="description"
                                    defaultValue={editingProject?.description}
                                    required
                                    rows={3}
                                    className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:border-accent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Technologies (comma-separated)
                                </label>
                                <input
                                    type="text"
                                    name="technologies"
                                    defaultValue={editingProject?.technologies.join(", ")}
                                    required
                                    className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:border-accent"
                                    placeholder="React, Node.js, MongoDB"
                                />
                            </div>
                            <div className="space-y-4">
                                <ImageUpload
                                    name="image"
                                    label="Main Project Image"
                                    defaultValue={editingProject?.image}
                                />

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium">Gallery Images (Optional, max 4 more)</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        {[0, 1, 2, 3].map((index) => (
                                            <ImageUpload
                                                key={index}
                                                name={`gallery_image_${index}`}
                                                label={`Slide ${index + 1}`}
                                                defaultValue={editingProject?.images?.[index]}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Live URL</label>
                                <input
                                    type="text"
                                    name="liveUrl"
                                    defaultValue={editingProject?.liveUrl}
                                    className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:border-accent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">GitHub URL</label>
                                <input
                                    type="text"
                                    name="githubUrl"
                                    defaultValue={editingProject?.githubUrl}
                                    className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:border-accent"
                                />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
                                >
                                    {editingProject ? "Update" : "Create"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsFormOpen(false);
                                        setEditingProject(null);
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
