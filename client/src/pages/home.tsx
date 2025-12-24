import { ContactModal } from "@/components/contact-modal";
import { ClientModal } from "@/components/client-modal";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, Users, Building2, Globe2, Briefcase } from "lucide-react";
import { FadeIn, StaggerContainer } from "@/components/animations";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { useState } from "react";
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

// Asset Imports
import heroImage from "@assets/stock_images/professional_busines_09c23622.jpg";
import aboutImage from "@assets/stock_images/business_handshake_d_10e5b8ea.jpg";
import constructionImage from "@assets/stock_images/construction_workers_2f98eaf1.jpg";
import oilImage from "@assets/stock_images/oil_and_gas_refinery_9b2e6c0b.jpg";
import hospitalityImage from "@assets/stock_images/chef_in_commercial_k_f8b13607.jpg";
import healthcareImage from "@assets/stock_images/doctor_nurse_hospita_566fd048.jpg";
import logisticsImage from "@assets/stock_images/global_logistics_wor_3a6eb8f3.jpg";

const SECTOR_DETAILS: Record<string, { image: string; desc: string }> = {
  "Construction": { image: constructionImage, desc: "Skilled civil engineers, masons, and laborers for large-scale projects." },
  "Oil & Gas": { image: oilImage, desc: "Certified technicians and safety experts for onshore and offshore operations." },
  "Healthcare": { image: healthcareImage, desc: "Qualified doctors, nurses, and medical support staff for hospitals." },
  "Hospitality": { image: hospitalityImage, desc: "Experienced chefs, waitstaff, and hotel management professionals." },
  "Logistics": { image: logisticsImage, desc: "Logistics professionals and supply chain experts for global operations." }
};

