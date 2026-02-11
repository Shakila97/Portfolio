
"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageUploadProps {
    name: string;
    label?: string;
    defaultValue?: string;
    className?: string;
}

export function ImageUpload({ name, label, defaultValue = "", className = "" }: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState(defaultValue);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Upload failed");

            const data = await response.json();
            if (data.filepath) {
                setImageUrl(data.filepath);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Failed to upload image. Check console for details.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className={`space-y-2 ${className}`}>
            {label && <label className="block text-sm font-medium mb-1">{label}</label>}

            <div className="flex items-start gap-4">
                {/* Preview Box */}
                <div className="relative w-24 h-24 border border-border rounded-lg overflow-hidden bg-surface-elevated shrink-0">
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt="Preview"
                            fill
                            className="object-cover"
                            unoptimized
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-secondary text-center p-2">
                            No Image
                        </div>
                    )}
                </div>

                {/* Upload Controls */}
                <div className="flex-1 space-y-2">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleUpload}
                        disabled={isUploading}
                        className="block w-full text-sm text-secondary
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-accent file:text-white
                            hover:file:bg-accent/90
                            disabled:opacity-50 disabled:cursor-not-allowed"
                    />

                    {/* Hidden Input to carry the value in form submission */}
                    <input type="hidden" name={name} value={imageUrl} />

                    {/* Manual URL Input Fallback (Optional, but good for flexibility) */}
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="Or enter image URL manually..."
                        className="w-full px-3 py-1.5 text-xs bg-surface border border-border rounded focus:outline-none focus:border-accent text-secondary"
                    />

                    {isUploading && <p className="text-xs text-accent">Uploading...</p>}
                </div>
            </div>
        </div>
    );
}
