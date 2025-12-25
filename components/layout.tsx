"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mail, Facebook, Twitter, Linkedin, Instagram, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ContactModal } from "@/components/contact-modal";
import { ClientModal } from "@/components/client-modal";
import Image from "next/image";
import logoImage from "@/../public/assets/WhatsApp_Image_2025-12-07_at_11.30.59_AM_1765087278704.jpeg";
import {
  NAV_LINKS,
  COMPANY_PHONE,
  COMPANY_EMAIL,
  COMPANY_ADDRESS,
  FOOTER_QUICK_LINKS,
  FOOTER_INDUSTRIES,
  BUTTON_TEXT,
  COMPANY_NAME,
  COMPANY_ESTABLISHED_YEAR,
} from "@/lib/constants";

export default function Layout({ children }: { children: React.ReactNode }) {
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
    <div className="flex min-h-screen flex-col font-sans animated-bg">
      {/* Top Bar - Corporate Style */}
      <div className="bg-primary text-primary-foreground py-2 text-sm hidden md:block">
        <div className="container-custom flex justify-between items-center">
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-accent" />
              <span>{COMPANY_PHONE}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-accent" />
              <span>{COMPANY_EMAIL}</span>
            </div>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-accent transition-colors"><Facebook className="h-4 w-4" /></a>
            <a href="#" className="hover:text-accent transition-colors"><Twitter className="h-4 w-4" /></a>
            <a href="#" className="hover:text-accent transition-colors"><Linkedin className="h-4 w-4" /></a>
            <a href="#" className="hover:text-accent transition-colors"><Instagram className="h-4 w-4" /></a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header 
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-md py-2" : "bg-white py-4 shadow-sm"
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <Image
              src={logoImage}
              alt="SRR Consultancy Logo"
              width={80}
              height={64}
              className="h-16 w-auto object-contain"
            />
            {/* Hidden on very small screens if logo has text, but kept for accessibility/SEO or if logo is icon only */}
            <div className="hidden sm:flex flex-col">
              <span className="font-heading font-bold text-xl text-primary leading-none tracking-tight">SRR</span>
              <span className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase font-semibold">Consultancy</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link: any) => {
              // Active for hash links: only on home page with matching section
              // Active for /jobs: when pathname is /jobs
              const isActive = link.href.startsWith('#') 
                ? (pathname === '/' && activeSection === link.id)
                : (pathname === link.href);
              
              // For hash links, navigate to home first then scroll to section
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
                  className={`text-sm font-semibold transition-colors uppercase tracking-wide border-b-2 pb-0.5 ${
                    isActive
                      ? "text-primary border-accent" 
                      : "text-foreground/80 hover:text-primary border-transparent hover:border-accent"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
            <div className="flex items-center gap-3">
              <Link href="/jobs">
                <Button className="bg-primary hover:bg-primary/90 text-white shadow-md rounded-full px-6 border border-primary hover:border-accent transition-all cursor-pointer">
                  {BUTTON_TEXT.iAmCandidate}
                </Button>
              </Link>
              <ClientModal>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 shadow-md rounded-full px-6 transition-all cursor-pointer">
                  {BUTTON_TEXT.iAmClient}
                </Button>
              </ClientModal>
            </div>
          </nav>

          {/* Mobile Nav */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-primary" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="mb-8 flex justify-center">
                 <Image src={logoImage} alt="SRR Logo" width={80} height={80} className="h-20 w-auto" />
              </div>
              <nav className="flex flex-col gap-4">
                {NAV_LINKS.map((link: any) => {
                  // Active for hash links: only on home page with matching section
                  // Active for /jobs: when pathname is /jobs
                  const isActive = link.href.startsWith('#') 
                    ? (pathname === '/' && activeSection === link.id)
                    : (pathname === link.href);
                  
                  // For hash links, navigate to home first then scroll to section
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
                      className={`text-lg font-medium transition-colors block py-3 border-b ${
                        isActive
                          ? "text-primary border-accent font-bold"
                          : "text-foreground hover:text-primary border-border/50"
                      }`}
                    >
                      {link.name}
                    </a>
                  );
                })}
                <div className="flex flex-col gap-3 mt-6">
                  <Link href="/jobs">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white cursor-pointer">
                      {BUTTON_TEXT.iAmCandidate}
                    </Button>
                  </Link>
                  <ClientModal>
                    <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10 cursor-pointer">
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

      {/* Footer */}
      <footer className="bg-primary text-white pt-16 pb-8">
        <div className="container-custom grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-lg backdrop-blur-sm w-fit">
              <Image src={logoImage} alt="SRR Logo" width={48} height={48} className="h-12 w-auto bg-white rounded p-1" />
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl text-white leading-none">SRR</span>
                <span className="text-xs text-slate-300 tracking-widest uppercase">Consultancy</span>
              </div>
            </div>
            <p className="text-slate-200 text-sm leading-relaxed border-l-2 border-accent pl-4">
              Established in {COMPANY_ESTABLISHED_YEAR}, {COMPANY_NAME} is a premier global manpower solution provider, bridging the gap between talent and opportunity.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-heading font-bold text-lg mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-1 after:bg-accent">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              {FOOTER_QUICK_LINKS.map((link) => (
                <li key={link.name}><a href={link.href} className="hover:text-accent transition-colors flex items-center gap-2">{link.name}</a></li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h3 className="text-white font-heading font-bold text-lg mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-1 after:bg-accent">
              Industries
            </h3>
            <ul className="space-y-3 text-sm">
              {FOOTER_INDUSTRIES.map((industry) => (
                <li key={industry}><a href={`/jobs?industry=${encodeURIComponent(industry)}`} className="hover:text-accent transition-colors">{industry}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-heading font-bold text-lg mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-1 after:bg-accent">
              Contact Info
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-slate-200">{COMPANY_ADDRESS}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent shrink-0" />
                <span className="text-slate-200">{COMPANY_PHONE}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent shrink-0" />
                <span className="text-slate-200">{COMPANY_EMAIL}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="container-custom pt-8 border-t border-white/10 text-center text-sm text-slate-300">
          <p>&copy; {new Date().getFullYear()} SRR Consultancy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}