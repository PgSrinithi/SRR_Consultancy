"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { queryClient } from "@/lib/queryClient";
import { observer } from "mobx-react-lite";
import {
  industryStore,
  locationStore,
  jobRoleStore,
  jobPostingStore,
} from "@/stores";
import { useEffect, useState } from "react";

const StoreInitializer = observer(function StoreInitializer() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (!mounted) return;

    if (industryStore.industries.length === 0) {
      industryStore.fetchIndustries();
    }
    if (locationStore.locations.length === 0) {
      locationStore.fetchLocations();
    }
    if (jobRoleStore.jobRoles.length === 0) {
      jobRoleStore.fetchJobRoles();
    }
    if (jobPostingStore.jobPostings.length === 0) {
      jobPostingStore.fetchJobPostings();
    }
  }, [mounted]);

  return null;
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <StoreInitializer />
        <Toaster />
        {children}
      </TooltipProvider>
    </QueryClientProvider>
  );
}
