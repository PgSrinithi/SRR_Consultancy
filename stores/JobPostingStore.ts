import { JobPosting } from "@/interface/jobs";
import { makeAutoObservable, runInAction } from "mobx";

class JobPostingStore {
  jobPostings: JobPosting[] = [];
  loading = false;
  error: Error | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async fetchJobPostings() {
    this.loading = true;
    this.error = null;

    try {
      const response = await fetch("/api/jobPostings", { cache: "no-store" });

      if (!response.ok) {
        throw new Error(`Failed to fetch job postings (${response.status})`);
      }

      const data = await response.json();

      runInAction(() => {
        this.jobPostings = data;
        this.loading = false;
      });
    } catch (err) {
      runInAction(() => {
        this.error =
          err instanceof Error ? err : new Error("Failed to load job postings");
        this.jobPostings = [];
        this.loading = false;
      });
    }
  }

  reset() {
    this.jobPostings = [];
    this.loading = false;
    this.error = null;
  }
}

export const jobPostingStore = new JobPostingStore();
