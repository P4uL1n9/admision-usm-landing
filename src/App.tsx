import ScrollToTop from "@/components/ScrollToTop";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BecasBeneficiosEstatales from "./pages/BecasBeneficiosEstatales";
import Carreras from "./pages/Carreras";
import CareerDetail from "./pages/CareerDetail";
import ComparadorCarreras from "./pages/ComparadorCarreras";
import Postgrados from "./pages/Postgrados";
import PostgradoDetail from "./pages/PostgradoDetail";
import ArancelesMatricula from "./pages/ArancelesMatricula";
import Financiamiento from "./pages/Financiamiento";
import ViasAdmision from "./pages/ViasAdmision";
import Informaciones from "./pages/Informaciones";
import ViasAdmisionDetail from "./pages/ViasAdmisionDetail";
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
          <Route path="/informaciones/comparar-carreras" element={<ComparadorCarreras />} />
          <Route path="/financiamiento/becas-beneficios-estatales" element={<BecasBeneficiosEstatales />} />
          <Route path="/postgrados" element={<Postgrados />} />
          <Route path="/postgrados/:id" element={<PostgradoDetail />} />
          <Route path="/financiamiento/aranceles" element={<ArancelesMatricula />} />
          <Route path="/financiamiento" element={<Financiamiento />} />
          <Route path="/vias-admision" element={<ViasAdmision />} />
          <Route path="/vias-admision/:id" element={<ViasAdmisionDetail />} />
          <Route path="/informaciones" element={<Informaciones />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
