import { Link, useLocation } from "wouter";
import { Menu, X, Phone, Mail, Facebook, Twitter, Linkedin, Instagram, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "#about" },
    { name: "Sectors", href: "#sectors" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <div className="flex min-h-screen flex-col font-sans">
      {/* Top Bar - Corporate Style */}
      <div className="bg-primary text-primary-foreground py-2 text-sm hidden md:block">
        <div className="container-custom flex justify-between items-center">
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>+91 123 456 7890</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>info@srrconsultancy.com</span>
            </div>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white/80 transition-colors"><Facebook className="h-4 w-4" /></a>
            <a href="#" className="hover:text-white/80 transition-colors"><Twitter className="h-4 w-4" /></a>
            <a href="#" className="hover:text-white/80 transition-colors"><Linkedin className="h-4 w-4" /></a>
            <a href="#" className="hover:text-white/80 transition-colors"><Instagram className="h-4 w-4" /></a>
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
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="bg-primary text-white font-heading font-bold text-2xl px-2 py-1 rounded">SRR</div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xl text-foreground leading-none">SRR</span>
              <span className="text-xs text-muted-foreground tracking-widest uppercase">Consultancy</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm font-semibold text-foreground/80 hover:text-primary transition-colors uppercase tracking-wide"
              >
                {link.name}
              </a>
            ))}
            <Button className="bg-primary hover:bg-blue-700 text-white shadow-md rounded-full px-6">
              Get in Touch
            </Button>
          </nav>

          {/* Mobile Nav */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-lg font-medium hover:text-primary transition-colors block py-2 border-b border-border/50"
                  >
                    {link.name}
                  </a>
                ))}
                <Button className="w-full mt-4 bg-primary hover:bg-blue-700">
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
      <footer className="bg-slate-900 text-slate-200 pt-16 pb-8">
        <div className="container-custom grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-white text-primary font-heading font-bold text-2xl px-2 py-1 rounded">SRR</div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl text-white leading-none">SRR</span>
                <span className="text-xs text-slate-400 tracking-widest uppercase">Consultancy</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Established in 2005, SRR Consultancy is a premier global manpower solution provider, bridging the gap between talent and opportunity across industries.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-heading font-bold text-lg mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-1 after:bg-primary">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2">Our Services</a></li>
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2">Sectors</a></li>
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2">Job Seekers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2">Contact Us</a></li>
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h3 className="text-white font-heading font-bold text-lg mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-1 after:bg-primary">
              Industries
            </h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Construction & Engineering</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Oil & Gas</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Healthcare & Medical</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Hospitality & Catering</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Logistics & Transport</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-heading font-bold text-lg mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-1 after:bg-primary">
              Contact Info
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-slate-400">123 Business Avenue, Corporate Tower, Mumbai, India - 400001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span className="text-slate-400">+91 123 456 7890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span className="text-slate-400">info@srrconsultancy.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="container-custom pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} SRR Consultancy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}