import { RefObject, useEffect } from "react";
import * as THREE from "three";
import {
  renderFragmentShader,
  renderVertexShader,
  simulationFragmentShader,
  simulationVertexShader,
} from "../utils/shaderUtils";
import { navy } from "@/app/shared/constant/color";

export const useRainEffect = (
  containerRef: RefObject<HTMLDivElement | null>
) => {
  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    if (typeof window === "undefined") return;

    const isMobile = window.innerWidth <= 500;
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

    const options = {
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
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

      // 텍스트 스타일 설정
      const fontSize = isMobile
        ? 350
        : Math.round((width / 7) * window.devicePixelRatio);
      ctx.fillStyle = navy["5"];
      ctx.font = `bold ${fontSize}px hahmlet`;
      ctx.textAlign = "center"; // 가로 중심
      ctx.textBaseline = "middle"; // 세로 중심
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // 텍스트 그리기
      if (isMobile) {
        ctx.save();
        ctx.translate(width / 2, height / 2); // 캔버스 중심으로 이동

        ctx.rotate((90 * Math.PI) / 180);
        ctx.fillText("Kaya Lee", 0, 0);
        ctx.restore();
      } else {
        ctx.fillText("Kaya Lee", width / 2, height / 2);
      }
    }

    const textTexture = new THREE.CanvasTexture(canvas);
    textTexture.minFilter = THREE.LinearFilter;
    textTexture.magFilter = THREE.LinearFilter;
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

    const handleMouseMove = (event: any) => {
      mouse.x = event.clientX * window.devicePixelRatio;
      mouse.y = (window.innerHeight - event.clientY) * window.devicePixelRatio;
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
    container.addEventListener("mouseleave", handleMouseOut);
    container.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseOut);
      container.removeEventListener("resize", handleResize);
      container.removeChild(renderer.domElement);
    };
  }, []);
};
