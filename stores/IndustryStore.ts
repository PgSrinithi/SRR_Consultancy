import { makeAutoObservable, runInAction } from "mobx";

export interface Industry {
  id: string;
  name: string;
  [key: string]: any;
}

class IndustryStore {
  industries: Industry[] = [];
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

  async fetchIndustries() {
    this.loading = true;
    this.error = null;

    try {
      const cached = this.getCookie("industries");

      if (cached) {
        runInAction(() => {
          this.industries = JSON.parse(cached);
          this.loading = false;
        });
        return;
      }

      const response = await fetch("/api/industry");

      if (!response.ok) {
        throw new Error(`Failed to fetch industries (${response.status})`);
      }

      const data = await response.json();

      runInAction(() => {
        this.industries = data;
        this.loading = false;
      });
    } catch (err) {
      runInAction(() => {
        this.error =
          err instanceof Error ? err : new Error("Failed to load industries");
        this.industries = [];
        this.loading = false;
      });
    }
  }

  reset() {
    this.industries = [];
    this.loading = false;
    this.error = null;
  }
}

export const industryStore = new IndustryStore();
