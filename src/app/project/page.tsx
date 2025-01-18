"use client";

import { useSmoothScroll } from "../shared/hooks/useSmoothScroll";
import { Hero } from "./Hero";
import { MainFeature } from "./MainFeature";
import { Problem } from "./Problem";
import { TechStack } from "./TechStack";

export const generateMatadata = () => {
  return {
    title: "Rental Assist",
    description: "카메라 장비 렌탈 관리를 더 쉽게",
  };
};

const ProjectPage = () => {
  useSmoothScroll();

  return (
    <div>
      <Hero />
      <Problem />
      <MainFeature />
      <TechStack lang="KR" />
    </div>
  );
};

export default ProjectPage;
