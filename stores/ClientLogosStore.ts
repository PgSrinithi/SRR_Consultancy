import { makeAutoObservable, runInAction } from "mobx";

export interface ClientLogo {
  id: string;
  name: string;
  isActive: boolean;
  image: string;
}

class ClientLogosStore {
  clientLogos: ClientLogo[] = [];
  loading = false;
  error: Error | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async fetchClientLogos() {
    this.loading = true;
    this.error = null;

    try {
      const response = await fetch("/api/clientLogos");

      if (!response.ok) {
        throw new Error(`Failed to fetch client logos (${response.status})`);
      }

      const data = await response.json();

      runInAction(() => {
        this.clientLogos = data;
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error =
          error instanceof Error ? error : new Error("Unknown error");
        this.loading = false;
      });
    }
  }
}

export const clientLogosStore = new ClientLogosStore();
