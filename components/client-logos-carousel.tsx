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
    <section className="section-padding bg-gradient-to-b from-slate-50 to-white">
      <div className="container-custom">
        <FadeIn direction="up">
          <div className="text-center mb-12">
            <h2 className="text-accent font-semibold tracking-wide uppercase text-sm mb-3">
              TRUSTED PARTNERS
            </h2>
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-primary">
              Leading Companies We Work With
            </h3>
          </div>
        </FadeIn>

        {/* Single Row - Continuous Infinite */}
        <FadeIn direction="up" delay={0.1}>
          <div className="relative overflow-hidden rounded-xl bg-white p-8 shadow-md">
            <div className="marquee">
              <div className="marquee-track">
                {duplicatedLogos.map((logo, idx) => (
                  <button
                    type="button"
                    key={`${logo.id}-loop-${idx}`}
                    className="flex-shrink-0 h-20 w-40 flex items-center justify-center bg-gray-50 rounded-lg border border-slate-200 hover:border-primary hover:bg-slate-100 transition-all duration-300"
                    onClick={() => openLogoModal(logo)}
                  >
                    <Image
                      src={logo.image}
                      alt={logo.name}
                      width={160}
                      height={80}
                      className="object-contain h-full w-full p-4 hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="marquee mt-6">
              <div className="marquee-track marquee-track-reverse">
                {duplicatedLogos.map((logo, idx) => (
                  <button
                    type="button"
                    key={`${logo.id}-loop-reverse-${idx}`}
                    className="flex-shrink-0 h-20 w-40 flex items-center justify-center bg-gray-50 rounded-lg border border-slate-200 hover:border-primary hover:bg-slate-100 transition-all duration-300"
                    onClick={() => openLogoModal(logo)}
                  >
                    <Image
                      src={logo.image}
                      alt={logo.name}
                      width={160}
                      height={80}
                      className="object-contain h-full w-full p-4 hover:scale-110 transition-transform duration-300"
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
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
            onClick={closeLogoModal}
          >
            <div
              className="relative w-full max-w-3xl rounded-2xl bg-white p-6 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close enlarged logo"
                className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-2xl leading-none text-slate-700 hover:bg-slate-100"
                onClick={closeLogoModal}
              >
                ×
              </button>

              <div className="flex min-h-64 items-center justify-center pt-6">
                {isModalImageError ? (
                  <p className="text-center text-slate-600">Unable to load this logo.</p>
                ) : (
                  <Image
                    key={`modal-${selectedLogo.id}`}
                    src={selectedLogo.image}
                    alt={selectedLogo.name}
                    width={720}
                    height={360}
                    className="h-auto max-h-[60vh] w-auto max-w-full object-contain"
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
            height: 5rem;
          }

          .marquee-track {
            display: flex;
            gap: 2rem;
            width: max-content;
            animation-duration: 60s;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
            animation-name: marquee;
            will-change: transform;
          }

          .marquee-track-reverse {
            animation-direction: reverse;
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
        `}</style>
      </div>
    </section>
  );
});

export default ClientLogosCarousel;
