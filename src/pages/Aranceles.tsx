import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ArrowUpDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import carrerasRaw from "@/assets/carreras_usm.json";

interface Career {
  id: string;
  name: string;
  arancel: number;
  matricula: number;
  slug: string;
}

const careers = Object.values(carrerasRaw).map(c => {
    // tomar todos los campus (Casa Central Valparaíso / San Joaquín / Vitacura...)
    const campusList = c.campus.map(sede => sede.campus).join(" / ");

    // tomar el arancel anual (si hay varios campus con distinto arancel, por ahora usamos el primero)
    const firstArancel = c.campus[0]?.arancelCLP ?? 0;

    const tuitionCLP = firstArancel.toLocaleString("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    return {
      id: c.id,
      name: c.name,
      campus: campusList,
      arancel: tuitionCLP
    };
});

const careersData: Career[] = [
  {
    id: "1",
    name: "Ingeniería Civil Informática",
    arancel: 6500000,
    matricula: 180000,
    slug: "ingenieria-civil-informatica"
  },
  {
    id: "2",
    name: "Ingeniería en Telemática",
    arancel: 6200000,
    matricula: 180000,
    slug: "ingenieria-telematica"
  },
  {
    id: "3",
    name: "Ingeniería Civil Industrial",
    arancel: 6800000,
    matricula: 180000,
    slug: "ingenieria-civil-industrial"
  },
  {
    id: "4",
    name: "Arquitectura",
    arancel: 7200000,
    matricula: 180000,
    slug: "arquitectura"
  }
];

const Aranceles = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "arancel-asc" | "arancel-desc">("name");

  const filteredAndSortedCareers = useMemo(() => {
    let filtered = careers.filter(career =>
      career.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortBy) {
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "arancel-asc":
        filtered.sort((a, b) => {
          const aValue = parseInt(a.arancel.replace(/[^0-9]/g, ""));
          const bValue = parseInt(b.arancel.replace(/[^0-9]/g, ""));
          return aValue - bValue;
        });
        break;
      case "arancel-desc":
        filtered.sort((a, b) => {
          const aValue = parseInt(a.arancel.replace(/[^0-9]/g, ""));
          const bValue = parseInt(b.arancel.replace(/[^0-9]/g, ""));
          return bValue - aValue;
        });
        break;
    }

    return filtered;
  }, [searchTerm, sortBy]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-hero pt-24 md:pt-28 pb-16 md:pb-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <h1 className="text-[clamp(2rem,5vw,3.5rem)] leading-[1.15] font-bold text-white text-center mb-4 text-balanc">
              Aranceles y Matrículas
            </h1>
            <p className="text-[clamp(1rem,2.2vw,1.25rem)] text-white/90 text-center max-w-2xl mx-auto text-balance">
              Consulta el valor anual y la matrícula de cada carrera
            </p>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1 w-full">
                <label className="text-sm font-medium mb-2 block">Buscar carrera</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Ej: Ingeniería Civil Informática"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-full md:w-64">
                <label className="text-sm font-medium mb-2 block">Ordenar por</label>
                <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Nombre (A-Z)</SelectItem>
                    <SelectItem value="arancel-asc">Arancel (menor a mayor)</SelectItem>
                    <SelectItem value="arancel-desc">Arancel (mayor a menor)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Desktop Table View */}
        <section className="py-12 hidden md:block">
          <div className="container mx-auto px-4">
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-primary/10 hover:bg-primary/10">
                    <TableHead className="font-semibold text-foreground">Carrera</TableHead>
                    <TableHead className="font-semibold text-foreground text-right">Arancel Anual</TableHead>
                    <TableHead className="font-semibold text-foreground text-right">Campus</TableHead>
                    <TableHead className="font-semibold text-foreground text-center">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedCareers.map((career) => (
                    <TableRow 
                      key={career.id}
                      className="hover:bg-muted/50 transition-colors"
                    >
                      <TableCell className="font-medium">{career.name}</TableCell>
                      <TableCell className="text-right">{career.arancel}</TableCell>
                      <TableCell className="text-right">{career.campus}</TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/carreras/${career.id}`)}
                        >
                          Ver detalles
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="mt-6 p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Nota:</strong> Aranceles de referencia. Valores sujetos a cambios según políticas institucionales. 
                Consulta con la oficina de admisión para información actualizada.
              </p>
            </div>
          </div>
        </section>

        {/* Mobile Card View */}
        <section className="py-12 md:hidden">
          <div className="container mx-auto px-4">
            <div className="space-y-4">
              {filteredAndSortedCareers.map((career) => (
                <Card 
                  key={career.id} 
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{career.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Arancel Anual</p>
                        <p className="font-semibold text-primary">{career.arancel}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Campus</p>
                        <p className="font-semibold text-primary">{career.campus}</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => navigate(`/carreras/${career.id}`)}
                    >
                      Ver detalles
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Nota:</strong> Aranceles de referencia. Valores sujetos a cambios según políticas institucionales.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Aranceles;
