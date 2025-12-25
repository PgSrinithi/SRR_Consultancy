"use client";

import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/animations";
import { JobApplicationModal } from "@/components/job-application-modal";
import { observer } from "mobx-react-lite";
import { industryStore, locationStore } from "@/stores";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import {
  JOBS_HERO_TITLE,
  JOBS_HERO_DESCRIPTION,
  JOBS_SEARCH_PLACEHOLDER,
  JOBS_SEARCH_LABEL,
  JOBS_FILTER_LABELS,
  JOBS_PAGE_TEXT,
  ITEMS_PER_PAGE,
  BUTTON_TEXT,
} from "@/lib/constants";

interface Job {
  id: number;
  title: string;
  industry: string;
  location: string;
  description: string;
  qualifications: string[];
}

const JobsContent = observer(function JobsContent() {
  const jobs: Job[] = [
    {
      id: 1,
      title: "Senior Civil Engineer",
      industry: "Construction",
      location: "Lagos",
      description: "We are seeking an experienced Senior Civil Engineer to lead infrastructure projects and manage a team of engineers. The ideal candidate will have expertise in project planning, design, and supervision of large-scale construction projects.",
      qualifications: [
        "Bachelor's degree in Civil Engineering or related field",
        "Minimum 10 years of experience in construction",
        "PEng certification preferred",
        "Strong leadership and communication skills",
        "Experience with CAD software",
      ],
    },
    {
      id: 2,
      title: "Certified Technician (Oil & Gas)",
      industry: "Oil & Gas",
      location: "Port Harcourt",
      description: "Join our oil and gas operations team as a Certified Technician. You will be responsible for maintaining equipment, conducting safety inspections, and ensuring compliance with industry standards.",
      qualifications: [
        "Relevant certification from recognized institution",
        "Minimum 5 years in oil & gas sector",
        "Knowledge of safety protocols",
        "Technical maintenance expertise",
        "Valid driving license",
      ],
    },
    {
      id: 3,
      title: "Medical Doctor",
      industry: "Healthcare",
      location: "Abuja",
      description: "We are looking for a dedicated Medical Doctor to join our healthcare facility. You will provide patient care, conduct medical examinations, and maintain patient records.",
      qualifications: [
        "Medical degree from accredited institution",
        "Current medical license",
        "NYSC completion",
        "Excellent communication skills",
        "Compassionate patient care approach",
      ],
    },
    {
      id: 4,
      title: "Executive Chef",
      industry: "Hospitality",
      location: "Lagos",
      description: "Lead our culinary team as an Executive Chef. Oversee menu development, kitchen operations, and ensure the highest standards of food quality and presentation.",
      qualifications: [
        "Culinary degree or equivalent experience",
        "Minimum 8 years in food preparation",
        "Menu planning expertise",
        "Food safety and hygiene knowledge",
        "Leadership experience",
      ],
    },
    {
      id: 5,
      title: "Project Manager",
      industry: "Construction",
      location: "Abuja",
      description: "Manage multiple construction projects from inception to completion. Coordinate with contractors, monitor budgets, and ensure projects are delivered on time.",
      qualifications: [
        "Project Management certification (PMP/PRINCE2)",
        "Minimum 7 years project management experience",
        "Construction industry knowledge",
        "Strong organizational skills",
        "Budget management expertise",
      ],
    },
    {
      id: 6,
      title: "Registered Nurse",
      industry: "Healthcare",
      location: "Lagos",
      description: "Provide compassionate patient care in our healthcare facility. Administer medications, assist doctors, and maintain accurate patient records.",
      qualifications: [
        "Nursing degree from accredited school",
        "Valid nursing registration",
        "NYSC completion",
        "Strong patient care skills",
        "Ability to work shifts",
      ],
    },
    {
      id: 7,
      title: "Logistics Coordinator",
      industry: "Logistics",
      location: "Port Harcourt",
      description: "Coordinate logistics operations, manage supply chains, and ensure efficient delivery of goods. Work with vendors and track shipments.",
      qualifications: [
        "Diploma in Logistics or related field",
        "Minimum 4 years logistics experience",
        "Supply chain knowledge",
        "Excellent organizational skills",
        "Proficiency in logistics software",
      ],
    },
    {
      id: 8,
      title: "Safety Engineer",
      industry: "Oil & Gas",
      location: "Lagos",
      description: "Develop and implement safety programs in our oil and gas operations. Conduct safety audits, train staff, and ensure HSSE compliance.",
      qualifications: [
        "Engineering degree with safety specialization",
        "NEBOSH certification",
        "Minimum 6 years safety experience",
        "Knowledge of HSSE regulations",
        "Training and coaching abilities",
      ],
    },
    {
      id: 9,
      title: "Logistics Coordinator",
      industry: "Logistics",
      location: "Port Harcourt",
      description: "Coordinate logistics operations, manage supply chains, and ensure efficient delivery of goods. Work with vendors and track shipments.",
      qualifications: [
        "Diploma in Logistics or related field",
        "Minimum 4 years logistics experience",
        "Supply chain knowledge",
        "Excellent organizational skills",
        "Proficiency in logistics software",
      ],
    },
    {
      id: 10,
      title: "Safety Engineer",
      industry: "Oil & Gas",
      location: "Lagos",
      description: "Develop and implement safety programs in our oil and gas operations. Conduct safety audits, train staff, and ensure HSSE compliance.",
      qualifications: [
        "Engineering degree with safety specialization",
        "NEBOSH certification",
        "Minimum 6 years safety experience",
        "Knowledge of HSSE regulations",
        "Training and coaching abilities",
      ],
    }, {
      id: 11,
      title: "Logistics Coordinator",
      industry: "Logistics",
      location: "Port Harcourt",
      description: "Coordinate logistics operations, manage supply chains, and ensure efficient delivery of goods. Work with vendors and track shipments.",
      qualifications: [
        "Diploma in Logistics or related field",
        "Minimum 4 years logistics experience",
        "Supply chain knowledge",
        "Excellent organizational skills",
        "Proficiency in logistics software",
      ],
    },
    {
      id: 12,
      title: "Safety Engineer",
      industry: "Oil & Gas",
      location: "Lagos",
      description: "Develop and implement safety programs in our oil and gas operations. Conduct safety audits, train staff, and ensure HSSE compliance.",
      qualifications: [
        "Engineering degree with safety specialization",
        "NEBOSH certification",
        "Minimum 6 years safety experience",
        "Knowledge of HSSE regulations",
        "Training and coaching abilities",
      ],
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const searchParams = useSearchParams();

  // Get industry from query parameter on component mount
  useEffect(() => {
    const industryParam = searchParams.get("industry");
    if (industryParam) {
      setSelectedIndustries([industryParam]);
    }
  }, [searchParams]);

  // Use MobX store industries if available, otherwise extract from jobs
  const industries = industryStore.industries.map((ind: any) => ind.Name || ind.name).filter(Boolean)
    ;

  // Use MobX store locations if available, otherwise extract from jobs
  const locations = locationStore.locations.map((loc: any) => loc.Name || loc.name).filter(Boolean);

  const toggleIndustry = (industry: string) => {
    setSelectedIndustries((prev) =>
      prev.includes(industry)
        ? prev.filter((i) => i !== industry)
        : [...prev, industry]
    );
  };

  const toggleLocation = (location: string) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((l) => l !== location)
        : [...prev, location]
    );
  };

  const removeIndustryFilter = (industry: string) => {
    setSelectedIndustries((prev) => prev.filter((i) => i !== industry));
  };

  const removeLocationFilter = (location: string) => {
    setSelectedLocations((prev) => prev.filter((l) => l !== location));
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedIndustries([]);
    setSelectedLocations([]);
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch = job.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesIndustry =
        selectedIndustries.length === 0 ||
        selectedIndustries.includes(job.industry);
      const matchesLocation =
        selectedLocations.length === 0 ||
        selectedLocations.includes(job.location);

      return matchesSearch && matchesIndustry && matchesLocation;
    });
  }, [searchQuery, selectedIndustries, selectedLocations, jobs]);

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleViewJob = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-12 md:py-16">
        <div className="container-custom">
          <FadeIn>
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">{JOBS_HERO_TITLE}</h1>
              <p className="text-lg text-white/90 max-w-2xl">
                {JOBS_HERO_DESCRIPTION}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Jobs Section with Filters */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container-custom">
          <div className="space-y-6">
            {/* Search Bar */}
            <FadeIn>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  {JOBS_SEARCH_LABEL}
                </label>
                <Input
                  type="text"
                  placeholder={JOBS_SEARCH_PLACEHOLDER}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-md"
                />
              </div>
            </FadeIn>

            {/* Selected Filters Badges */}
            {(selectedIndustries.length > 0 ||
              selectedLocations.length > 0) && (
                <FadeIn>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm font-medium text-gray-600">
                      {JOBS_FILTER_LABELS.activeFilters}
                    </span>
                    {selectedIndustries.map((industry) => (
                      <Badge
                        key={`industry-${industry}`}
                        variant="secondary"
                        className="gap-2 pl-3"
                      >
                        {industry}
                        <button
                          onClick={() => removeIndustryFilter(industry)}
                          className="hover:text-red-600 cursor-pointer"
                        >
                          <X size={14} />
                        </button>
                      </Badge>
                    ))}
                    {selectedLocations.map((location) => (
                      <Badge
                        key={`location-${location}`}
                        variant="secondary"
                        className="gap-2 pl-3"
                      >
                        {location}
                        <button
                          onClick={() => removeLocationFilter(location)}
                          className="hover:text-red-600 cursor-pointer"
                        >
                          <X size={14} />
                        </button>
                      </Badge>
                    ))}
                    {(selectedIndustries.length > 0 ||
                      selectedLocations.length > 0) && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearAllFilters}
                          className="text-xs cursor-pointer"
                        >
                          {BUTTON_TEXT.clearAll}
                        </Button>
                      )}
                  </div>
                </FadeIn>
              )}

            {/* Main Content - Filters and Jobs */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar Filters */}
              <FadeIn className="lg:col-span-1">
                <div className="sticky top-20 space-y-6">
                  {/* Industry Filter */}
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-4">{JOBS_FILTER_LABELS.industry}</h3>
                    <div className="space-y-3">
                      {industries.map((industry) => (
                        <div key={industry} className="flex items-center">
                          <Checkbox
                            id={`industry-${industry}`}
                            checked={selectedIndustries.includes(industry)}
                            onCheckedChange={() => toggleIndustry(industry)}
                            className="cursor-pointer"
                          />
                          <label
                            htmlFor={`industry-${industry}`}
                            className="ml-2 text-sm text-gray-700 cursor-pointer hover:text-gray-900"
                          >
                            {industry}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Location Filter */}
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-4">{JOBS_FILTER_LABELS.location}</h3>
                    <div className="space-y-3">
                      {locations.map((location) => (
                        <div key={location} className="flex items-center">
                          <Checkbox
                            id={`location-${location}`}
                            checked={selectedLocations.includes(location)}
                            onCheckedChange={() => toggleLocation(location)}
                            className="cursor-pointer"
                          />
                          <label
                            htmlFor={`location-${location}`}
                            className="ml-2 text-sm text-gray-700 cursor-pointer hover:text-gray-900"
                          >
                            {location}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Jobs List */}
              <div className="lg:col-span-3">
                <div className="space-y-4">
                  {paginatedJobs.length > 0 ? (
                    paginatedJobs.map((job) => (
                      <FadeIn key={job.id}>
                        <Card className="p-6 hover:shadow-md transition-shadow duration-300">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-primary mb-2">
                                {job.title}
                              </h3>
                              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-gray-600">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">{JOBS_PAGE_TEXT.industry}:</span>
                                  <span>{job.industry}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">{JOBS_PAGE_TEXT.location}:</span>
                                  <span>{job.location}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2 md:flex-row">
                              <Button
                                onClick={() => handleViewJob(job)}
                                variant="outline"
                                className="cursor-pointer"
                              >
                                {JOBS_PAGE_TEXT.viewButton}
                              </Button>
                              <JobApplicationModal jobTitle={job.title}>
                                <Button className="bg-primary hover:bg-primary/90 text-white whitespace-nowrap cursor-pointer">
                                  {JOBS_PAGE_TEXT.applyButton}
                                </Button>
                              </JobApplicationModal>
                            </div>
                          </div>
                        </Card>
                      </FadeIn>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500 text-lg">
                        {JOBS_PAGE_TEXT.noJobsFound}
                      </p>
                    </div>
                  )}
                </div>

                {/* Pagination */}
                {filteredJobs.length > ITEMS_PER_PAGE && (
                  <FadeIn>
                    <div className="mt-8 flex justify-center">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              onClick={() =>
                                currentPage > 1 &&
                                handlePageChange(currentPage - 1)
                              }
                              className={`cursor-pointer ${currentPage === 1
                                ? "pointer-events-none opacity-50"
                                : ""
                                }`}
                            />
                          </PaginationItem>

                          {Array.from({ length: totalPages }).map((_, i) => {
                            const pageNum = i + 1;
                            const isVisible =
                              pageNum === 1 ||
                              pageNum === totalPages ||
                              Math.abs(pageNum - currentPage) <= 1;

                            return isVisible ? (
                              <PaginationItem key={pageNum}>
                                <PaginationLink
                                  onClick={() => handlePageChange(pageNum)}
                                  isActive={currentPage === pageNum}
                                  className="cursor-pointer"
                                >
                                  {pageNum}
                                </PaginationLink>
                              </PaginationItem>
                            ) : null;
                          })}

                          <PaginationItem>
                            <PaginationNext
                              onClick={() =>
                                currentPage < totalPages &&
                                handlePageChange(currentPage + 1)
                              }
                              className={`cursor-pointer ${currentPage === totalPages
                                ? "pointer-events-none opacity-50"
                                : ""
                                }`}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  </FadeIn>
                )}

                {/* Results Count */}
                {filteredJobs.length > 0 && (
                  <FadeIn>
                    <div className="text-center text-gray-600 mt-8">
                      <p>
                        {JOBS_PAGE_TEXT.showing}{" "}
                        <span className="font-semibold">
                          {(currentPage - 1) * ITEMS_PER_PAGE + 1}
                        </span>{" "}
                        {JOBS_PAGE_TEXT.to}{" "}
                        <span className="font-semibold">
                          {Math.min(
                            currentPage * ITEMS_PER_PAGE,
                            filteredJobs.length
                          )}
                        </span>{" "}
                        {JOBS_PAGE_TEXT.of}{" "}
                        <span className="font-semibold">
                          {filteredJobs.length}
                        </span>{" "}
                        {JOBS_PAGE_TEXT.jobs}
                      </p>
                    </div>
                  </FadeIn>
                )}
              </div>
            </div>

            {/* Job Details Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl">
                    {selectedJob?.title}
                  </DialogTitle>
                </DialogHeader>

                {selectedJob && (
                  <div className="space-y-6">
                    {/* Job Info */}
                    <div className="grid grid-cols-2 gap-4 pb-6 border-b">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          {JOBS_PAGE_TEXT.industry}
                        </p>
                        <p className="text-lg font-semibold">
                          {selectedJob.industry}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          {JOBS_PAGE_TEXT.location}
                        </p>
                        <p className="text-lg font-semibold">
                          {selectedJob.location}
                        </p>
                      </div>
                    </div>

                    {/* Job Description */}
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        {JOBS_PAGE_TEXT.jobDescription}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {selectedJob.description}
                      </p>
                    </div>

                    {/* Qualifications */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">
                        {JOBS_PAGE_TEXT.requiredQualifications}
                      </h3>
                      <ul className="space-y-2">
                        {selectedJob.qualifications.map((qual, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 text-gray-700"
                          >
                            <span className="text-primary font-bold mt-1">
                              •
                            </span>
                            <span>{qual}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Apply Button */}
                    <div className="pt-6 border-t flex gap-3">
                      <JobApplicationModal jobTitle={selectedJob.title}>
                        <Button className="bg-primary hover:bg-primary/90 text-white cursor-pointer flex-1">
                          {JOBS_PAGE_TEXT.applyNowButton}
                        </Button>
                      </JobApplicationModal>
                      <Button
                        variant="outline"
                        onClick={() => setIsModalOpen(false)}
                        className="cursor-pointer"
                      >
                        {JOBS_PAGE_TEXT.closeButton}
                      </Button>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>
    </Layout>
  );
});

export default function Jobs() {
  return (
    <Suspense fallback={
      <Layout>
        <section className="section-padding">
          <div className="container-custom text-center">
            <p>Loading jobs...</p>
          </div>
        </section>
      </Layout>
    }>
      <JobsContent />
    </Suspense>
  );
}