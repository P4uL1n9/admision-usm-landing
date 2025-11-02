import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, TrendingUp, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import carrerasRaw from "@/assets/carreras_usm.json";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Breadcrumbs from "@/components/Breadcrumbs";

const careers = Object.values(carrerasRaw).map((c: any) => ({
  id: c.id,
  name: c.name,
  description: c.description,
  minScore: c.minScore ?? null,
  campus: c.campus.map((s: any) => s.campus),
  area: c.area,
  tipo: c.regimen || (c.regimenes ? c.regimenes.join(", ") : "")
}));

const Carreras = () => {
  const [searchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [tempArea, setTempArea] = useState("todas");
  const [tempSede, setTempSede] = useState("todas");
  const [tempRegimen, setTempRegimen] = useState("todas");
  const [selectedArea, setSelectedArea] = useState("todas");
  const [selectedSede, setSelectedSede] = useState("todas");
  const [selectedRegimen, setSelectedRegimen] = useState("todas");
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");

  useEffect(() => {
    const area = searchParams.get("area");
    const sede = searchParams.get("sede");
    const regimen = searchParams.get("regimen");

    if (area) {
      setSelectedArea(area);
      setTempArea(area);
    }
    if (sede) {
      setSelectedSede(sede);
      setTempSede(sede);
    }
    if (regimen) {
      setSelectedRegimen(regimen);
      setTempRegimen(regimen);
    }
  }, [searchParams]);

  const handleSearch = () => {
    setCurrentSearchTerm(searchTerm);
    setSelectedArea(tempArea);
    setSelectedSede(tempSede);
    setSelectedRegimen(tempRegimen);
  };

  const filteredCareers = careers.filter(career => {
    const matchesSearch = career.name.toLowerCase().includes(currentSearchTerm.toLowerCase());
    const matchesArea = selectedArea === "todas" || career.area === selectedArea;
    const matchesSede = selectedSede === "todas" || career.campus.some(campus => campus === selectedSede);
    const matchesRegimen = selectedRegimen === "todas" || career.tipo === selectedRegimen;
    
    return matchesSearch && matchesArea && matchesSede && matchesRegimen;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[320px] md:h-[360px] lg:h-[380px] overflow-hidden">
         <img
            src="/src/assets/heroimg/admision1.webp"
            alt="Fondo Carreras USM"
            className="absolute inset-0 w-full h-full object-cover object-[center_70%]"
          />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 container mx-auto px-6 h-full flex items-end max-w-6xl">
          <div className="mb-10 animate-fade-in">
            <div className="flex items-center gap-3">
              {/* Línea amarilla */}
              <span className="inline-block h-8 md:h-9 w-1.5 rounded-full bg-accent" />
              <h1 className="text-white font-bold text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] drop-shadow-[0_3px_10px_rgba(0,0,0,0.55)]">
                Carreras de pregrado
              </h1>
            </div>
          </div>
        </div>
      </section>

      <Breadcrumbs />
      {/* Search and Filters */}
      <section className="bg-background py-6 border-b">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Buscar carrera..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-10"
                />
              </div>
              <Button 
                variant="default" 
                className="bg-primary hover:bg-primary/90 text-white"
                onClick={handleSearch}
              >
                Buscar
              </Button>
            </div>

            <Collapsible className="w-full">
              <CollapsibleTrigger className="group flex items-center gap-2 text-primary hover:text-primary/90 font-medium cursor-pointer">
                Filtros avanzados
                <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
                  <Select value={tempArea} onValueChange={setTempArea}>
                    <SelectTrigger className="w-full text-primary">
                      <SelectValue placeholder="Área" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas" className="text-primary">Todas las áreas</SelectItem>
                      <SelectItem value="Ingeniería" className="text-primary">Ingeniería</SelectItem>
                      <SelectItem value="Ingeniería y Diseño" className="text-primary">Ingeniería y Diseño</SelectItem>
                      <SelectItem value="Arquitectura y Diseño" className="text-primary">Arquitectura y Diseño</SelectItem>
                      <SelectItem value="Negocios" className="text-primary">Negocios</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={tempSede} onValueChange={setTempSede}>
                    <SelectTrigger className="w-full text-primary">
                      <SelectValue placeholder="Sede" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas" className="text-primary">Todas las sedes</SelectItem>
                      <SelectItem value="Valparaíso" className="text-primary">Casa Central Valparaíso</SelectItem>
                      <SelectItem value="Santiago" className="text-primary">Campus Santiago San Joaquín</SelectItem>
                      <SelectItem value="Vitacura" className="text-primary">Campus Santiago Vitacura</SelectItem>
                      <SelectItem value="Viña">Campus Viña del Mar</SelectItem>
                      <SelectItem value="Concepción">Campus Concepción</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={tempRegimen} onValueChange={setTempRegimen}>
                    <SelectTrigger className="w-full text-primary">
                      <SelectValue placeholder="Regimen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas" className="text-primary">Todos los regímenes</SelectItem>
                      <SelectItem value="Diurno" className="text-primary">Diurno</SelectItem>
                      <SelectItem value="Vespertino" className="text-primary">Vespertino</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </section>

      {/* Career List */}
      <section className="flex-grow py-16 bg-muted/30 border-t">
        <div className="container mx-auto px-4 max-w-6xl">
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
                      <th className="text-left p-4 font-semibold w-[35%]">Carrera</th>
                      <th className="text-left p-4 font-semibold hidden md:table-cell w-[20%]">Área</th>
                      <th className="text-left p-4 font-semibold hidden lg:table-cell w-[30%]">Sede</th>
                      <th className="text-right p-4 font-semibold w-[15%]">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCareers.map(career => (
                      <tr key={career.id} className="border-b hover:bg-muted/30 transition-colors">
                        <td className="p-4">
                          <div className="font-semibold text-foreground">{career.name}</div>
                        </td>
                        <td className="p-4 hidden md:table-cell">
                          <Badge className="bg-primary/10 text-primary border-primary/20">{career.area}</Badge>
                        </td>
                        <td className="p-4 hidden lg:table-cell">
                          <div className="flex flex-col gap-1">
                            {career.campus.map((campus: string, index: number) => (
                              <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4 flex-shrink-0" />
                                <span>{campus}</span>
                              </div>
                            ))}
                          </div>
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
