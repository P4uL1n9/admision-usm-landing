import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import carrerasRaw from "@/assets/carreras_postgrado.json";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Breadcrumbs from "@/components/Breadcrumbs";
import GeneralHero from "@/components/GeneralHero";
import imagenHero from "@/assets/fotos/admision1.webp";

const careers = Object.values(carrerasRaw).map((c: any) => ({
  id: c.id,
  name: c.name,
  description: c.description,
  tipo: c.tipoPostgrado,                        
  campus: Array.isArray(c.campus) ? c.campus : [],
}));

const Postgrados = () => {
  const [searchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [tempSede, setTempSede] = useState("todas");
  const [tempTipo, setTempTipo] = useState("todas");
  const [selectedSede, setSelectedSede] = useState("todas");
  const [selectedTipo, setSelectedTipo] = useState("todas");
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");

  useEffect(() => {
    const sede = searchParams.get("sede");
    const tipo = searchParams.get("tipo");
    if (sede) { setSelectedSede(sede); setTempSede(sede); }
    if (tipo) { setSelectedTipo(tipo); setTempTipo(tipo); }
  }, [searchParams]);

  const handleSearch = () => {
    setCurrentSearchTerm(searchTerm);
    setSelectedSede(tempSede);
    setSelectedTipo(tempTipo);
  };

  const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const filteredCareers = careers.filter((career) => {
    const matchesSearch = normalize(career.name).includes(normalize(currentSearchTerm));
    const matchesSede = selectedSede === "todas" || career.campus.includes(selectedSede);
    const matchesTipo = selectedTipo === "todas" || career.tipo === selectedTipo;
    return matchesSearch && matchesSede && matchesTipo;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <GeneralHero titulo="Postgrados" imagen={imagenHero} />

      <Breadcrumbs />

      {/* Search & Filters */}
      <section className="bg-background py-6 border-b">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Buscar postgrado..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="pl-10"
                />
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-white" onClick={handleSearch}>
                Buscar
              </Button>
            </div>

            <Collapsible className="w-full">
              <CollapsibleTrigger className="group flex items-center gap-2 text-primary hover:text-primary/90 font-medium cursor-pointer">
                Filtros avanzados
                <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                  <Select value={tempSede} onValueChange={setTempSede}>
                    <SelectTrigger className="w-full text-primary">
                      <SelectValue placeholder="Sede" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas" className="text-primary">Todas las sedes</SelectItem>
                      <SelectItem value="Casa Central Valparaíso" className="text-primary">Casa Central Valparaíso</SelectItem>
                      <SelectItem value="Santiago San Joaquín" className="text-primary">Campus Santiago San Joaquín</SelectItem>
                      <SelectItem value="Santiago Vitacura" className="text-primary">Campus Santiago Vitacura</SelectItem>
                      <SelectItem value="Viña del Mar">Campus Viña del Mar</SelectItem>
                      <SelectItem value="Concepción">Campus Concepción</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={tempTipo} onValueChange={setTempTipo}>
                    <SelectTrigger className="w-full text-primary">
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas" className="text-primary">Todos los postgrados</SelectItem>
                      <SelectItem value="Doctorado" className="text-primary">Doctorado</SelectItem>
                      <SelectItem value="Magíster" className="text-primary">Magíster</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </section>

      {/* Listado */}
      <section className="flex-grow py-16 bg-muted/30 border-t">
        <div className="container mx-auto px-4 max-w-6xl">
          {filteredCareers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No se encontraron postgrados con los filtros seleccionados.
              </p>
            </div>
          ) : (
            <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr className="border-b">
                      <th className="text-left p-4 font-semibold w-[35%]">Programa</th>
                      <th className="text-left p-4 font-semibold hidden md:table-cell w-[20%]">Tipo de postgrado</th>
                      <th className="text-left p-4 font-semibold hidden lg:table-cell w-[30%]">Sede</th>
                      <th className="text-right p-4 font-semibold w-[15%]">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCareers.map((career) => (
                      <tr key={career.id} className="border-b hover:bg-muted/30 transition-colors">
                        {/* Programa */}
                        <td className="p-4">
                          <div className="font-semibold text-foreground">{career.name}</div>
                        </td>

                        {/* Tipo de postgrado */}
                        <td className="p-4 hidden md:table-cell">
                          {career.tipo ? (
                            <Badge className="bg-primary/10 text-primary border-primary/20">
                              {career.tipo}
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>

                        {/* Sede(s) */}
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

                        {/* Acción */}
                        <td className="p-4 text-right">
                          <Link to={`/postgrados/${career.id}`}>
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

export default Postgrados;