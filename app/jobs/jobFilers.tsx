import { FadeIn } from "@/components/animations";
import { JobApplicationModal } from "@/components/job-application-modal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  ITEMS_PER_PAGE,
  JOBS_FILTER_LABELS,
  JOBS_PAGE_TEXT,
} from "@/lib/constants";
import { jobPostingStore } from "@/stores";
import { Checkbox } from "@radix-ui/react-checkbox";

interface JobFiltersProps {
  isMounted: boolean;
  industries: { id: string; name: string }[];
  locations: { id: string; name: string }[];
  jobRoles: { id: string; name: string }[];
  selectedIndustries: string[];
  selectedLocations: string[];
  selectedJobRoles: string[];
  setSelectedIndustries: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedLocations: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedJobRoles: React.Dispatch<React.SetStateAction<string[]>>;
  setCurrentPage: (page: number) => void;
  currentPage: number;
  paginatedJobs: any[];
  filteredJobs: any[];
  totalPages: number;
  handlePageChange: (page: number) => void;
  handleViewJob: (job: any) => void;
}

export function JobFilters(props: JobFiltersProps) {
  const {
    isMounted,
    industries,
    locations,
    jobRoles,
    selectedIndustries,
    selectedLocations,
    selectedJobRoles,
    setSelectedIndustries,
    setSelectedLocations,
    setSelectedJobRoles,
    setCurrentPage,
    currentPage,
    paginatedJobs,
    filteredJobs,
    totalPages,
    handlePageChange,
    handleViewJob,
  } = props;

  const toggleIndustry = (industryId: string) => {
    setSelectedIndustries((prev: string[]) =>
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

  return (
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
                        currentPage > 1 && handlePageChange(currentPage - 1)
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
                  {Math.min(currentPage * ITEMS_PER_PAGE, filteredJobs.length)}
                </span>{" "}
                {JOBS_PAGE_TEXT.of}{" "}
                <span className="font-semibold">{filteredJobs.length}</span>{" "}
                {JOBS_PAGE_TEXT.jobs}
              </p>
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  );
}
