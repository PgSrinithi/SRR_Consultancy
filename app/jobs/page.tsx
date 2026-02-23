"use client";

import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/animations";
import { observer } from "mobx-react-lite";
import {
  industryStore,
  jobPostingStore,
  jobRoleStore,
  locationStore,
  clientLogosStore,
} from "@/stores";
import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import {
  JOBS_HERO_TITLE,
  JOBS_HERO_DESCRIPTION,
  JOBS_SEARCH_PLACEHOLDER,
  JOBS_SEARCH_LABEL,
  JOBS_FILTER_LABELS,
  ITEMS_PER_PAGE,
  BUTTON_TEXT,
} from "@/lib/constants";
import { JobFilters } from "./jobFilers";
import { JobDetailsModal } from "./jobDetailsModal";

interface JobPosting {
  id: string;
  jobId: string;
  industryId: string;
  locationId: string;
  Requirement: string | null;
  Openings: number;
}

interface EnrichedJob extends JobPosting {
  jobRoleName: string;
  industryName: string;
  locationName: string;
}

const JobsContent = observer(function JobsContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedJobRoles, setSelectedJobRoles] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState<EnrichedJob | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const isLoading =
    !isMounted ||
    industryStore.loading ||
    locationStore.loading ||
    jobRoleStore.loading ||
    jobPostingStore.loading ||
    clientLogosStore.loading;
  useEffect(() => {
    setIsMounted(true);
    if (industryStore.industries.length === 0 && !industryStore.loading) {
      industryStore.fetchIndustries();
    }
    if (locationStore.locations.length === 0 && !locationStore.loading) {
      locationStore.fetchLocations();
    }
    if (jobRoleStore.jobRoles.length === 0 && !jobRoleStore.loading) {
      jobRoleStore.fetchJobRoles();
    }
    if (jobPostingStore.jobPostings.length === 0 && !jobPostingStore.loading) {
      jobPostingStore.fetchJobPostings();
    }
    clientLogosStore.fetchClientLogos();
  }, []);

  // Get industry from query parameter on component mount
  useEffect(() => {
    const industryParam = searchParams.get("industry");
    if (industryParam) {
      // Find the industry ID by name
      const industry = industryStore.industries.find(
        (ind: any) => ind.name === industryParam
      );
      if (industry) {
        setSelectedIndustries([industry.id]);
      }
    }
  }, [searchParams]);

  // Get master data arrays
  const industries = useMemo(
    () =>
      industryStore.industries
        .map((ind: any) => ({
          id: ind.id,
          name: ind.name,
        }))
        .filter((ind) => ind.name),
    [industryStore.industries]
  );

  const locations = useMemo(
    () =>
      locationStore.locations
        .map((loc: any) => ({
          id: loc.id,
          name: loc.name,
        }))
        .filter((loc) => loc.name),
    [locationStore.locations]
  );
  const jobRoles = useMemo(
    () =>
      jobRoleStore.jobRoles
        .map((role: any) => ({
          id: role.id,
          name: role.jobName,
        }))
        .filter((role) => role.name),
    [jobRoleStore.jobRoles]
  );

  // Enrich job postings with master data
  const enrichedJobs = useMemo(() => {
    return (jobPostingStore?.jobPostings || []).map((job: JobPosting) => {
      const industry = industries.find((ind) => ind.id === job.industryId);
      const location = locations.find((loc) => loc.id === job.locationId);
      const jobRole = jobRoles.find((role) => role.id === job.jobId);

      return {
        ...job,
        jobRoleName: jobRole?.name || "Unknown Role",
        industryName: industry?.name || "Unknown Industry",
        locationName: location?.name || "Unknown Location",
      };
    });
  }, [jobPostingStore?.jobPostings, industries, locations, jobRoles]);

  const removeIndustryFilter = (industryId: string) => {
    setSelectedIndustries((prev) => prev.filter((i) => i !== industryId));
  };

  const removeLocationFilter = (locationId: string) => {
    setSelectedLocations((prev) => prev.filter((l) => l !== locationId));
  };

  const removeJobRoleFilter = (jobRoleId: string) => {
    setSelectedJobRoles((prev) => prev.filter((j) => j !== jobRoleId));
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedIndustries([]);
    setSelectedLocations([]);
    setSelectedJobRoles([]);
    setCurrentPage(1);
  };

  // Filter jobs based on selected filters and search query
  const filteredJobs = useMemo(() => {
    return enrichedJobs.filter((job) => {
      // Search query filter - searches in job role name
      const matchesSearch =
        searchQuery === "" ||
        job.jobRoleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.industryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.locationName.toLowerCase().includes(searchQuery.toLowerCase());

      // Industry filter
      const matchesIndustry =
        selectedIndustries.length === 0 ||
        selectedIndustries.includes(job.industryId);

      // Location filter
      const matchesLocation =
        selectedLocations.length === 0 ||
        selectedLocations.includes(job.locationId);

      // Job Role filter
      const matchesJobRole =
        selectedJobRoles.length === 0 || selectedJobRoles.includes(job.jobId);

      return (
        matchesSearch && matchesIndustry && matchesLocation && matchesJobRole
      );
    });
  }, [
    enrichedJobs,
    searchQuery,
    selectedIndustries,
    selectedLocations,
    selectedJobRoles,
  ]);

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleViewJob = (job: EnrichedJob) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Get display names for selected filters
  const getIndustryName = (id: string) =>
    industries.find((ind) => ind.id === id)?.name || "";
  const getLocationName = (id: string) =>
    locations.find((loc) => loc.id === id)?.name || "";
  const getJobRoleName = (id: string) =>
    jobRoles.find((role) => role.id === id)?.name || "";

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-12 md:py-16">
        <div className="container-custom">
          <FadeIn>
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                {JOBS_HERO_TITLE}
              </h1>
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
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="max-w-md"
                  disabled={isLoading}
                />
              </div>
            </FadeIn>

            {/* Selected Filters Badges */}
            {(selectedIndustries.length > 0 ||
              selectedLocations.length > 0 ||
              selectedJobRoles.length > 0) && (
              <FadeIn>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm font-medium text-gray-600">
                    {JOBS_FILTER_LABELS.activeFilters}
                  </span>
                  {selectedIndustries.map((industryId) => (
                    <Badge
                      key={`industry-${industryId}`}
                      variant="secondary"
                      className="gap-2 pl-3"
                    >
                      {getIndustryName(industryId)}
                      <button
                        onClick={() => removeIndustryFilter(industryId)}
                        className="hover:text-red-600 cursor-pointer"
                      >
                        <X size={14} />
                      </button>
                    </Badge>
                  ))}
                  {selectedLocations.map((locationId) => (
                    <Badge
                      key={`location-${locationId}`}
                      variant="secondary"
                      className="gap-2 pl-3"
                    >
                      {getLocationName(locationId)}
                      <button
                        onClick={() => removeLocationFilter(locationId)}
                        className="hover:text-red-600 cursor-pointer"
                      >
                        <X size={14} />
                      </button>
                    </Badge>
                  ))}
                  {selectedJobRoles.map((jobRoleId) => (
                    <Badge
                      key={`jobRole-${jobRoleId}`}
                      variant="secondary"
                      className="gap-2 pl-3"
                    >
                      {getJobRoleName(jobRoleId)}
                      <button
                        onClick={() => removeJobRoleFilter(jobRoleId)}
                        className="hover:text-red-600 cursor-pointer"
                      >
                        <X size={14} />
                      </button>
                    </Badge>
                  ))}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="text-xs cursor-pointer"
                  >
                    {BUTTON_TEXT.clearAll}
                  </Button>
                </div>
              </FadeIn>
            )}

            {/* Main Content - Filters and Jobs */}
            <JobFilters
              isMounted={isMounted}
              industries={industries}
              locations={locations}
              jobRoles={jobRoles}
              selectedIndustries={selectedIndustries}
              selectedLocations={selectedLocations}
              selectedJobRoles={selectedJobRoles}
              setSelectedIndustries={setSelectedIndustries}
              setSelectedLocations={setSelectedLocations}
              setSelectedJobRoles={setSelectedJobRoles}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              paginatedJobs={paginatedJobs}
              filteredJobs={filteredJobs}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
              handleViewJob={handleViewJob}
            />

            {/* Job Details Modal */}
            <JobDetailsModal
              open={isModalOpen}
              onOpenChange={setIsModalOpen}
              job={selectedJob}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
});

export default function Jobs() {
  return (
    <Suspense
      fallback={
        <Layout>
          <section className="section-padding">
            <div className="container-custom text-center">
              <p>Loading jobs...</p>
            </div>
          </section>
        </Layout>
      }
    >
      <JobsContent />
    </Suspense>
  );
}
2;
