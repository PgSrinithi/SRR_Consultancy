"use client";

import { ContactModal } from "@/components/contact-modal";
import { ClientModal } from "@/components/client-modal";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import ClientLogosCarousel from "@/components/client-logos-carousel";
import {
  ArrowRight,
  CheckCircle2,
  Users,
  Building2,
  Globe2,
  Briefcase,
  Star,
  MapPin,
  TrendingUp
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
  SECTORS_BADGE,
  SECTORS_TITLE,
  SECTORS_DESCRIPTION,
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
import { Globe } from "@/components/globe";
import { AnimatedStat } from "@/components/ui/animated-stat";

// Asset Imports
import heroImage from "@/../public/assets/stock_images/professional_busines_09c23622.jpg";
import aboutImage from "@/../public/assets/stock_images/about-us.jpg";
import logisticsImage from "@/../public/assets/stock_images/global_logistics_wor_3a6eb8f3.jpg";

const Home = observer(function Home() {
  const router = useRouter();
  const [showAllIndustries, setShowAllIndustries] = useState(false);
  const heroTitleLines = HERO_TITLE.split("<br/>");

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
      {/* Modern Hero Section */}
      <section className="relative min-h-[90vh] w-full overflow-hidden bg-hero-gradient flex items-center">
        {/* Gradient orbs for depth */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-primary/30 rounded-full blur-[150px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[200px]" />
        </div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_40%,transparent_100%)]" />

        <div className="container-custom relative z-10 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Hero Content */}
            <div className="space-y-8 max-w-2xl">
              <FadeIn delay={0.1} direction="up">
                <div className="inline-flex items-center gap-2.5 bg-white/[0.08] backdrop-blur-md border border-white/[0.08] px-4 py-2 rounded-full text-white/90 text-sm font-medium">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                  </span>
                  {HERO_BADGE_TEXT}
                </div>
              </FadeIn>

              <FadeIn delay={0.2} direction="up">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.05] text-white tracking-tight">
                  {heroTitleLines[0]}
                  <br />
                  <span className="text-gradient">
                    {heroTitleLines[1] || "Global Talents"}
                  </span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.3} direction="up">
                <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-lg">
                  {HERO_DESCRIPTION}
                </p>
              </FadeIn>

              <FadeIn delay={0.4} direction="up">
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <ClientModal>
                    <Button
                      size="lg"
                      className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-base px-8 h-13 rounded-full shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-all duration-300 cursor-pointer"
                    >
                      {BUTTON_TEXT.findTalent}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </ClientModal>
                  <Button
                    onClick={() => router.push("/jobs")}
                    size="lg"
                    variant="outline"
                    className="bg-white/[0.05] hover:bg-white/[0.1] border-white/[0.15] text-white hover:text-white text-base px-8 h-13 rounded-full backdrop-blur-sm transition-all duration-300 cursor-pointer"
                  >
                    {BUTTON_TEXT.searchJobs}
                  </Button>
                </div>
              </FadeIn>

              {/* Trust indicators */}
              <FadeIn delay={0.5} direction="up">
                <div className="flex items-center gap-6 pt-6 border-t border-white/10 mt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-white/20 to-white/5 border-2 border-white/10 flex items-center justify-center text-[10px] font-semibold text-white/60">
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-white/50">
                    Trusted by <span className="text-white/70 font-medium">500+</span> companies worldwide
                  </p>
                </div>
              </FadeIn>
            </div>

            {/* Hero Globe */}
            <div className="relative hidden lg:flex items-center justify-center h-[550px]">
              <FadeIn delay={0.4} className="h-full w-full flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-accent/10 via-transparent to-transparent blur-[80px] rounded-full" />
                <Globe className="relative z-10" />
              </FadeIn>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
      </section>

      {/* Stats Section - Modern floating cards */}
      <section className="relative z-20 -mt-16 lg:-mt-24 px-4">
        <div className="container-custom">
          <FadeIn direction="up" delay={0.1}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {STATS.map((stat, i) => (
                <div
                  key={i}
                  className="stat-card p-6 md:p-8 text-center group hover:shadow-card-hover transition-all duration-500"
                >
                  <div className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary tabular-nums mb-2">
                    <AnimatedStat
                      value={parseInt(stat.number.replace(/\D/g, ''))}
                      suffix={stat.number.replace(/\d/g, '')}
                    />
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground font-medium tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* About Section - Modern asymmetric layout */}
      <section id="about" className="section-padding overflow-hidden">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <FadeIn direction="right">
              <div className="relative">
                {/* Main image */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src={aboutImage}
                    alt="Business Meeting"
                    width={800}
                    height={600}
                    className="w-full object-cover aspect-[4/3]"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                </div>
                
                {/* Experience Badge - Modern floating card */}
                <div className="absolute -bottom-6 -right-6 md:right-8 glass-card p-5 rounded-2xl shadow-card-hover hidden md:flex items-center gap-4 border border-border/50">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Star className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-bold text-2xl text-foreground">18+</p>
                    <p className="text-sm text-muted-foreground">Years of Excellence</p>
                  </div>
                </div>

                {/* Decorative element */}
                <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-accent/20 rounded-2xl -z-10" />
              </div>
            </FadeIn>

            <div className="space-y-8">
              <FadeIn direction="left" delay={0.1}>
                <div className="space-y-4">
                  <span className="section-label">{ABOUT_BADGE}</span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground leading-tight">
                    {ABOUT_TITLE}
                  </h2>
                </div>
              </FadeIn>

              <FadeIn direction="left" delay={0.2}>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {ABOUT_DESCRIPTION}
                </p>
              </FadeIn>

              <FadeIn direction="left" delay={0.3}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {ABOUT_FEATURES.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors duration-200 group cursor-default"
                    >
                      <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                        <CheckCircle2 className="h-4 w-4 text-accent" />
                      </div>
                      <span className="font-medium text-foreground text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>

              <FadeIn direction="left" delay={0.4}>
                <Button variant="outline" className="mt-2 rounded-full px-7 h-12 border-border hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 group cursor-pointer">
                  {BUTTON_TEXT.readMore}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors Section - Modern grid */}
      <section
        id="sectors"
        className="section-padding bg-muted/30 relative overflow-hidden"
      >
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(0_0_0/0.03)_1px,transparent_0)] [background-size:24px_24px]" />

        <div className="container-custom relative">
          <FadeIn direction="up">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <span className="section-label justify-center">{SECTORS_BADGE}</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                {SECTORS_TITLE}
              </h2>
              <p className="text-muted-foreground text-lg">{SECTORS_DESCRIPTION}</p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {displayedSectors.map((sector, idx) => (
              <button
                type="button"
                key={idx}
                onClick={() =>
                  router.push(
                    `/jobs?industry=${encodeURIComponent(sector?.name)}`
                  )
                }
                className="group text-left modern-card p-6 flex flex-col cursor-pointer hover:-translate-y-1"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center text-lg font-bold mb-5 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                  {sector?.name?.charAt(0)}
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {sector?.name}
                </h3>

                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-4 flex-1">
                  {sector?.description ||
                    "Explore career opportunities in this thriving industry."}
                </p>

                {/* CTA */}
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground group-hover:text-accent transition-colors">
                  View positions
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>
            ))}
          </StaggerContainer>

          <FadeIn direction="up" delay={0.3}>
            <div className="mt-12 text-center">
              {!showAllIndustries && industryNames?.length > 4 && (
                <Button
                  onClick={() => setShowAllIndustries(true)}
                  variant="outline"
                  className="border-border text-muted-foreground hover:border-primary hover:text-primary rounded-full px-8 h-11 transition-all duration-300 cursor-pointer"
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

      {/* Services Section - Modern cards */}
      <section id="services" className="section-padding bg-background relative overflow-hidden">
        <div className="container-custom relative z-10">
          <FadeIn direction="up">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <span className="section-label justify-center">{SERVICES_BADGE}</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                {SERVICES_TITLE}
              </h2>
              <p className="text-muted-foreground text-lg">{SERVICES_DESCRIPTION}</p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6 mb-20">
            <StaggerContainer className="contents" delay={0.1}>
              {SERVICES.map((service, i) => (
                <div
                  key={i}
                  className="group modern-card p-7 hover:-translate-y-1 cursor-pointer"
                >
                  <div className="mb-5 w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                    {i === 0 && <Users className="h-5 w-5" />}
                    {i === 1 && <Globe2 className="h-5 w-5" />}
                    {i === 2 && <TrendingUp className="h-5 w-5" />}
                  </div>

                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed mb-5 text-sm">
                    {service.description}
                  </p>

                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground group-hover:text-accent transition-colors">
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              ))}
            </StaggerContainer>
          </div>

          {/* CTA Banner - Modern gradient */}
          <FadeIn direction="up" delay={0.2}>
            <div className="relative rounded-3xl overflow-hidden isolate">
              <Image
                src={logisticsImage}
                alt="Global Operations"
                width={1200}
                height={500}
                className="absolute inset-0 w-full h-full object-cover -z-20"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/70 -z-10" />

              <div className="relative z-10 py-16 md:py-20 px-8 md:px-16 max-w-2xl">
                <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-5 leading-tight">
                  {SERVICES_CTA_TITLE}
                </h3>
                <p className="text-white/80 text-lg mb-8 leading-relaxed">
                  {SERVICES_CTA_DESCRIPTION}
                </p>
                <div className="flex flex-wrap gap-4">
                  <ContactModal>
                    <Button
                      size="lg"
                      className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-full px-8 h-12 shadow-lg hover:shadow-accent/30 transition-all cursor-pointer"
                    >
                      {BUTTON_TEXT.requestConsultation}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </ContactModal>
                  <Button
                    variant="outline"
                    onClick={() => router.push("/about")}
                    className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-primary font-semibold rounded-full px-8 h-12 transition-all cursor-pointer"
                  >
                    About Us
                  </Button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact CTA - Modern minimal */}
      <section
        id="contact"
        className="py-24 md:py-32 bg-muted/30 relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container-custom text-center space-y-8 relative z-10">
          <FadeIn direction="up">
            <span className="section-label justify-center mb-4">Get Started</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground tracking-tight max-w-3xl mx-auto">
              {CONTACT_CTA_TITLE}
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mt-5">
              {CONTACT_CTA_DESCRIPTION}
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
              <ContactModal>
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground h-13 px-8 rounded-full font-semibold shadow-lg shadow-accent/20 hover:shadow-accent/30 transition-all cursor-pointer"
                >
                  {BUTTON_TEXT.contactSupport}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </ContactModal>
              <Button
                variant="outline"
                size="lg"
                onClick={() => router.push("/jobs")}
                className="h-13 px-8 rounded-full font-medium border-border hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer"
              >
                Browse Jobs
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
});

export default Home;
