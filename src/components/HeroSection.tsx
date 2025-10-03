import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import heroImage from "@/assets/hero-students.jpg";

const HeroSection = () => {
  const [area, setArea] = useState("all");
  const [sede, setSede] = useState("all");
  const navigate = useNavigate();

  const handleSearch = () => {
    // Construir query params
    const params = new URLSearchParams();
    if (area !== "all") params.set("area", area);
    if (sede !== "all") params.set("sede", sede);

    navigate(`/carreras?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center pt-24 md:pt-28">
      {/* Fondo */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Contenido */}
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-usm-lg p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">Busca tu carrera</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Área de estudio</label>
              <Select value={area} onValueChange={setArea}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona un área" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las áreas</SelectItem>
                  <SelectItem value="Ingeniería">Ingeniería</SelectItem>
                  <SelectItem value="Ciencias">Ciencias</SelectItem>
                  <SelectItem value="Arquitectura y Diseño">Arquitectura y Diseño</SelectItem>
                  <SelectItem value="Negocios">Negocios</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Sede</label>
              <Select value={sede} onValueChange={setSede}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona una sede" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las sedes</SelectItem>
                  <SelectItem value="Valparaíso">Casa Central Valparaíso</SelectItem>
                  <SelectItem value="Santiago">Santiago San Joaquín</SelectItem>
                  <SelectItem value="Viña del Mar">Viña del Mar</SelectItem>
                  <SelectItem value="Concepción">Campus Concepción</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            size="lg" 
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-lg h-14"
            onClick={handleSearch}
          >
            <Search className="mr-2 h-5 w-5" />
            Buscar Carreras
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
