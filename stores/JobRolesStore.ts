import { makeAutoObservable, runInAction } from "mobx";

export interface JobRoles {
  id: string;
  jobName: string;
  jobDescriptions: any;
}

class JobRoleStore {
  jobRoles: JobRoles[] = [];
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

  async fetchJobRoles() {
    this.loading = true;
    this.error = null;

    try {
      const cached = this.getCookie("jobRoles");

      if (cached) {
        runInAction(() => {
          this.jobRoles = JSON.parse(cached);
          this.loading = false;
        });
        return;
      }
      const response = await fetch("/api/jobRoles");

      if (!response.ok) {
        throw new Error(`Failed to fetch job roles (${response.status})`);
      }

      const data = await response.json();

      runInAction(() => {
        this.jobRoles = data;
        this.loading = false;
      });
    } catch (err) {
      runInAction(() => {
        this.error =
          err instanceof Error ? err : new Error("Failed to load job roles");
        this.jobRoles = [];
        this.loading = false;
      });
    }
  }

  reset() {
    this.jobRoles = [];
    this.loading = false;
    this.error = null;
  }
}

export const jobRoleStore = new JobRoleStore();
