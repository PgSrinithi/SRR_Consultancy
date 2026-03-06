"use client";

import { observer } from "mobx-react-lite";
import { clientLogosStore } from "@/stores";
import { FadeIn } from "@/components/animations";
import Image from "next/image";
import { useEffect, useState } from "react";

const ClientLogosCarousel = observer(function ClientLogosCarousel() {
  const logos = clientLogosStore.clientLogos || [];
  const [selectedLogo, setSelectedLogo] = useState<(typeof logos)[number] | null>(null);
  const [isModalImageError, setIsModalImageError] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedLogo(null);
        setIsModalImageError(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  if (logos.length === 0) {
    return null;
  }

  // Build one base set long enough to avoid visible gaps on wide screens.
  const minimumLogosPerTrack = 10;
  const repeatCount = Math.ceil(minimumLogosPerTrack / logos.length);
  const baseTrackLogos = Array.from({ length: repeatCount }, () => logos).flat();
  const duplicatedLogos = [...baseTrackLogos, ...baseTrackLogos];
  const openLogoModal = (logo: (typeof logos)[number]) => {
    setIsModalImageError(false);
    setSelectedLogo(logo);
  };
  const closeLogoModal = () => {
    setSelectedLogo(null);
    setIsModalImageError(false);
  };

  return (
    <section id="clients" className="py-16 md:py-20 bg-background">
      <div className="container-custom">
        <FadeIn direction="up">
          <div className="text-center mb-10">
            <p className="text-sm text-muted-foreground font-medium">
              Trusted by leading companies worldwide
            </p>
          </div>
        </FadeIn>

        {/* Minimal marquee */}
        <FadeIn direction="up" delay={0.1}>
          <div className="relative overflow-hidden">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            
            <div className="marquee">
              <div className="marquee-track">
                {duplicatedLogos.map((logo, idx) => (
                  <button
                    type="button"
                    key={`${logo.id}-loop-${idx}`}
                    className="flex-shrink-0 h-12 w-28 sm:h-14 sm:w-36 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
                    onClick={() => openLogoModal(logo)}
                  >
                    <Image
                      src={logo.image}
                      alt={logo.name}
                      width={144}
                      height={56}
                      className="object-contain h-full w-full p-2"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {selectedLogo && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/80 backdrop-blur-sm p-4"
            onClick={closeLogoModal}
          >
            <div
              className="relative w-full max-w-2xl rounded-2xl bg-card p-8 shadow-2xl border border-border"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close enlarged logo"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground text-lg leading-none transition-colors"
                onClick={closeLogoModal}
              >
                ×
              </button>

              <div className="flex min-h-48 items-center justify-center pt-4">
                {isModalImageError ? (
                  <p className="text-center text-muted-foreground">Unable to load this logo.</p>
                ) : (
                  <Image
                    key={`modal-${selectedLogo.id}`}
                    src={selectedLogo.image}
                    alt={selectedLogo.name}
                    width={600}
                    height={300}
                    className="h-auto max-h-[50vh] w-auto max-w-full object-contain"
                    onError={() => setIsModalImageError(true)}
                  />
                )}
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          .marquee {
            position: relative;
            overflow: hidden;
            height: 3.5rem;
          }

          @media (min-width: 640px) {
            .marquee {
              height: 4rem;
            }
          }

          .marquee-track {
            display: flex;
            gap: 3rem;
            width: max-content;
            animation-duration: 45s;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
            animation-name: marquee;
            will-change: transform;
          }

          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .marquee:hover .marquee-track {
            animation-play-state: paused;
          }

          @media (prefers-reduced-motion: reduce) {
            .marquee-track {
              animation: none;
            }
          }
        `}</style>
      </div>
    </section>
  );
});

export default ClientLogosCarousel;
