import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import Home from "@/pages/home";
import Jobs from "@/pages/jobs";
import NotFound from "@/pages/not-found";
import { industryStore, locationStore } from "@/stores";

const RouterWithLoader = observer(function RouterWithLoader() {

  useEffect(() => {
      if (industryStore.industries.length === 0) {
        industryStore.fetchIndustries();
      }
      if (locationStore.locations.length === 0) {
        locationStore.fetchLocations();
      }
  }, []);

  return (
    <>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/jobs" component={Jobs} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <RouterWithLoader />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;