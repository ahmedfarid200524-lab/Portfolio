import About from "@/_components/about/About";
import Contact from "@/_components/Contact/Contact";
import Footer from "@/_components/footer/Footer";
import Hero from "@/_components/hero/Hero";
import Links from "@/_components/links/Links";
import Projects from "@/_components/projects/Projects";

import ProjectsTitle from "@/_components/projects/ProjectsTitle";
import Skills from "@/_components/skills/Skills";
import HorizontalScroll from "@/components/HorizontalScroll";
import SwarmCursor from "@/components/SwarmCursor";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-white dark:bg-black">
      <section id="home">
  <HorizontalScroll>
    
    <Hero />
    <div id="about">
      <About />
    </div>
  </HorizontalScroll>
</section>

<section id="skills">
  <HorizontalScroll>
    <Skills />
    <ProjectsTitle />
  </HorizontalScroll>
</section>

<section id="projects">
  <Projects />
</section>

<section id="links">
  <Links />
</section>

<Contact /> 
<Footer/>

        
     
    </main>
  );
}