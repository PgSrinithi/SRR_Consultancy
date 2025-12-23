import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn, StaggerContainer } from "@/components/animations";
import { JobApplicationModal } from "@/components/job-application-modal";

export default function Jobs() {
  const jobPosters = [
    {
      id: 1,
      title: "Senior Civil Engineer",
      posterImage: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=700&fit=crop",
    },
    {
      id: 2,
      title: "Certified Technician (Oil & Gas)",
      posterImage: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=700&fit=crop",
    },
    {
      id: 3,
      title: "Medical Doctor",
      posterImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=700&fit=crop",
    },
    {
      id: 4,
      title: "Executive Chef",
      posterImage: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=500&h=700&fit=crop",
    },
    {
      id: 5,
      title: "Project Manager",
      posterImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=700&fit=crop",
    },
    {
      id: 6,
      title: "Registered Nurse",
      posterImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&h=700&fit=crop",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-12 md:py-16">
        <div className="container-custom">
          <FadeIn>
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">Job Opportunities</h1>
              <p className="text-lg text-white/90 max-w-2xl">
                Explore exciting career opportunities across construction, oil & gas, healthcare, hospitality, and logistics sectors.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Job Posters Grid */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container-custom">
          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {jobPosters.map((job) => (
                <FadeIn key={job.id}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                    {/* Poster Image */}
                    <div className="relative w-full h-96 bg-gray-200 overflow-hidden">
                      <img 
                        src={job.posterImage} 
                        alt={job.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    {/* Footer with Apply Button */}
                    <CardContent className="p-4 flex flex-col gap-4 flex-1 justify-end">
                      <h3 className="text-lg font-bold text-primary line-clamp-2">{job.title}</h3>
                      <JobApplicationModal jobTitle={job.title}>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                          Click Here to Apply
                        </Button>
                      </JobApplicationModal>
                    </CardContent>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>
    </Layout>
  );
}
