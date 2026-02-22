import { Location } from "@/interface/locations";
import { makeAutoObservable, runInAction } from "mobx";

class LocationStore {
  locations: Location[] = [];
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  getCookie(name: string): string | null {
    if (typeof document === "undefined") return null;

    const match = document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="));

    return match ? decodeURIComponent(match.split("=")[1]) : null;
  }
  async fetchLocations() {
    this.loading = true;
    this.error = null;
    try {
      const cached = this.getCookie("locations");

      if (cached) {
        runInAction(() => {
          this.locations = JSON.parse(cached);
          this.loading = false;
        });
        return;
      }
      const response = await fetch("/api/location");
      if (!response.ok) {
        throw new Error("Failed to fetch locations");
      }
      const data = await response.json();
      this.locations = data;
    } catch (err) {
      this.error =
        err instanceof Error ? err.message : "Failed to load locations";
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