export default function Home() {
  const [, navigate] = useLocation();
  const [showAllIndustries, setShowAllIndustries] = useState(false);

  const displayedSectors = showAllIndustries ? SECTOR_NAMES : SECTOR_NAMES.slice(0, 4);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[750px] w-full overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "linear" }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/70 to-transparent" />
        </motion.div>
        
        <div className="relative container-custom h-full flex items-center">
          <div className="max-w-3xl text-white space-y-6">
            <FadeIn delay={0.2} direction="right">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-white text-sm font-semibold mb-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                {HERO_BADGE_TEXT}
              </div>
            </FadeIn>
            
            <FadeIn delay={0.4} direction="up">
              <h1 className="text-4xl md:text-7xl font-heading font-extrabold leading-tight">
                {HERO_TITLE.split("<br/>")[0]} <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">{HERO_TITLE.split("<br/>")[1] || ""}</span>
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
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-primary-foreground font-bold text-lg px-8 h-14 rounded-full shadow-lg hover:shadow-accent/25 transition-all cursor-pointer">
                    {BUTTON_TEXT.findTalent}
                  </Button>
                </ClientModal>
                <Button 
                  onClick={() => navigate('/jobs')}
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
                <div key={i} className="text-center space-y-2 border-r last:border-0 border-slate-100">
                  <div className="text-4xl md:text-5xl font-heading font-bold text-primary">{stat.number}</div>
                  <div className="text-sm md:text-base text-slate-500 font-medium uppercase tracking-wide">{stat.label}</div>
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
                <img 
                  src={aboutImage} 
                  alt="Business Meeting" 
                  className="rounded-xl shadow-2xl w-full object-cover aspect-[4/3] border-4 border-white"
                />
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="absolute bottom-8 left-8 bg-white/95 backdrop-blur p-6 rounded-lg shadow-xl max-w-xs hidden md:block border-l-4 border-primary"
                >
                  <p className="text-primary font-bold text-xl mb-1">"{ABOUT_CEO_QUOTE}"</p>
                  <p className="text-sm text-slate-500">- CEO Message</p>
                </motion.div>
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
              
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4" delay={0.4}>
                {ABOUT_FEATURES.map((item) => (
                  <motion.div 
                    variants={{
                      hidden: { opacity: 0, x: 20 },
                      show: { opacity: 1, x: 0 }
                    }}
                    key={item} 
                    className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border border-slate-100"
                  >
                    <CheckCircle2 className="text-secondary h-5 w-5" />
                    <span className="font-medium text-slate-700">{item}</span>
                  </motion.div>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section id="sectors" className="section-padding bg-white relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 skew-x-12 opacity-50 pointer-events-none" />
        
        <div className="container-custom relative">
          <FadeIn direction="up">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-accent font-semibold tracking-wide uppercase text-sm">{SECTORS_BADGE}</h2>
              <h3 className="text-3xl md:text-4xl font-heading font-bold text-primary">{SECTORS_TITLE}</h3>
              <p className="text-slate-600 text-lg">{SECTORS_DESCRIPTION}</p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedSectors.map((sectorName, idx) => {
              const sectorData = SECTOR_DETAILS[sectorName];
              if (!sectorData) return null;
              
              return (
              <motion.div 
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0 }
                }}
                className="group relative overflow-hidden rounded-xl shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-500"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img 
                    src={sectorData.image} 
                    alt={sectorName} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/50 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="w-12 h-1 bg-accent mb-4 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100" />
                  <h4 className="text-xl font-bold font-heading mb-2">{sectorName}</h4>
                  <p className="text-sm text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 mb-4">
                    {sectorData.desc}
                  </p>
                  <button 
                    onClick={() => navigate(`/jobs?industry=${encodeURIComponent(sectorName)}`)
                    }
                    className="inline-flex items-center text-accent text-sm font-semibold hover:text-white transition-colors cursor-pointer"
                  >
                    {BUTTON_TEXT.viewPositions} <ArrowRight className="ml-1 h-3 w-3" />
                  </button>
                </div>
              </motion.div>
            );
            })}
          </StaggerContainer>
          
          <FadeIn direction="up" delay={0.4}>
            <div className="mt-12 text-center">
               {!showAllIndustries && (
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

      {/* Services Section */}
      <section id="services" className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1 space-y-6">
              <FadeIn direction="right">
                <h2 className="text-accent font-semibold tracking-wide uppercase text-sm">{SERVICES_BADGE}</h2>
                <h3 className="text-3xl md:text-4xl font-heading font-bold text-primary">{SERVICES_TITLE}</h3>
                <p className="text-slate-600 text-lg">
                  {SERVICES_DESCRIPTION}
                </p>
              </FadeIn>
              
              <StaggerContainer className="space-y-4 pt-4" delay={0.2}>
                {SERVICES.map((service, i) => (
                  <motion.div 
                    key={i}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      show: { opacity: 1, x: 0 }
                    }}
                    className="flex gap-4 p-5 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-primary/20 transition-all cursor-default"
                  >
                     <div className="bg-primary/5 p-3 rounded-full h-fit">
                       {i === 0 && <Users className="h-6 w-6 text-primary" />}
                       {i === 1 && <Globe2 className="h-6 w-6 text-primary" />}
                       {i === 2 && <Briefcase className="h-6 w-6 text-primary" />}
                     </div>
                     <div>
                       <h4 className="font-bold text-primary text-lg">{service.title}</h4>
                       <p className="text-sm text-slate-500 mt-1">{service.description}</p>
                     </div>
                  </motion.div>
                ))}
              </StaggerContainer>
            </div>
            
            <FadeIn direction="left" delay={0.3} className="md:col-span-2 h-full">
              <div className="relative h-full min-h-[500px] rounded-2xl overflow-hidden shadow-2xl group">
                 <img 
                  src={logisticsImage} 
                  alt="Global Operations" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                />
                 <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
                 <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
                 
                 <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                   <div className="max-w-md space-y-6">
                     <h3 className="text-3xl md:text-4xl font-heading font-bold text-white">{SERVICES_CTA_TITLE}</h3>
                     <p className="text-slate-200 text-lg">
                       {SERVICES_CTA_DESCRIPTION}
                     </p>
                     <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                       <ContactModal>
                         <Button size="lg" className="bg-accent hover:bg-accent/90 text-primary-foreground font-bold rounded-full px-8 mt-4 h-14 text-lg shadow-lg shadow-accent/20">
                           {BUTTON_TEXT.requestConsultation}
                         </Button>
                       </ContactModal>
                     </motion.div>
                   </div>
                 </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-24 bg-primary text-white relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
         
         <div className="container-custom text-center space-y-8 relative z-10">
           <FadeIn direction="up">
             <h2 className="text-3xl md:text-5xl font-heading font-bold">{CONTACT_CTA_TITLE}</h2>
             <p className="text-xl text-slate-300 max-w-2xl mx-auto mt-4">
               {CONTACT_CTA_DESCRIPTION}
             </p>
           </FadeIn>
           
           <FadeIn direction="up" delay={0.2}>
             <div className="flex flex-col sm:flex-row justify-center gap-6 pt-8">
               <ContactModal>
                 <Button variant="secondary" size="lg" className="h-16 px-10 text-lg rounded-full font-bold text-primary bg-white hover:bg-slate-100 shadow-xl cursor-pointer">
                   {BUTTON_TEXT.contactSupport}
                 </Button>
               </ContactModal>
             </div>
           </FadeIn>
         </div>
      </section>
    </Layout>
  );
}