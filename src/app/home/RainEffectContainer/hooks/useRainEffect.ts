import { RefObject, useEffect } from "react";
import * as THREE from "three";
import {
  renderFragmentShader,
  renderVertexShader,
  simulationFragmentShader,
  simulationVertexShader,
} from "../utils/shaderUtils";
import { navy } from "@/app/shared/constant/color";

const TITLE = "Kaya Lee";
const SUB_TITLE = "Frontend Developer";
const MAX_TITLE_SIZE = 200;

export const useRainEffect = (
  containerRef: RefObject<HTMLDivElement | null>
) => {
  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;
    if (typeof window === "undefined") return;

    const isMobileResolution = window.innerWidth <= 500;
    const isMobileSafari =
      /iP(hone|od|ad)/.test(navigator.platform) &&
      /Safari/.test(navigator.userAgent) &&
      !/Chrome/.test(navigator.userAgent);

    const scene = new THREE.Scene();
    const simScene = new THREE.Scene();

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const mouse = new THREE.Vector2();
    let frame = 0;

    const width = window.innerWidth * window.devicePixelRatio;
    const height = window.innerHeight * window.devicePixelRatio;
    const filter = isMobileSafari ? THREE.NearestFilter : THREE.LinearFilter;

    const options = {
      format: THREE.RGBAFormat,
      type: THREE.HalfFloatType,
      minFilter: filter,
      magFilter: filter,
      stencilBuffer: false,
      depthBuffer: false,
    };

    let rtA = new THREE.WebGLRenderTarget(width, height, options);
    let rtB = new THREE.WebGLRenderTarget(width, height, options);

    const simMaterial = new THREE.ShaderMaterial({
      uniforms: {
        textureA: { value: null },
        mouse: { value: mouse },
        resolution: { value: new THREE.Vector2(width, height) },
        time: { value: 0 },
        frame: { value: 1 },
      },
      vertexShader: simulationVertexShader,
      fragmentShader: simulationFragmentShader,
    });

    const renderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        textureA: { value: null },
        textureB: { value: null },
      },
      vertexShader: renderVertexShader,
      fragmentShader: renderFragmentShader,
    });

    const plane = new THREE.PlaneGeometry(2, 2);
    const simQuad = new THREE.Mesh(plane, simMaterial);
    const renderQuad = new THREE.Mesh(plane, renderMaterial);

    simScene.add(simQuad);
    scene.add(renderQuad);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d", { alpha: true });

    if (ctx) {
      ctx.fillStyle = navy["0"];
      ctx.fillRect(0, 0, width, height);
      const titleX = width / 2; // TITLE의 X 좌표
      const titleY = isMobileResolution ? height / 2 : height / 2; // TITLE의 Y 좌표

      // 텍스트 스타일 설정
      const titleFontSize = Math.min(
        Math.round(
          (width / (isMobileResolution ? 8 : 5)) * window.devicePixelRatio
        ),
        MAX_TITLE_SIZE
      );

      ctx.fillStyle = navy["5"];
      ctx.font = `bold ${titleFontSize}px hahmlet`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(TITLE, titleX, titleY);

      const subTitleFontSize = titleFontSize * 0.4;
      ctx.font = `400 ${subTitleFontSize}px hahmlet`;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";

      // sub title 그리기
      ctx.fillText(SUB_TITLE, titleX, titleY - titleFontSize);
    }

    const textTexture = new THREE.CanvasTexture(canvas);
    textTexture.minFilter = filter;
    textTexture.magFilter = filter;
    textTexture.format = THREE.RGBAFormat;

    // Animation loop
    const animate = () => {
      simMaterial.uniforms.frame.value = frame++;
      simMaterial.uniforms.time.value = performance.now() / 1000;

      simMaterial.uniforms.textureA.value = rtA.texture;
      renderer.setRenderTarget(rtB);
      renderer.render(simScene, camera);

      renderMaterial.uniforms.textureA.value = rtB.texture;
      renderMaterial.uniforms.textureB.value = textTexture;
      renderer.setRenderTarget(null);
      renderer.render(scene, camera);

      const temp = rtA;
      rtA = rtB;
      rtB = temp;

      requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX * window.devicePixelRatio;
      mouse.y = (window.innerHeight - event.clientY) * window.devicePixelRatio;
    };

    const handleTouch = (event: TouchEvent) => {
      event.preventDefault(); // 기본 동작 방지

      if (!event?.touches[0] || !event.touches[0]?.clientX) return;

      mouse.x = event.touches[0].clientX * window.devicePixelRatio;
      mouse.y =
        (window.innerHeight - event.touches[0].clientY) *
        window.devicePixelRatio;
    };

    const handleMouseOut = () => {
      mouse.set(0, 0);
    };

    const handleResize = () => {
      const width = container.clientWidth * window.devicePixelRatio;
      const height = container.clientHeight * window.devicePixelRatio;

      renderer.setSize(width, height);
      simMaterial.uniforms.resolution.value.set(width, height);

      rtA.setSize(width, height);
      rtB.setSize(width, height);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("touchstart", handleTouch, {
      passive: false,
    });
    container.addEventListener("touchmove", handleTouch, {
      passive: false,
    });
    container.addEventListener("mouseleave", handleMouseOut);
    container.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseOut);
      container.removeEventListener("touchstart", handleTouch);
      container.removeEventListener("resize", handleResize);
      container.removeChild(renderer.domElement);
    };
  }, []);
};
