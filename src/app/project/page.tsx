"use client";

import { Hero } from "./Hero";
import { MainFeature } from "./MainFeature";
import { Problem } from "./Problem";
import { TechStack } from "./TechStack";

const ProjectPage = () => {
  return (
    <>
      <Hero />
      <Problem />
      <MainFeature />
      <TechStack lang="KR" />
    </>
  );
};

export default ProjectPage;
