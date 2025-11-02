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
    <section className="relative min-h-[500px] md:min-h-[550px] flex items-center justify-center pt-24 md:pt-28 pb-12">
      {/* Fondo */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Contenido */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-[clamp(2.5rem,6vw,4rem)] leading-[1.1] font-bold text-white mb-4">
              Encuentra tu carrera en la USM
            </h1>
            <p className="text-[clamp(1.1rem,2.5vw,1.4rem)] text-white/90 max-w-2xl mx-auto">
              Explora nuestra oferta académica y toma la mejor decisión para tu futuro
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-usm-lg p-5 md:p-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Área de estudio</label>
                <Select value={area} onValueChange={setArea}>
                  <SelectTrigger className="w-full h-11">
                    <SelectValue placeholder="Selecciona un área" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las áreas</SelectItem>
                    <SelectItem value="Ingeniería">Ingeniería</SelectItem>
                    <SelectItem value="Arquitectura y Diseño">Arquitectura y Diseño</SelectItem>
                    <SelectItem value="Negocios">Negocios</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Sede</label>
                <Select value={sede} onValueChange={setSede}>
                  <SelectTrigger className="w-full h-11">
                    <SelectValue placeholder="Selecciona una sede" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las sedes</SelectItem>
                    <SelectItem value="Valparaíso">Casa Central Valparaíso</SelectItem>
                    <SelectItem value="Santiago">Santiago San Joaquín</SelectItem>
                    <SelectItem value="Vitacura">Santiago Vitacura</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              size="lg" 
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base h-12"
              onClick={handleSearch}
            >
              <Search className="mr-2 h-5 w-5" />
              Buscar Carreras
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
