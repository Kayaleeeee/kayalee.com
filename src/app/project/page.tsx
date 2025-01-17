"use client";

import { useSmoothScroll } from "../shared/hooks/useSmoothScroll";
import { Hero } from "./Hero";
import { MainFeature } from "./MainFeature";
import { Problem } from "./Problem";
import { TechStack } from "./TechStack";

const ProjectPage = () => {
  useSmoothScroll();

  return (
    <div>
      <Hero />
      <Problem />
      <MainFeature />
      <TechStack />
    </div>
  );
};

export default ProjectPage;
