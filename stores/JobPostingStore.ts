import { JobPosting } from "@/interface/jobs";
import { makeAutoObservable, runInAction } from "mobx";

class JobPostingStore {
  jobPostings: JobPosting[] = [];
  loading = false;
  error: Error | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  getCookie(name: string): string | null {
    if (typeof document === "undefined") return null;

    const match = document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="));

    return match ? decodeURIComponent(match.split("=")[1]) : null;
  }

  async fetchJobPostings() {
    this.loading = true;
    this.error = null;

    try {
      const cached = this.getCookie("jobPostings");

      if (cached) {
        runInAction(() => {
          this.jobPostings = JSON.parse(cached);
          this.loading = false;
        });
        return;
      }
      const response = await fetch("/api/jobPostings");

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
