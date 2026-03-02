import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Dashboard from "./pages/Dashboard";
import HistoricalAnalysis from "./pages/HistoricalAnalysis";
import Forecasts from "./pages/Forecasts";
import CBAMSimulator from "./pages/CBAMSimulator";
import RiskSectors from "./pages/RiskSectors";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analyse" element={<HistoricalAnalysis />} />
            <Route path="/previsions" element={<Forecasts />} />
            <Route path="/cbam" element={<CBAMSimulator />} />
            <Route path="/secteurs" element={<RiskSectors />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
