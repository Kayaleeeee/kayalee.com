"use client";

import Head from "next/head";
import { useSmoothScroll } from "../shared/hooks/useSmoothScroll";
import { Hero } from "./Hero";
import { MainFeature } from "./MainFeature";
import { Problem } from "./Problem";
import { TechStack } from "./TechStack";

const ProjectPage = () => {
  useSmoothScroll();

  return (
    <>
      <Head>
        <title>Rental Assist</title>
        <meta name="description" content="카메라 장비 렌탈 관리를 더 쉽게" />
      </Head>
      <div>
        <Hero />
        <Problem />
        <MainFeature />
        <TechStack lang="KR" />
      </div>
    </>
  );
};

export default ProjectPage;
