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
import {
  industryStore,
  jobPostingStore,
  jobRoleStore,
  locationStore,
} from "@/stores";
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

  useEffect(() => {
    setIsMounted(true);
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

  const toggleIndustry = (industryId: string) => {
    setSelectedIndustries((prev) =>
      prev.includes(industryId)
        ? prev.filter((i) => i !== industryId)
        : [...prev, industryId]
    );
    setCurrentPage(1);
  };

  const toggleLocation = (locationId: string) => {
    setSelectedLocations((prev) =>
      prev.includes(locationId)
        ? prev.filter((l) => l !== locationId)
        : [...prev, locationId]
    );
    setCurrentPage(1);
  };

  const toggleJobRole = (jobRoleId: string) => {
    setSelectedJobRoles((prev) =>
      prev.includes(jobRoleId)
        ? prev.filter((j) => j !== jobRoleId)
        : [...prev, jobRoleId]
    );
    setCurrentPage(1);
  };

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
              <h1 className="text-4xl md:text-5xl font-bold">
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
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar Filters */}
              <FadeIn className="lg:col-span-1">
                <div className="sticky top-20 space-y-6">
                  {/* Industry Filter */}
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      {JOBS_FILTER_LABELS.industry}
                    </h3>
                    <div className="space-y-3">
                      {industries.map((industry) => (
                        <div key={industry.id} className="flex items-center">
                          <Checkbox
                            id={`industry-${industry.id}`}
                            checked={selectedIndustries.includes(industry.id)}
                            onCheckedChange={() => toggleIndustry(industry.id)}
                            className="cursor-pointer"
                          />
                          <label
                            htmlFor={`industry-${industry.id}`}
                            className="ml-2 text-sm text-gray-700 cursor-pointer hover:text-gray-900"
                          >
                            {industry.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Location Filter */}
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      {JOBS_FILTER_LABELS.location}
                    </h3>
                    <div className="space-y-3">
                      {locations.map((location) => (
                        <div key={location.id} className="flex items-center">
                          <Checkbox
                            id={`location-${location.id}`}
                            checked={selectedLocations.includes(location.id)}
                            onCheckedChange={() => toggleLocation(location.id)}
                            className="cursor-pointer"
                          />
                          <label
                            htmlFor={`location-${location.id}`}
                            className="ml-2 text-sm text-gray-700 cursor-pointer hover:text-gray-900"
                          >
                            {location.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Job Role Filter */}
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      {JOBS_FILTER_LABELS.jobRole}
                    </h3>
                    <div className="space-y-3">
                      {jobRoles.map((jobRole) => (
                        <div key={jobRole.id} className="flex items-center">
                          <Checkbox
                            id={`jobRole-${jobRole.id}`}
                            checked={selectedJobRoles.includes(jobRole.id)}
                            onCheckedChange={() => toggleJobRole(jobRole.id)}
                            className="cursor-pointer"
                          />
                          <label
                            htmlFor={`jobRole-${jobRole.id}`}
                            className="ml-2 text-sm text-gray-700 cursor-pointer hover:text-gray-900"
                          >
                            {jobRole.name}
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
                  {!isMounted ? (
                    <div className="text-center py-12">
                      <p className="text-gray-500 text-lg">Loading jobs...</p>
                    </div>
                  ) : jobPostingStore.loading ? (
                    <div className="text-center py-12">
                      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16 mx-auto"></div>
                    </div>
                  ) : paginatedJobs.length > 0 ? (
                    paginatedJobs.map((job) => (
                      <FadeIn key={job.id}>
                        <Card className="p-6 hover:shadow-md transition-shadow duration-300">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-primary mb-2">
                                {job.jobRoleName}
                              </h3>
                              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-gray-600">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">
                                    {JOBS_PAGE_TEXT.industry}:
                                  </span>
                                  <span>{job.industryName}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">
                                    {JOBS_PAGE_TEXT.location}:
                                  </span>
                                  <span>{job.locationName}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">Openings:</span>
                                  <span className="text-primary font-semibold">
                                    {job.Openings}
                                  </span>
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
                              <JobApplicationModal jobTitle={job.jobRoleName}>
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
                              className={`cursor-pointer ${
                                currentPage === 1
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
                              className={`cursor-pointer ${
                                currentPage === totalPages
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
                    {selectedJob?.jobRoleName}
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
                          {selectedJob.industryName}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          {JOBS_PAGE_TEXT.location}
                        </p>
                        <p className="text-lg font-semibold">
                          {selectedJob.locationName}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Available Openings
                        </p>
                        <p className="text-lg font-semibold text-primary">
                          {selectedJob.Openings}
                        </p>
                      </div>
                    </div>

                    {/* Requirements */}
                    {selectedJob.Requirement && (
                      <div>
                        <h3 className="text-lg font-semibold mb-3">
                          {JOBS_PAGE_TEXT.requiredQualifications}
                        </h3>
                        <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                          {selectedJob.Requirement}
                        </div>
                      </div>
                    )}

                    {!selectedJob.Requirement && (
                      <div>
                        <h3 className="text-lg font-semibold mb-3">
                          {JOBS_PAGE_TEXT.requiredQualifications}
                        </h3>
                        <p className="text-gray-500 italic">
                          No specific requirements listed. Please contact us for
                          more details.
                        </p>
                      </div>
                    )}

                    {/* Apply Button */}
                    <div className="pt-6 border-t flex gap-3">
                      <JobApplicationModal jobTitle={selectedJob.jobRoleName}>
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
