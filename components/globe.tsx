"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";

export function Globe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;
    let width = 0;

    const onResize = () =>
      canvasRef.current && (width = canvasRef.current.offsetWidth);
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1, // Dark mode
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3], // Darker base
      markerColor: [234 / 255, 88 / 255, 12 / 255], // Orange accent
      glowColor: [0.1, 0.1, 0.1],
      markers: [
        { location: [25.2048, 55.2708], size: 0.1 }, // Dubai
        { location: [24.7136, 46.6753], size: 0.1 }, // Riyadh
        { location: [19.076, 72.8777], size: 0.1 }, // Mumbai
        { location: [28.6139, 77.209], size: 0.1 }, // Delhi
        { location: [1.3521, 103.8198], size: 0.1 }, // Singapore
        { location: [51.5074, -0.1278], size: 0.1 }, // London
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.005;
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    setTimeout(() => {
        if (canvasRef.current) {
            canvasRef.current.style.opacity = "1";
        }
    });

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      className={`relative w-full max-w-[600px] aspect-square mx-auto ${className}`}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          contain: "layout paint size",
          opacity: 0,
          transition: "opacity 1s ease",
        }}
      />
    </div>
  );
}
