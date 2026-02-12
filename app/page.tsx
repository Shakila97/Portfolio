"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import {
  Hero,
  AboutMe,
  Projects,
  Achievements,
  Testimonials,
  Contact,
  Footer,
} from "@/components/sections";

/**
 * Home Page - Portfolio
 * Client component that manages the application state (Developer vs Designer mode)
 */
export default function Home() {
  const [mode, setMode] = useState<"developer" | "designer">("developer");

  return (
    <>
      <Navigation />
      <main>
        <Hero mode={mode} setMode={setMode} />
        <AboutMe />
        <Projects mode={mode} />
        <Achievements />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
