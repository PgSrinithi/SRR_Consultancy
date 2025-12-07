import { Link, useLocation } from "wouter";
import { Menu, X, Phone, Mail, Facebook, Twitter, Linkedin, Instagram, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logoImage from "@assets/WhatsApp_Image_2025-12-07_at_11.30.59_AM_1765087278704.jpeg";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [location] = useLocation();

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

  const navLinks = [
    { name: "Home", href: "/", id: "home" },
    { name: "About Us", href: "#about", id: "about" },
    { name: "Sectors", href: "#sectors", id: "sectors" },
    { name: "Services", href: "#services", id: "services" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <div className="flex min-h-screen flex-col font-sans animated-bg">
      {/* Top Bar - Corporate Style */}
      <div className="bg-primary text-primary-foreground py-2 text-sm hidden md:block">
        <div className="container-custom flex justify-between items-center">
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-accent" />
              <span>+91 123 456 7890</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-accent" />
              <span>info@srrconsultancy.com</span>
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
            <img 
              src={logoImage} 
              alt="SRR Consultancy Logo" 
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
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className={`text-sm font-semibold transition-colors uppercase tracking-wide border-b-2 pb-0.5 ${
                  activeSection === link.id 
                    ? "text-primary border-accent" 
                    : "text-foreground/80 hover:text-primary border-transparent hover:border-accent"
                }`}
              >
                {link.name}
              </a>
            ))}
            <Button className="bg-primary hover:bg-primary/90 text-white shadow-md rounded-full px-6 border border-primary hover:border-accent transition-all">
              Get in Touch
            </Button>
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
                 <img src={logoImage} alt="SRR Logo" className="h-20" />
              </div>
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`text-lg font-medium transition-colors block py-3 border-b ${
                      activeSection === link.id
                        ? "text-primary border-accent font-bold"
                        : "text-foreground hover:text-primary border-border/50"
                    }`}
                  >
                    {link.name}
                  </a>
                ))}
                <Button className="w-full mt-6 bg-primary hover:bg-primary/90 text-white">
                  Contact Us
                </Button>
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
              <img src={logoImage} alt="SRR Logo" className="h-12 w-auto bg-white rounded p-1" />
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl text-white leading-none">SRR</span>
                <span className="text-xs text-slate-300 tracking-widest uppercase">Consultancy</span>
              </div>
            </div>
            <p className="text-slate-200 text-sm leading-relaxed border-l-2 border-accent pl-4">
              Established in 2005, SRR Consultancy is a premier global manpower solution provider, bridging the gap between talent and opportunity.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-heading font-bold text-lg mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-1 after:bg-accent">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-accent transition-colors flex items-center gap-2">About Us</a></li>
              <li><a href="#" className="hover:text-accent transition-colors flex items-center gap-2">Our Services</a></li>
              <li><a href="#" className="hover:text-accent transition-colors flex items-center gap-2">Sectors</a></li>
              <li><a href="#" className="hover:text-accent transition-colors flex items-center gap-2">Job Seekers</a></li>
              <li><a href="#" className="hover:text-accent transition-colors flex items-center gap-2">Contact Us</a></li>
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h3 className="text-white font-heading font-bold text-lg mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-1 after:bg-accent">
              Industries
            </h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-accent transition-colors">Construction & Engineering</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Oil & Gas</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Healthcare & Medical</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Hospitality & Catering</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Logistics & Transport</a></li>
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
                <span className="text-slate-200">123 Business Avenue, Corporate Tower, Mumbai, India - 400001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent shrink-0" />
                <span className="text-slate-200">+91 123 456 7890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent shrink-0" />
                <span className="text-slate-200">info@srrconsultancy.com</span>
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