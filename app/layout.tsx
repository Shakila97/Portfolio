import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio | Shakila Sandun",
  description: "A modern portfolio showcasing web development and design projects built with Next.js 16, React 19, and Tailwind CSS v4",
  keywords: ["portfolio", "web developer", "designer", "Next.js", "React", "Tailwind CSS"],
  authors: [{ name: "Shakila Sandun" }],
  openGraph: {
    title: "Portfolio | Developer & Designer",
    description: "A modern portfolio showcasing web development and design projects",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
