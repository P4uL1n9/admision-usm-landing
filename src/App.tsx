import ScrollToTop from "@/components/ScrollToTop";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BecasYCostos from "./pages/BecasYCostos";
import BecasBeneficiosEstatales from "./pages/BecasBeneficiosEstatales";
import Carreras from "./pages/Carreras";
import CareerDetail from "./pages/CareerDetail";
import ComparadorCarreras from "./pages/ComparadorCarreras";
import Aranceles from "./pages/Aranceles";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/carreras" element={<Carreras />} />
          <Route path="/carreras/:id" element={<CareerDetail />} />
          <Route path="/comparar-carreras" element={<ComparadorCarreras />} />
          <Route path="/becas-y-costos" element={<BecasYCostos />} />
          <Route path="/becas-beneficios-estatales" element={<BecasBeneficiosEstatales />} />
          <Route path="/aranceles" element={<Aranceles />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
