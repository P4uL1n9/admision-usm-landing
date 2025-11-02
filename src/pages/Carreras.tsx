import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import carrerasRaw from "@/assets/carreras_usm.json";

const careers = Object.values(carrerasRaw).map((c: any) => ({
  id: c.id,
  name: c.name,
  description: c.description,
  minScore: c.minScore ?? null,
  campus: c.campus.map((s: any) => s.campus).join(" / "),
  area: c.area,
  tipo: c.regimen || (c.regimenes ? c.regimenes.join(", ") : "")
}));

const Carreras = () => {
  const [searchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState("todas");
  const [selectedSede, setSelectedSede] = useState("todas");
  const [selectedRegimen, setSelectedRegimen] = useState("todas");

  useEffect(() => {
    const area = searchParams.get("area");
    const sede = searchParams.get("sede");
    const regimen = searchParams.get("regimen");

    if (area) setSelectedArea(area);
    if (sede) setSelectedSede(sede);
    if (regimen) setSelectedSede(regimen);
  }, [searchParams]);

  const filteredCareers = careers.filter(career => {
    const matchesSearch = career.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArea = selectedArea === "todas" || career.area === selectedArea;
    const matchesSede = selectedSede === "todas" || career.campus.includes(selectedSede);
    const matchesRegimen = selectedRegimen === "todas" || career.tipo === selectedRegimen;
    
    return matchesSearch && matchesArea && matchesSede && matchesRegimen;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-hero pt-24 md:pt-28 pb-16 md:pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] leading-[1.15] font-bold text-white text-center mb-4 text-balance">
            Carreras USM
          </h1>
          <p className="text-[clamp(1rem,2.2vw,1.25rem)] text-white/90 text-center max-w-2xl mx-auto text-balance">
            Explora nuestra oferta académica y encuentra la carrera que transformará tu futuro
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="bg-background py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Buscar carrera..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedArea} onValueChange={setSelectedArea}>
              <SelectTrigger>
                <SelectValue placeholder="Área" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas las áreas</SelectItem>
                <SelectItem value="Ingeniería">Ingeniería</SelectItem>
                <SelectItem value="Arquitectura y Diseño">Arquitectura y Diseño</SelectItem>
                <SelectItem value="Negocios">Negocios</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedSede} onValueChange={setSelectedSede}>
              <SelectTrigger>
                <SelectValue placeholder="Sede" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas las sedes</SelectItem>
                <SelectItem value="Valparaíso">Casa Central Valparaíso</SelectItem>
                <SelectItem value="Santiago">Santiago San Joaquín</SelectItem>
                <SelectItem value="Vitacura">Santiago Vitacura</SelectItem>
                {/* <SelectItem value="Concepción">Campus Concepción</SelectItem> */}
              </SelectContent>
            </Select>

            <Select value={selectedRegimen} onValueChange={setSelectedRegimen}>
              <SelectTrigger>
                <SelectValue placeholder="Regimen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todos los horarios</SelectItem>
                <SelectItem value="Diurno">Diurno</SelectItem>
                <SelectItem value="Vespertino">Vespertino</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <p className="text-sm text-muted-foreground mt-4">
            Mostrando {filteredCareers.length} {filteredCareers.length === 1 ? 'carrera' : 'carreras'}
          </p>
        </div>
      </section>

      {/* Career List */}
      <section className="flex-grow py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          {filteredCareers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No se encontraron carreras con los filtros seleccionados.
              </p>
            </div>
          ) : (
            <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr className="border-b">
                      <th className="text-left p-4 font-semibold">Carrera</th>
                      <th className="text-left p-4 font-semibold hidden md:table-cell">Área</th>
                      <th className="text-left p-4 font-semibold hidden lg:table-cell">Sede</th>
                      <th className="text-center p-4 font-semibold hidden sm:table-cell">Puntaje</th>
                      <th className="text-right p-4 font-semibold">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCareers.map(career => (
                      <tr key={career.id} className="border-b hover:bg-muted/30 transition-colors">
                        <td className="p-4">
                          <div className="font-semibold text-foreground">{career.name}</div>
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{career.description}</p>
                        </td>
                        <td className="p-4 hidden md:table-cell">
                          <Badge className="bg-primary/10 text-primary border-primary/20">{career.area}</Badge>
                        </td>
                        <td className="p-4 hidden lg:table-cell">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 flex-shrink-0" />
                            <span className="line-clamp-2">{career.campus}</span>
                          </div>
                        </td>
                        <td className="p-4 text-center hidden sm:table-cell">
                          {career.minScore ? (
                            <div className="flex items-center justify-center gap-1 text-sm font-semibold text-primary">
                              <TrendingUp className="h-4 w-4" />
                              <span>{career.minScore}</span>
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">-</span>
                          )}
                        </td>
                        <td className="p-4 text-right">
                          <Link to={`/carreras/${career.id}`}>
                            <Button size="sm" className="bg-primary hover:bg-primary/90">
                              Ver detalles
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Carreras;
