import { makeAutoObservable } from 'mobx';

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
    makeAutoObservable(this);
  }

  async fetchIndustries() {
    this.loading = true;
    this.error = null;
    try {
      const response = await fetch('/api/industry');
      if (!response.ok) {
        throw new Error('Failed to fetch industries');
      }
      const data = await response.json();
      this.industries = data;
    } catch (err) {
      this.error = err instanceof Error ? err : new Error('Failed to load industries');
      this.industries = [];
    } finally {
      this.loading = false;
    }
  }

  reset() {
    this.industries = [];
    this.loading = false;
    this.error = null;
  }
}

export const industryStore = new IndustryStore();
