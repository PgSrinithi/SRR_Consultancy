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

  async fetchIndustries() {
    this.loading = true;
    this.error = null;

    try {
      const response = await fetch("/api/industry", {
        cache: "no-store", 
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch industries (${response.status})`);
      }

      const data = await response.json();

      runInAction(() => {
        this.industries = data;
        this.loading = false;
      });

      console.log("Fetched Industries:", data);
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
