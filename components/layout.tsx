"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, Mail, Facebook, Twitter, Linkedin, Instagram, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ClientModal } from "@/components/client-modal";
import Image from "next/image";
import logoImage from "@/../public/assets/Logo.jpeg";
import {
  NAV_LINKS,
  COMPANY_PHONE,
  COMPANY_EMAIL,
  COMPANY_ADDRESS,
  FOOTER_QUICK_LINKS,
  BUTTON_TEXT,
  COMPANY_NAME,
  COMPANY_ESTABLISHED_YEAR,
} from "@/lib/constants";
import { industryStore } from "@/stores";

import { observer } from "mobx-react-lite";

const Layout = observer(function Layout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();

  useEffect(() => {
    // Handle anchor scrolling when page loads or hash changes
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Handle "Home" active state when at the top
      if (window.scrollY < 100) {
        setActiveSection("home");
      }
    };
    
    // Intersection Observer for sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px -20% 0px" } 
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col font-sans bg-background">
      {/* Modern Navigation */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-500 ${
          isScrolled
            ? "bg-background/90 backdrop-blur-2xl border-b border-border/50 shadow-sm py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Image
                src={logoImage}
                alt="SRR Consultancy Logo"
                width={56}
                height={56}
                className="h-12 w-auto object-contain rounded-xl transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-heading font-bold text-lg text-foreground leading-none tracking-tight">SRR</span>
              <span className="text-[10px] text-muted-foreground tracking-[0.15em] uppercase font-medium">Consultancy</span>
            </div>
          </Link>

          {/* Desktop Nav - Modern pill style */}
          <nav className="hidden lg:flex items-center">
            <div className="flex items-center gap-1 bg-muted/50 backdrop-blur-sm rounded-full px-2 py-1.5 border border-border/50">
              {NAV_LINKS.map((link: any) => {
                const isActive = link.href.startsWith('#') 
                  ? (pathname === '/' && activeSection === link.id)
                  : (pathname === link.href);
                
                const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                  if (link.href.startsWith('#')) {
                    e.preventDefault();
                    window.location.href = '/' + link.href;
                  }
                };
                
                return (
                  <a 
                    key={link.name} 
                    href={link.href}
                    onClick={handleHashClick}
                    aria-current={isActive ? "page" : undefined}
                    className={`text-sm font-medium transition-all duration-200 px-4 py-2 rounded-full ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm" 
                        : "text-muted-foreground hover:text-foreground hover:bg-background"
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/jobs">
              <Button variant="ghost" className="text-foreground hover:text-primary hover:bg-primary/5 font-medium rounded-full px-5 transition-all cursor-pointer">
                {BUTTON_TEXT.iAmCandidate}
              </Button>
            </Link>
            <ClientModal>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-full px-6 shadow-sm hover:shadow-md transition-all cursor-pointer">
                {BUTTON_TEXT.iAmClient}
              </Button>
            </ClientModal>
          </div>

          {/* Mobile Nav */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu" className="rounded-full">
                <Menu className="h-5 w-5 text-foreground" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] border-l border-border/50">
              <SheetHeader className="sr-only">
                <SheetTitle>Mobile navigation menu</SheetTitle>
              </SheetHeader>
              <div className="mb-10 flex justify-center pt-4">
                <Image src={logoImage} alt="SRR Logo" width={64} height={64} className="h-16 w-auto rounded-xl" />
              </div>
              <nav className="flex flex-col gap-2">
                {NAV_LINKS.map((link: any) => {
                  const isActive = link.href.startsWith('#') 
                    ? (pathname === '/' && activeSection === link.id)
                    : (pathname === link.href);
                  
                  const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                    if (link.href.startsWith('#')) {
                      e.preventDefault();
                      window.location.href = '/' + link.href;
                    }
                  };
                  
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={handleHashClick}
                      className={`text-base font-medium transition-all duration-200 block py-3 px-4 rounded-xl ${
                        isActive
                          ? "text-primary bg-primary/5 font-semibold"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                    >
                      {link.name}
                    </a>
                  );
                })}
                <div className="flex flex-col gap-3 mt-8 pt-6 border-t border-border/50">
                  <Link href="/jobs">
                    <Button variant="outline" className="w-full rounded-full border-border hover:border-primary hover:text-primary cursor-pointer">
                      {BUTTON_TEXT.iAmCandidate}
                    </Button>
                  </Link>
                  <ClientModal>
                    <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-full cursor-pointer">
                      {BUTTON_TEXT.iAmClient}
                    </Button>
                  </ClientModal>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      {/* Modern Footer */}
      <footer className="bg-foreground text-background relative overflow-hidden">
        {/* Subtle gradient accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
        
        <div className="container-custom pt-20 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
            {/* Brand - spans more columns */}
            <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center gap-3">
                <Image src={logoImage} alt="SRR Logo" width={48} height={48} className="h-11 w-auto rounded-lg bg-white p-1" />
                <div className="flex flex-col">
                  <span className="font-heading font-bold text-lg text-white leading-none">SRR Consultancy</span>
                  <span className="text-xs text-white/50 tracking-wide">Global Talent Solutions</span>
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed max-w-sm">
                Established in {COMPANY_ESTABLISHED_YEAR}, {COMPANY_NAME} is a premier global manpower solution provider, bridging the gap between talent and opportunity.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/5 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-all duration-200">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-full bg-white/5 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-all duration-200">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-white/5 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-all duration-200">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/5 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-all duration-200">
                  <Instagram className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {FOOTER_QUICK_LINKS.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-white/60 hover:text-accent text-sm transition-colors duration-200">{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Industries */}
            <div className="lg:col-span-3">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
                Industries
              </h3>
              <ul className="space-y-3">
                {industryStore?.industries?.slice(0, 6).map((industry) => (
                  <li key={industry?.id}>
                    <a href={`/jobs?industry=${encodeURIComponent(industry?.name)}`} className="text-white/60 hover:text-accent text-sm transition-colors duration-200">{industry?.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:col-span-3">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
                Contact
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="h-4 w-4 text-accent" />
                  </div>
                  <span className="text-white/60 text-sm leading-relaxed">{COMPANY_ADDRESS}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <Phone className="h-4 w-4 text-accent" />
                  </div>
                  <a href={`tel:${COMPANY_PHONE}`} className="text-white/60 hover:text-accent text-sm transition-colors">{COMPANY_PHONE}</a>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <Mail className="h-4 w-4 text-accent" />
                  </div>
                  <a href={`mailto:${COMPANY_EMAIL}`} className="text-white/60 hover:text-accent text-sm transition-colors">{COMPANY_EMAIL}</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">&copy; {new Date().getFullYear()} SRR Consultancy. All rights reserved.</p>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-white/40 hover:text-white/70 transition-colors">Privacy Policy</a>
              <a href="#" className="text-white/40 hover:text-white/70 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
});

export default Layout;
