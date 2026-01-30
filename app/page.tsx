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
 * Server component that assembles all sections
 */
export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <AboutMe />
        <Projects />
        <Achievements />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
