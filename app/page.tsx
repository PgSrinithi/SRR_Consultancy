"use client";

import { ContactModal } from "@/components/contact-modal";
import { ClientModal } from "@/components/client-modal";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ClientLogosCarousel from "@/components/client-logos-carousel";
import {
  ArrowRight,
  CheckCircle2,
  Users,
  Building2,
  Globe2,
  Briefcase,
} from "lucide-react";
import { FadeIn, StaggerContainer } from "@/components/animations";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { industryStore, clientLogosStore } from "@/stores";
import {
  HERO_TITLE,
  HERO_DESCRIPTION,
  HERO_BADGE_TEXT,
  STATS,
  ABOUT_BADGE,
  ABOUT_TITLE,
  ABOUT_DESCRIPTION,
  ABOUT_FEATURES,
  ABOUT_CEO_QUOTE,
  SECTORS_BADGE,
  SECTORS_TITLE,
  SECTORS_DESCRIPTION,
  SECTOR_NAMES,
  SERVICES_BADGE,
  SERVICES_TITLE,
  SERVICES_DESCRIPTION,
  SERVICES,
  SERVICES_CTA_TITLE,
  SERVICES_CTA_DESCRIPTION,
  CONTACT_CTA_TITLE,
  CONTACT_CTA_DESCRIPTION,
  BUTTON_TEXT,
} from "@/lib/constants";
import Image from "next/image";

// Asset Imports
import heroImage from "@/../public/assets/stock_images/professional_busines_09c23622.jpg";
import aboutImage from "@/../public/assets/stock_images/about-us.jpg";
import logisticsImage from "@/../public/assets/stock_images/global_logistics_wor_3a6eb8f3.jpg";

