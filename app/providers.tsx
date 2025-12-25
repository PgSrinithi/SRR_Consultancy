"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { queryClient } from "@/lib/queryClient";
import { observer } from "mobx-react-lite";
import { industryStore, locationStore } from "@/stores";
import { useEffect } from "react";

const StoreInitializer = observer(function StoreInitializer() {
  useEffect(() => {
    if (industryStore.industries.length === 0) {
      industryStore.fetchIndustries();
    }
    if (locationStore.locations.length === 0) {
      locationStore.fetchLocations();
    }
  }, []);

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
