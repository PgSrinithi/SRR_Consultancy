import { FadeIn } from "@/components/animations";
import { JobApplicationModal } from "@/components/job-application-modal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  industryStore,
  jobPostingStore,
  jobRoleStore,
  locationStore,
} from "@/stores";

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

  const areAllSelected = (allIds: string[], selected: string[]) =>
    allIds.length > 0 && allIds.every((id) => selected.includes(id));
  const industrySelectAllId = "industry-select-all";
  const locationSelectAllId = "location-select-all";
  const jobRoleSelectAllId = "job-role-select-all";

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

  const FilterLoader = () => (
    <div className="flex justify-center py-6">
      <div className="w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar Filters */}
      <FadeIn className="lg:col-span-1">
        <div className="sticky top-24 space-y-4">
          {/* Industry Filter */}
          <div className="bg-card p-5 rounded-2xl border border-border/50 shadow-sm">
            <h3 className="font-semibold text-foreground text-sm mb-4">
              {JOBS_FILTER_LABELS.industry}
            </h3>

            {industryStore.loading || !isMounted ? (
              <FilterLoader />
            ) : (
              <div className="space-y-3">
                {/* Select All */}
                <div className="flex items-center border-b pb-2 mb-2">
                  <Checkbox
                      id={industrySelectAllId}
                    checked={areAllSelected(
                      industryStore.industries.map((i) => i.id),
                      selectedIndustries
                    )}
                    onCheckedChange={(checked) => {
                      setSelectedIndustries(
                        checked ? industryStore.industries.map((i) => i.id) : []
                      );
                      setCurrentPage(1);
                    }}
                  />
                  <label htmlFor={industrySelectAllId} className="ml-2 text-sm font-medium text-foreground cursor-pointer">
                    Select All
                  </label>
                </div>

                {/* Items */}
                {industryStore.industries.map((industry) => (
                  <div key={industry.id} className="flex items-center">
                    <Checkbox
                      id={`industry-${industry.id}`}
                      checked={selectedIndustries.includes(industry.id)}
                      onCheckedChange={() => toggleIndustry(industry.id)}
                    />
                    <label
                      htmlFor={`industry-${industry.id}`}
                      className="ml-2 text-sm text-muted-foreground cursor-pointer"
                    >
                      {industry.name}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Location Filter */}
          <div className="bg-card p-5 rounded-2xl border border-border/50 shadow-sm">
            <h3 className="font-semibold text-foreground text-sm mb-4">
              {JOBS_FILTER_LABELS.location}
            </h3>

            {locationStore.loading || !isMounted ? (
              <FilterLoader />
            ) : (
              <div className="space-y-3">
                <div className="flex items-center border-b pb-2 mb-2">
                  <Checkbox
                    id={locationSelectAllId}
                    checked={areAllSelected(
                      locations.map((l) => l.id),
                      selectedLocations
                    )}
                    onCheckedChange={(checked) => {
                      setSelectedLocations(
                        checked ? locations.map((l) => l.id) : []
                      );
                      setCurrentPage(1);
                    }}
                  />
                  <label htmlFor={locationSelectAllId} className="ml-2 text-sm font-medium text-foreground cursor-pointer">
                    Select All
                  </label>
                </div>

                {locations.map((location) => (
                  <div key={location.id} className="flex items-center">
                    <Checkbox
                      id={`location-${location.id}`}
                      checked={selectedLocations.includes(location.id)}
                      onCheckedChange={() => toggleLocation(location.id)}
                    />
                    <label
                      htmlFor={`location-${location.id}`}
                      className="ml-2 text-sm text-muted-foreground cursor-pointer"
                    >
                      {location.name}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Job Role Filter */}
          <div className="bg-card p-5 rounded-2xl border border-border/50 shadow-sm">
            <h3 className="font-semibold text-foreground text-sm mb-4">
              {JOBS_FILTER_LABELS.jobRole}
            </h3>

            {jobRoleStore.loading || !isMounted ? (
              <FilterLoader />
            ) : (
              <div className="space-y-3">
                <div className="flex items-center border-b pb-2 mb-2">
                  <Checkbox
                    id={jobRoleSelectAllId}
                    checked={areAllSelected(
                      jobRoles.map((j) => j.id),
                      selectedJobRoles
                    )}
                    onCheckedChange={(checked) => {
                      setSelectedJobRoles(
                        checked ? jobRoles.map((j) => j.id) : []
                      );
                      setCurrentPage(1);
                    }}
                  />
                  <label htmlFor={jobRoleSelectAllId} className="ml-2 text-sm font-medium text-foreground cursor-pointer">
                    Select All
                  </label>
                </div>

                {jobRoles.map((jobRole) => (
                  <div key={jobRole.id} className="flex items-center">
                    <Checkbox
                      id={`jobRole-${jobRole.id}`}
                      checked={selectedJobRoles.includes(jobRole.id)}
                      onCheckedChange={() => toggleJobRole(jobRole.id)}
                    />
                    <label
                      htmlFor={`jobRole-${jobRole.id}`}
                      className="ml-2 text-sm text-muted-foreground cursor-pointer"
                    >
                      {jobRole.name}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </FadeIn>

      {/* Jobs List */}
      <div className="lg:col-span-3">
        <div className="space-y-4">
          {!isMounted ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">Loading jobs...</p>
            </div>
          ) : jobPostingStore.loading ? (
            <div className="text-center py-16">
              <div className="w-10 h-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin mx-auto"></div>
            </div>
          ) : paginatedJobs.length > 0 ? (
            paginatedJobs.map((job) => (
              <FadeIn key={job.id}>
                <Card className="p-5 md:p-6 rounded-2xl border border-border/50 shadow-sm hover:shadow-card-hover hover:border-border transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {job.jobRoleName}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                          {job.industryName}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                          {job.locationName}
                        </span>
                        <span className="text-primary font-medium">
                          {job.Openings} {job.Openings === 1 ? 'opening' : 'openings'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        onClick={() => handleViewJob(job)}
                        variant="outline"
                        size="sm"
                        className="rounded-full px-4 border-border hover:border-primary cursor-pointer"
                      >
                        {JOBS_PAGE_TEXT.viewButton}
                      </Button>
                      <JobApplicationModal jobTitle={job.jobRoleName}>
                        <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-5 font-medium cursor-pointer">
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
              <p className="text-muted-foreground text-lg">
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
            <div className="text-center text-muted-foreground mt-8">
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
