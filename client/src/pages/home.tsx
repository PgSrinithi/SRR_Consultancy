import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, Users, Building2, Globe2, Briefcase } from "lucide-react";

// Asset Imports
import heroImage from "@assets/stock_images/professional_busines_09c23622.jpg";
import aboutImage from "@assets/stock_images/business_handshake_d_10e5b8ea.jpg";
import constructionImage from "@assets/stock_images/construction_workers_2f98eaf1.jpg";
import oilImage from "@assets/stock_images/oil_and_gas_refinery_9b2e6c0b.jpg";
import hospitalityImage from "@assets/stock_images/chef_in_commercial_k_f8b13607.jpg";
import healthcareImage from "@assets/stock_images/doctor_nurse_hospita_566fd048.jpg";
import logisticsImage from "@assets/stock_images/global_logistics_wor_3a6eb8f3.jpg";

export default function Home() {
  const sectors = [
    { title: "Construction", image: constructionImage, desc: "Skilled civil engineers, masons, and laborers for large-scale projects." },
    { title: "Oil & Gas", image: oilImage, desc: "Certified technicians and safety experts for onshore and offshore operations." },
    { title: "Healthcare", image: healthcareImage, desc: "Qualified doctors, nurses, and medical support staff for hospitals." },
    { title: "Hospitality", image: hospitalityImage, desc: "Experienced chefs, waitstaff, and hotel management professionals." },
  ];

  const stats = [
    { number: "18+", label: "Years Experience" },
    { number: "50k+", label: "Workers Placed" },
    { number: "500+", label: "Corporate Clients" },
    { number: "25+", label: "Countries Served" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/40" />
        </div>
        
        <div className="relative container-custom h-full flex items-center">
          <div className="max-w-2xl text-white space-y-6 animate-in slide-in-from-left-10 duration-700 fade-in">
            <div className="inline-block bg-primary/20 backdrop-blur-sm border border-primary/40 px-4 py-1.5 rounded-full text-primary-foreground text-sm font-semibold mb-2">
              ESTABLISHED 2005
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold leading-tight">
              Global Manpower <br/>
              <span className="text-primary">Solutions Partner</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-xl">
              Connecting world-class businesses with exceptional talent. 
              Your trusted partner for international recruitment and workforce management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="bg-primary hover:bg-blue-600 text-lg px-8 h-12 rounded-full shadow-lg hover:shadow-primary/25 transition-all">
                Find Talent
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 border-white text-white text-lg px-8 h-12 rounded-full backdrop-blur-sm">
                Search Jobs
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white -mt-16 relative z-10">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-white p-8 rounded-xl shadow-xl border border-slate-100">
            {stats.map((stat, i) => (
              <div key={i} className="text-center space-y-2 border-r last:border-0 border-slate-100">
                <div className="text-4xl md:text-5xl font-heading font-bold text-primary">{stat.number}</div>
                <div className="text-sm md:text-base text-slate-500 font-medium uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-tl-3xl -z-10" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-br-3xl -z-10" />
              <img 
                src={aboutImage} 
                alt="Business Meeting" 
                className="rounded-xl shadow-2xl w-full object-cover aspect-[4/3] border-4 border-white"
              />
              <div className="absolute bottom-8 left-8 bg-white p-6 rounded-lg shadow-xl max-w-xs hidden md:block">
                <p className="text-primary font-bold text-xl mb-1">"Excellence in every placement"</p>
                <p className="text-sm text-slate-500">- CEO Message</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-primary font-semibold tracking-wide uppercase text-sm">About SRR Consultancy</h2>
                <h3 className="text-3xl md:text-4xl font-heading font-bold text-slate-900">
                  Reliable Manpower Solutions <br/> Since 2005
                </h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                SRR Consultancy has been a pioneer in the recruitment industry, providing comprehensive manpower solutions to clients across the Middle East, Europe, and Asia. We specialize in sourcing, screening, and deploying top-tier talent that meets the specific needs of your industry.
              </p>
              <p className="text-slate-600 leading-relaxed">
                With over 18 years of experience, we understand the nuances of international recruitment. Our rigorous selection process ensures that you get not just employees, but valuable assets who contribute to your company's growth.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {["ISO Certified Process", "Global Network", "Industry Specialists", "Fast Turnaround"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="text-primary h-5 w-5" />
                    <span className="font-medium text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="pt-6">
                <Button className="bg-slate-900 text-white hover:bg-slate-800 rounded-full px-8">
                  Read More About Us <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section id="sectors" className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-primary font-semibold tracking-wide uppercase text-sm">Industries We Serve</h2>
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-slate-900">Specialized Recruitment Across Key Sectors</h3>
            <p className="text-slate-600">We have deep expertise in sourcing professionals for specialized industries, ensuring technical competency and cultural fit.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sectors.map((sector, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-xl shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-300">
                <div className="aspect-[3/4] overflow-hidden">
                  <img 
                    src={sector.image} 
                    alt={sector.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h4 className="text-xl font-bold font-heading mb-2">{sector.title}</h4>
                  <p className="text-sm text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 mb-4">
                    {sector.desc}
                  </p>
                  <a href="#" className="inline-flex items-center text-primary-foreground text-sm font-semibold hover:underline">
                    View Positions <ArrowRight className="ml-1 h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
             <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white rounded-full px-8">
               View All Industries
             </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1 space-y-6">
              <h2 className="text-primary font-semibold tracking-wide uppercase text-sm">Our Services</h2>
              <h3 className="text-3xl md:text-4xl font-heading font-bold text-slate-900">Comprehensive HR Solutions</h3>
              <p className="text-slate-600">
                From initial screening to final deployment, we handle every aspect of the recruitment lifecycle, making hiring seamless for you.
              </p>
              <div className="space-y-4 pt-4">
                <div className="flex gap-4 p-4 bg-white rounded-lg shadow-sm border border-slate-100">
                   <div className="bg-primary/10 p-3 rounded-full h-fit">
                     <Users className="h-6 w-6 text-primary" />
                   </div>
                   <div>
                     <h4 className="font-bold text-slate-900">Recruitment</h4>
                     <p className="text-sm text-slate-500 mt-1">Sourcing and screening best-fit candidates.</p>
                   </div>
                </div>
                <div className="flex gap-4 p-4 bg-white rounded-lg shadow-sm border border-slate-100">
                   <div className="bg-primary/10 p-3 rounded-full h-fit">
                     <Globe2 className="h-6 w-6 text-primary" />
                   </div>
                   <div>
                     <h4 className="font-bold text-slate-900">Visa & Migration</h4>
                     <p className="text-sm text-slate-500 mt-1">End-to-end documentation and processing.</p>
                   </div>
                </div>
                <div className="flex gap-4 p-4 bg-white rounded-lg shadow-sm border border-slate-100">
                   <div className="bg-primary/10 p-3 rounded-full h-fit">
                     <Briefcase className="h-6 w-6 text-primary" />
                   </div>
                   <div>
                     <h4 className="font-bold text-slate-900">Training</h4>
                     <p className="text-sm text-slate-500 mt-1">Skill enhancement and cultural orientation.</p>
                   </div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2 relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
               <img src={logisticsImage} alt="Global Operations" className="absolute inset-0 w-full h-full object-cover" />
               <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center p-8 text-center">
                 <div className="max-w-md space-y-6">
                   <h3 className="text-3xl font-heading font-bold text-white">Ready to build your dream team?</h3>
                   <p className="text-slate-200">
                     Partner with SRR Consultancy for reliable, efficient, and compliant manpower solutions tailored to your project needs.
                   </p>
                   <Button size="lg" className="bg-primary hover:bg-blue-600 text-white rounded-full px-8 mt-4">
                     Request a Consultation
                   </Button>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-20 bg-primary text-white">
         <div className="container-custom text-center space-y-8">
           <h2 className="text-3xl md:text-5xl font-heading font-bold">Get in Touch With Us</h2>
           <p className="text-xl text-blue-100 max-w-2xl mx-auto">
             Whether you're an employer looking for talent or a professional seeking opportunities, we're here to help.
           </p>
           <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
             <Button variant="secondary" size="lg" className="h-14 px-8 text-lg rounded-full font-bold text-primary">
               Contact Support
             </Button>
             <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full border-2 border-white text-white hover:bg-white/10">
               Submit Resume
             </Button>
           </div>
         </div>
      </section>
    </Layout>
  );
}