const Home = observer(function Home() {
  const router = useRouter();
  const [showAllIndustries, setShowAllIndustries] = useState(false);

  // Fetch industries on mount
  useEffect(() => {
    if (industryStore.industries.length === 0 && !industryStore.loading) {
      industryStore.fetchIndustries();
    }
    clientLogosStore.fetchClientLogos();
  }, []);

  // Extract industry names from store
  const industryNames =
    industryStore.industries?.map((ind) => ind)?.filter(Boolean) || [];
  const displayedSectors = showAllIndustries
    ? industryNames
    : industryNames.slice(0, 4);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[750px] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-[scale_10s_linear_infinite]"
          style={{ backgroundImage: `url(${heroImage.src})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/70 to-transparent" />
        </div>

        <div className="relative container-custom h-full flex items-center">
          <div className="max-w-3xl text-white space-y-6">
            <FadeIn delay={0.2} direction="right">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-white text-sm font-semibold mb-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                {HERO_BADGE_TEXT}
              </div>
            </FadeIn>

            <FadeIn delay={0.4} direction="up">
              <h1 className="text-4xl md:text-7xl font-heading font-extrabold leading-tight text-white">
                {HERO_TITLE.split("<br/>")[0]} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">
                  {HERO_TITLE.split("<br/>")[1] || ""}
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.6} direction="up">
              <p className="text-lg md:text-xl text-slate-100 leading-relaxed max-w-xl border-l-4 border-accent pl-6">
                {HERO_DESCRIPTION}
              </p>
            </FadeIn>

            <FadeIn delay={0.8} direction="up">
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <ClientModal>
                  <Button
                    size="lg"
                    className="bg-accent hover:bg-accent/90 text-primary-foreground font-bold text-lg px-8 h-14 rounded-full shadow-lg hover:shadow-accent/25 transition-all cursor-pointer"
                  >
                    {BUTTON_TEXT.findTalent}
                  </Button>
                </ClientModal>
                <Button
                  onClick={() => router.push("/jobs")}
                  size="lg"
                  variant="outline"
                  className="bg-white/5 hover:bg-white/10 border-white/30 text-white text-lg px-8 h-14 rounded-full backdrop-blur-sm cursor-pointer"
                >
                  {BUTTON_TEXT.searchJobs}
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 -mt-20 relative z-10">
        <div className="container-custom">
          <FadeIn direction="up" delay={0.2}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-white/95 backdrop-blur-xl p-10 rounded-2xl shadow-2xl border border-slate-100">
              {STATS.map((stat, i) => (
                <div
                  key={i}
                  className="text-center space-y-2 border-r last:border-0 border-slate-100"
                >
                  <div className="text-4xl md:text-5xl font-heading font-bold text-primary">
                    {stat.number}
                  </div>
                  <div className="text-sm md:text-base text-slate-500 font-medium uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeIn direction="right">
              <div className="relative group">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent/20 rounded-tl-3xl -z-10 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-br-3xl -z-10 group-hover:scale-110 transition-transform duration-500" />
                <Image
                  src={aboutImage}
                  alt="Business Meeting"
                  width={800}
                  height={600}
                  className="rounded-xl shadow-2xl w-full object-cover aspect-[4/3] border-4 border-white"
                />
                {/* <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur p-6 rounded-lg shadow-xl max-w-xs hidden md:block border-l-4 border-primary hover:-translate-y-1 transition-transform">
                  <p className="text-primary font-bold text-xl mb-1">
                    &ldquo;{ABOUT_CEO_QUOTE}&rdquo;
                  </p>
                  <p className="text-sm text-slate-500">- CEO Message</p>
                </div> */}
              </div>
            </FadeIn>

            <div className="space-y-6">
              <FadeIn direction="left" delay={0.2}>
                <div className="space-y-2">
                  <h2 className="text-accent font-semibold tracking-wide uppercase text-sm flex items-center gap-2">
                    <span className="w-8 h-[2px] bg-accent"></span>
                    {ABOUT_BADGE}
                  </h2>
                  <h3 className="text-3xl md:text-4xl font-heading font-bold text-primary">
                    {ABOUT_TITLE}
                  </h3>
                </div>
              </FadeIn>

              <FadeIn direction="left" delay={0.3}>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {ABOUT_DESCRIPTION}
                </p>
              </FadeIn>

              <StaggerContainer
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4"
                delay={0.4}
              >
                {ABOUT_FEATURES.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border border-slate-100 animate-fadeIn"
                  >
                    <CheckCircle2 className="text-secondary h-5 w-5" />
                    <span className="font-medium text-slate-700">{item}</span>
                  </div>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section
        id="sectors"
        className="section-padding bg-white relative overflow-hidden"
      >
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 skew-x-12 opacity-50 pointer-events-none" />

        <div className="container-custom relative">
          <FadeIn direction="up">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-accent font-semibold tracking-wide uppercase text-sm">
                {SECTORS_BADGE}
              </h2>
              <h3 className="text-3xl md:text-4xl font-heading font-bold text-primary">
                {SECTORS_TITLE}
              </h3>
              <p className="text-slate-600 text-lg">{SECTORS_DESCRIPTION}</p>
            </div>
          </FadeIn>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedSectors.map((sector, idx) => (
              <div
                key={idx}
                className="group relative rounded-xl border border-slate-100 bg-white shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between animate-fadeInUp"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Top Accent */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent to-primary rounded-t-xl" />

                {/* Icon / Initial */}
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-bold mb-4 group-hover:scale-110 transition-transform">
                  {sector?.name?.charAt(0)}
                </div>

                {/* Content */}
                <div className="space-y-2 flex-1">
                  <h4 className="text-xl font-heading font-bold text-primary">
                    {sector?.name}
                  </h4>

                  <p className="text-sm text-slate-600 line-clamp-3">
                    {sector?.description ||
                      "Explore opportunities in this industry."}
                  </p>
                </div>

                {/* CTA */}
                <button
                  onClick={() =>
                    router.push(
                      `/jobs?industry=${encodeURIComponent(sector?.name)}`
                    )
                  }
                  className="inline-flex items-center gap-1 mt-6 text-sm font-semibold text-accent hover:text-primary transition-colors"
                >
                  {BUTTON_TEXT.viewPositions}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </StaggerContainer>

          <FadeIn direction="up" delay={0.4}>
            <div className="mt-12 text-center">
              {!showAllIndustries && industryNames?.length > 4 && (
                <Button
                  onClick={() => setShowAllIndustries(true)}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white rounded-full px-8 h-12 cursor-pointer"
                >
                  {BUTTON_TEXT.viewAllIndustries}
                </Button>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Client Logos Carousel */}
      <ClientLogosCarousel />

      {/* Services Section */}
      <section id="services" className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1 space-y-6">
              <FadeIn direction="right">
                <h2 className="text-accent font-semibold tracking-wide uppercase text-sm">
                  {SERVICES_BADGE}
                </h2>
                <h3 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
                  {SERVICES_TITLE}
                </h3>
                <p className="text-slate-600 text-lg">{SERVICES_DESCRIPTION}</p>
              </FadeIn>

              <StaggerContainer className="space-y-4 pt-4" delay={0.2}>
                {SERVICES.map((service, i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-5 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-primary/20 transition-all cursor-default animate-fadeIn"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="bg-primary/5 p-3 rounded-full h-fit">
                      {i === 0 && <Users className="h-6 w-6 text-primary" />}
                      {i === 1 && <Globe2 className="h-6 w-6 text-primary" />}
                      {i === 2 && (
                        <Briefcase className="h-6 w-6 text-primary" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-primary text-lg">
                        {service.title}
                      </h4>
                      <p className="text-sm text-slate-500 mt-1">
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))}
              </StaggerContainer>
            </div>

            <FadeIn
              direction="left"
              delay={0.3}
              className="md:col-span-2 h-full"
            >
              <div className="relative h-full min-h-[500px] rounded-2xl overflow-hidden shadow-2xl group">
                <Image
                  src={logisticsImage}
                  alt="Global Operations"
                  width={800}
                  height={600}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />

                <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                  <div className="max-w-md space-y-6">
                    <h3 className="text-3xl md:text-4xl font-heading font-bold text-white">
                      {SERVICES_CTA_TITLE}
                    </h3>
                    <p className="text-slate-200 text-lg">
                      {SERVICES_CTA_DESCRIPTION}
                    </p>
                    <div className="hover:scale-105 active:scale-95 transition-transform">
                      <ContactModal>
                        <Button
                          size="lg"
                          className="bg-accent hover:bg-accent/90 text-primary-foreground font-bold rounded-full px-8 mt-4 h-14 text-lg shadow-lg shadow-accent/20"
                        >
                          {BUTTON_TEXT.requestConsultation}
                        </Button>
                      </ContactModal>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section
        id="contact"
        className="py-24 bg-primary text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />

        <div className="container-custom text-center space-y-8 relative z-10">
          <FadeIn direction="up">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white">
              {CONTACT_CTA_TITLE}
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mt-4">
              {CONTACT_CTA_DESCRIPTION}
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-8">
              <ContactModal>
                <Button
                  variant="secondary"
                  size="lg"
                  className="h-16 px-10 text-lg rounded-full font-bold text-primary bg-white hover:bg-slate-100 shadow-xl cursor-pointer"
                >
                  {BUTTON_TEXT.contactSupport}
                </Button>
              </ContactModal>
            </div>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
});

export default Home;
