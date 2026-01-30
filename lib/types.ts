/**
 * Shared TypeScript interfaces and types
 */

export interface Project {
    id: string;
    title: string;
    description: string;
    category: string;
    image: string;
    link?: string;
}

export interface Achievement {
    id: string;
    title: string;
    issuer: string;
    date: string;
    image: string;
}

export interface Testimonial {
    id: string;
    name: string;
    role: string;
    company: string;
    content: string;
    rating: number;
}

export interface ContactFormData {
    name: string;
    email: string;
    message: string;
}
