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
      <section className="relative min-h-[85vh] w-full overflow-hidden bg-primary flex items-center">
        {/* Background Overlay + gradient mesh */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary opacity-95 z-10" />
          <div className="absolute inset-0 bg-gradient-mesh opacity-40 z-[1]" aria-hidden />
          <Image
            src={heroImage}
            alt="Background"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>

        <div className="container-custom relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-8 max-w-2xl">
              <FadeIn delay={0.2} direction="right">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-white text-sm font-semibold shadow-lg hover:bg-white/20 transition-colors cursor-default">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                  </span>
                  {HERO_BADGE_TEXT}
                </div>
              </FadeIn>

              <FadeIn delay={0.4} direction="up">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold leading-tight text-white tracking-tight">
                  {HERO_TITLE.split("<br/>")[0]} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-300">
                    {HERO_TITLE.split("<br/>")[1] || "Global Talents"}
                  </span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.6} direction="up">
                <p className="text-lg md:text-xl text-primary-foreground/85 leading-relaxed max-w-xl border-l-4 border-accent pl-6 bg-gradient-to-r from-white/5 to-transparent py-2 rounded-r-lg">
                  {HERO_DESCRIPTION}
                </p>
              </FadeIn>

              <FadeIn delay={0.8} direction="up">
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <ClientModal>
                    <Button
                      size="lg"
                      className="bg-accent hover:bg-accent/90 text-primary-foreground font-bold text-lg px-8 h-14 rounded-full shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-all hover:-translate-y-1"
                    >
                      {BUTTON_TEXT.findTalent}
                    </Button>
                  </ClientModal>
                  <Button
                    onClick={() => router.push("/jobs")}
                    size="lg"
                    variant="outline"
                    className="bg-white/5 hover:bg-white/10 border-white/20 text-white hover:text-white text-lg px-8 h-14 rounded-full backdrop-blur-sm transition-all hover:-translate-y-1"
                  >
                    {BUTTON_TEXT.searchJobs}
                  </Button>
                </div>
              </FadeIn>
            </div>

            {/* Hero Globe */}
            <div className="relative hidden lg:block h-[600px] w-full">
              <FadeIn delay={0.6} className="h-full w-full flex items-center justify-center">
                <div className="absolute inset-0 bg-accent/20 blur-[100px] rounded-full transform scale-75 animate-pulse" />
                <Globe className="relative z-10 drop-shadow-2xl" />
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-20 -mt-10 lg:-mt-20 px-4">
        <div className="container-custom">
          <FadeIn direction="up" delay={0.2}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-card p-8 md:p-12 rounded-3xl shadow-card-hover border border-border">
              {STATS.map((stat, i) => (
                <div
                  key={i}
                  className="text-center space-y-2 border-r last:border-0 border-border relative group"
                >
                  <div className="text-4xl md:text-5xl font-heading font-bold text-primary tabular-nums group-hover:scale-110 transition-transform duration-300 ease-out">
                    <AnimatedStat
                      value={parseInt(stat.number.replace(/\D/g, ''))}
                      suffix={stat.number.replace(/\d/g, '')}
                    />
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground font-bold uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding overflow-hidden">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
            <FadeIn direction="right">
              <div className="relative group perspective-1000">
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-accent/10 rounded-full -z-10 group-hover:scale-125 transition-transform duration-500" />
                <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-primary/5 rounded-full -z-10 group-hover:scale-125 transition-transform duration-500" />
                <Image
                  src={aboutImage}
                  alt="Business Meeting"
                  width={800}
                  height={600}
                  className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/3] border-8 border-white group-hover:rotate-1 transition-transform duration-500"
                />
                {/* Experience Badge */}
                <div className="absolute -bottom-10 -left-6 bg-card p-6 rounded-xl shadow-card-hover border-l-4 border-accent hidden md:block animate-bounce-slow">
                  <div className="flex items-center gap-4">
                    <div className="bg-accent/10 p-3 rounded-full">
                      <Star className="h-8 w-8 text-accent fill-accent" />
                    </div>
                    <div>
                      <p className="font-bold text-2xl text-primary">18+ Years</p>
                      <p className="text-sm text-muted-foreground">Of Excellence</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <div className="space-y-8">
              <FadeIn direction="left" delay={0.2}>
                <div className="space-y-3">
                  <h2 className="text-accent font-bold tracking-widest uppercase text-sm flex items-center gap-3">
                    <span className="w-10 h-[2px] bg-accent"></span>
                    {ABOUT_BADGE}
                  </h2>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary leading-tight">
                    {ABOUT_TITLE}
                  </h3>
                </div>
              </FadeIn>

              <FadeIn direction="left" delay={0.3}>
                <p className="text-muted-foreground leading-relaxed text-lg">
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
                    className="flex items-center gap-3 bg-muted/50 p-4 rounded-xl hover:bg-card hover:shadow-card-hover transition-all border border-transparent hover:border-border group"
                  >
                    <div className="bg-white p-2 rounded-full shadow-sm group-hover:bg-accent group-hover:text-white transition-colors">
                      <CheckCircle2 className="h-5 w-5 text-accent group-hover:text-white" />
                    </div>
                    <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{item}</span>
                  </div>
                ))}
              </StaggerContainer>

              <FadeIn direction="left" delay={0.5}>
                <Button variant="outline" className="mt-4 rounded-full px-8 border-border hover:border-accent hover:text-accent transition-all group">
                  {BUTTON_TEXT.readMore} <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section
        id="sectors"
        className="section-padding bg-muted/30 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-1/2 h-full bg-background skew-x-12 opacity-50 pointer-events-none" />

        <div className="container-custom relative">
          <FadeIn direction="up">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-accent font-bold tracking-widest uppercase text-sm">
                {SECTORS_BADGE}
              </h2>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary">
                {SECTORS_TITLE}
              </h3>
              <p className="text-muted-foreground text-lg">{SECTORS_DESCRIPTION}</p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedSectors.map((sector, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl bg-card p-8 shadow-card hover:shadow-card-hover transition-all duration-500 flex flex-col justify-between overflow-hidden border border-border hover:border-accent/20"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                {/* Icon Background Blob */}
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-muted/50 rounded-full group-hover:bg-accent/5 transition-colors duration-500" />

                {/* Content */}
                <div className="relative z-10 space-y-4 flex-1">
                  <div className="w-14 h-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center text-2xl font-bold mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                    {sector?.name?.charAt(0)}
                  </div>

                  <h4 className="text-xl font-heading font-bold text-primary group-hover:text-accent transition-colors">
                    {sector?.name}
                  </h4>

                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {sector?.description ||
                      "Explore career opportunities in this thriving industry with our specialized recruitment."}
                  </p>
                </div>

                {/* CTA */}
                <button
                  onClick={() =>
                    router.push(
                      `/jobs?industry=${encodeURIComponent(sector?.name)}`
                    )
                  }
                  className="inline-flex items-center gap-2 mt-8 text-sm font-bold text-muted-foreground group-hover:text-accent transition-colors"
                >
                  {BUTTON_TEXT.viewPositions}
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </StaggerContainer>

          <FadeIn direction="up" delay={0.4}>
            <div className="mt-16 text-center">
              {!showAllIndustries && industryNames?.length > 4 && (
                <Button
                  onClick={() => setShowAllIndustries(true)}
                  variant="outline"
                  className="border-border text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 rounded-full px-10 h-12 transition-all"
                >
                  {BUTTON_TEXT.viewAllIndustries}
                </Button>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Gradient divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent my-0" aria-hidden />

      {/* Client Logos Carousel */}
      <ClientLogosCarousel />

      {/* Services Section */}
      <section id="services" className="section-padding bg-muted/30 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(hsl(var(--primary))_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <FadeIn direction="up">
              <h2 className="text-accent font-bold tracking-widest uppercase text-sm">
                {SERVICES_BADGE}
              </h2>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary">
                {SERVICES_TITLE}
              </h3>
              <p className="text-muted-foreground text-lg">{SERVICES_DESCRIPTION}</p>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <StaggerContainer className="contents" delay={0.2}>
              {SERVICES.map((service, i) => (
                <div
                  key={i}
                  className="group relative bg-card p-8 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 border border-border overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                  <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-muted/80 text-primary group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                    {i === 0 && <Users className="h-7 w-7" />}
                    {i === 1 && <Globe2 className="h-7 w-7" />}
                    {i === 2 && <TrendingUp className="h-7 w-7" />}
                  </div>

                  <h4 className="text-2xl font-heading font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                    {service.title}
                  </h4>

                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="flex items-center text-sm font-bold text-muted-foreground group-hover:text-accent transition-colors gap-2">
                    <span className="uppercase tracking-wider">Learn More</span>
                    <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </StaggerContainer>
          </div>

          {/* CTA Banner */}
          <FadeIn direction="up" delay={0.4}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group isolate min-h-[400px]">
              <Image
                src={logisticsImage}
                alt="Global Operations"
                width={1200}
                height={600}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 -z-20"
              />
              <div className="absolute inset-0 bg-primary/70 -z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent -z-10" />

              <div className="relative z-10 h-full flex flex-col justify-center p-8 md:p-16 max-w-2xl">
                <h3 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
                  {SERVICES_CTA_TITLE}
                </h3>
                <p className="text-primary-foreground/90 text-lg md:text-xl mb-8 font-light leading-relaxed">
                  {SERVICES_CTA_DESCRIPTION}
                </p>
                <div className="flex flex-wrap gap-4">
                  <ContactModal>
                    <Button
                      size="lg"
                      className="bg-accent hover:bg-accent/90 text-primary-foreground font-bold rounded-full px-8 h-14 text-lg shadow-lg hover:shadow-accent/50 transition-all hover:-translate-y-1"
                    >
                      {BUTTON_TEXT.requestConsultation}
                    </Button>
                  </ContactModal>
                  <Button
                    variant="outline"
                    onClick={() => router.push("/about")}
                    className="bg-transparent border-white text-white hover:bg-white hover:text-primary font-bold rounded-full px-8 h-14 text-lg transition-all"
                  >
                    About Us
                  </Button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact CTA */}
      <section
        id="contact"
        className="py-24 bg-primary text-white relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/40 via-transparent to-transparent animate-spin-slow" />
        </div>

        <div className="container-custom text-center space-y-8 relative z-10">
          <FadeIn direction="up">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight">
              {CONTACT_CTA_TITLE}
            </h2>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mt-6 font-light">
              {CONTACT_CTA_DESCRIPTION}
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-10">
              <ContactModal>
                <Button
                  variant="secondary"
                  size="lg"
                  className="h-16 px-12 text-lg rounded-full font-bold text-primary bg-card hover:bg-muted shadow-card-hover transition-all hover:-translate-y-0.5"
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
