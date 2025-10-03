import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import heroImage from "@/assets/hero-students.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center pt-24 md:pt-28">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
          <h1 className="text-[clamp(2rem,5vw,3.75rem)] leading-[1.15] font-bold text-white mb-4 md:mb-6 animate-fade-in text-balance">
            Tu futuro comienza en la USM
          </h1>
          <p className="text-[clamp(1.25rem,2.2vw,1.5rem)] text-white/90 animate-slide-up text-balance">
            Descubre la carrera que transformará tu vida
          </p>
        </div>

        {/* Search Box */}
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-usm-lg p-6 md:p-8 animate-slide-up">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">
            Busca tu carrera
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Área de estudio
              </label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona un área" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ingenieria">Ingeniería</SelectItem>
                  <SelectItem value="ciencias">Ciencias</SelectItem>
                  <SelectItem value="arquitectura">Arquitectura</SelectItem>
                  <SelectItem value="tecnologia">Tecnología</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Sede
              </label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona una sede" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="valparaiso">Valparaíso</SelectItem>
                  <SelectItem value="sanjoaquin">San Joaquín</SelectItem>
                  <SelectItem value="viña">Viña del Mar</SelectItem>
                  <SelectItem value="concepcion">Concepción</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Puntaje mínimo
              </label>
              <Input 
                type="number" 
                placeholder="Ej: 600"
                className="w-full"
              />
            </div>
          </div>

          <Button 
            size="lg" 
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-lg h-14"
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
