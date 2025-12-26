import { Client } from "@/interface/clients";
import { makeAutoObservable, runInAction } from "mobx";

class ClientStore {
  clients: Client[] = [];
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async createClient(payload: Client) {
    this.loading = true;
    this.error = null;

    try {
      const response = await fetch("/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData?.error || "Failed to create client");
      }

      const result = await response.json();

      return result;
    } catch (err) {
      runInAction(() => {
        this.error =
          err instanceof Error ? err.message : "Failed to create client";
      });
      throw err;
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  reset() {
    this.clients = [];
    this.loading = false;
    this.error = null;
  }
}

export const clientStore = new ClientStore();
