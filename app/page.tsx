import { Navigation } from "@/components/Navigation";
import { Hero, AboutMe, Projects, Achievements, Testimonials, Contact, Footer } from "@/components/sections";

export default function Home() {
    return (
        <>
            <Navigation />
            <main className="w-full">
                <Hero />
                <AboutMe />
                <Projects />
                <Achievements />
                <Testimonials />
                <Contact />
                <Footer />
            </main>
        </>
    );
}
