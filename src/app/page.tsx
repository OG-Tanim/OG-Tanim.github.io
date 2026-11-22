import { Hero } from "@/components/Hero";
import { ProjectDeck } from "@/components/ProjectDeck";
import { Rail } from "@/components/Rail";
import { Connect, Contests, Education, Experience, Lab, Skills, Strengths } from "@/components/Sections";

export default function Home() {
  return (
    <>
      <Rail />
      <main>
        <Hero />
        <div className="mx-auto w-full max-w-[1120px] px-5 md:px-10 lg:pl-60 xl:pl-64 2xl:max-w-[1240px]">
          <Experience />
          <ProjectDeck />
          <Skills />
          <Lab />
          <Contests />
          <Education />
          <Strengths />
          <Connect />
        </div>
      </main>
    </>
  );
}
