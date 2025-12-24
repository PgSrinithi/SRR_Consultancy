import { makeAutoObservable } from 'mobx';

export interface Location {
  id: string;
  name: string;
  [key: string]: any;
}

class LocationStore {
  locations: Location[] = [];
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchLocations() {
    this.loading = true;
    this.error = null;
    try {
      const response = await fetch('/api/location');
      if (!response.ok) {
        throw new Error('Failed to fetch locations');
      }
      const data = await response.json();
      this.locations = data;
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Failed to load locations';
      this.locations = [];
    } finally {
      this.loading = false;
    }
  }

  reset() {
    this.locations = [];
    this.loading = false;
    this.error = null;
  }
}

export const locationStore = new LocationStore();
