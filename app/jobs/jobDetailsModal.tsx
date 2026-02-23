"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { JobApplicationModal } from "@/components/job-application-modal";
import { JOBS_PAGE_TEXT } from "@/lib/constants";

interface EnrichedJob {
  jobRoleName: string;
  industryName: string;
  locationName: string;
  Requirement: string | null;
  Openings: number;
}

interface JobDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: EnrichedJob | null;
}

export function JobDetailsModal({
  open,
  onOpenChange,
  job,
}: JobDetailsModalProps) {
  if (!job) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {job.jobRoleName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Job Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b">
            <div>
              <p className="text-sm font-medium text-gray-600">
                {JOBS_PAGE_TEXT.industry}
              </p>
              <p className="text-lg font-semibold">
                {job.industryName}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-600">
                {JOBS_PAGE_TEXT.location}
              </p>
              <p className="text-lg font-semibold">
                {job.locationName}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-600">
                Available Openings
              </p>
              <p className="text-lg font-semibold text-primary">
                {job.Openings}
              </p>
            </div>
          </div>

          {/* Requirements */}
          <div>
            <h3 className="text-lg font-semibold mb-3">
              {JOBS_PAGE_TEXT.requiredQualifications}
            </h3>

            {job.Requirement ? (
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {job.Requirement}
              </div>
            ) : (
              <p className="text-gray-500 italic">
                No specific requirements listed. Please contact us for more details.
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="pt-6 border-t flex gap-3">
            <JobApplicationModal jobTitle={job.jobRoleName}>
              <Button className="bg-primary hover:bg-primary/90 text-white flex-1">
                {JOBS_PAGE_TEXT.applyNowButton}
              </Button>
            </JobApplicationModal>

            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              {JOBS_PAGE_TEXT.closeButton}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
