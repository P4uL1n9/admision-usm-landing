import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, MapPin, Clock, TrendingUp, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data - same as Carreras page
const careers = [
  {
    id: "ing-civil-informatica",
    name: "Ingeniería Civil Informática",
    campus: "Casa Central Valparaíso",
    duration: "5 años (10 semestres)",
    minScore: 650,
    arancel: "$4.286.000",
    matricula: "$186.000",
    ponderaciones: "NEM 20% • Ranking 20% • Matemática 30% • Lenguaje 20% • Ciencias 10%"
  },
  {
    id: "ing-civil-industrial",
    name: "Ingeniería Civil Industrial",
    campus: "Casa Central Valparaíso",
    duration: "5 años (10 semestres)",
    minScore: 640,
    arancel: "$4.286.000",
    matricula: "$186.000",
    ponderaciones: "NEM 20% • Ranking 20% • Matemática 30% • Lenguaje 20% • Ciencias 10%"
  },
  {
    id: "ing-civil-electronica",
    name: "Ingeniería Civil Electrónica",
    campus: "Casa Central Valparaíso",
    duration: "5 años (10 semestres)",
    minScore: 630,
    arancel: "$4.286.000",
    matricula: "$186.000",
    ponderaciones: "NEM 20% • Ranking 20% • Matemática 30% • Lenguaje 20% • Ciencias 10%"
  },
  {
    id: "arquitectura",
    name: "Arquitectura",
    campus: "Casa Central Valparaíso",
    duration: "6 años (12 semestres)",
    minScore: 620,
    arancel: "$4.100.000",
    matricula: "$186.000",
    ponderaciones: "NEM 25% • Ranking 20% • Matemática 25% • Lenguaje 25% • Ciencias 5%"
  },
  {
    id: "ing-civil-mecanica",
    name: "Ingeniería Civil Mecánica",
    campus: "Casa Central Valparaíso",
    duration: "5 años (10 semestres)",
    minScore: 625,
    arancel: "$4.286.000",
    matricula: "$186.000",
    ponderaciones: "NEM 20% • Ranking 20% • Matemática 30% • Lenguaje 20% • Ciencias 10%"
  },
  {
    id: "ing-comercial",
    name: "Ingeniería Comercial",
    campus: "Santiago San Joaquín",
    duration: "5 años (10 semestres)",
    minScore: 610,
    arancel: "$3.950.000",
    matricula: "$186.000",
    ponderaciones: "NEM 25% • Ranking 20% • Matemática 25% • Lenguaje 25% • Ciencias 5%"
  },
  {
    id: "ing-telematica",
    name: "Ingeniería en Telemática",
    campus: "Casa Central Valparaíso",
    duration: "5 años (10 semestres)",
    minScore: 620,
    arancel: "$4.286.000",
    matricula: "$186.000",
    ponderaciones: "NEM 20% • Ranking 20% • Matemática 30% • Lenguaje 20% • Ciencias 10%"
  }
];

const ComparadorCarreras = () => {
  const [career1Id, setCareer1Id] = useState<string>("");
  const [career2Id, setCareer2Id] = useState<string>("");
  const [showComparison, setShowComparison] = useState(false);

  const selectedCareer1 = careers.find(c => c.id === career1Id);
  const selectedCareer2 = careers.find(c => c.id === career2Id);

  const handleCompare = () => {
    if (career1Id && career2Id) {
      setShowComparison(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-hero pt-24 md:pt-28 pb-16 md:pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] leading-[1.15] font-bold text-white mb-4 text-balance">
            Compara carreras
          </h1>
          <p className="text-[clamp(1rem,2.2vw,1.25rem)] text-white/90 max-w-2xl text-balance">
            Encuentra la mejor opción comparando características, puntajes y costos de las carreras que te interesan
          </p>
        </div>
      </section>

      {/* Comparison Controls */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-card rounded-xl shadow-usm-md p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              Selecciona dos carreras para comparar
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Primera Carrera */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Primera carrera
                </label>
                <Select value={career1Id} onValueChange={setCareer1Id}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona una carrera" />
                  </SelectTrigger>
                  <SelectContent>
                    {careers
                      .filter(c => c.id !== career2Id)
                      .map(career => (
                        <SelectItem key={career.id} value={career.id}>
                          {career.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Segunda Carrera */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Segunda carrera
                </label>
                <Select value={career2Id} onValueChange={setCareer2Id}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona una carrera" />
                  </SelectTrigger>
                  <SelectContent>
                    {careers
                      .filter(c => c.id !== career1Id)
                      .map(career => (
                        <SelectItem key={career.id} value={career.id}>
                          {career.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={handleCompare}
              disabled={!career1Id || !career2Id}
              size="lg"
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold"
            >
              Comparar carreras
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            {!career1Id || !career2Id ? (
              <p className="text-sm text-muted-foreground text-center mt-4" role="status" aria-live="polite">
                Selecciona dos carreras para comenzar la comparación
              </p>
            ) : null}
          </div>
        </div>
      </section>

      {/* Comparison Results */}
      {showComparison && selectedCareer1 && selectedCareer2 && (
        <section className="py-12 bg-muted/30" aria-live="polite">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl font-bold mb-8 text-foreground text-center">
              Resultados de la comparación
            </h2>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <div className="bg-card rounded-xl shadow-usm-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-primary/10">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        Característica
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        {selectedCareer1.name}
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        {selectedCareer2.name}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-foreground flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        Sede
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {selectedCareer1.campus}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {selectedCareer2.campus}
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-foreground flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        Duración
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {selectedCareer1.duration}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {selectedCareer2.duration}
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-foreground flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        Puntaje Mínimo
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        <span className="font-semibold text-primary">{selectedCareer1.minScore} pts</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        <span className="font-semibold text-primary">{selectedCareer2.minScore} pts</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-foreground">
                        Ponderaciones
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {selectedCareer1.ponderaciones}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {selectedCareer2.ponderaciones}
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-foreground flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-primary" />
                        Arancel Anual
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        <span className="font-semibold">{selectedCareer1.arancel}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        <span className="font-semibold">{selectedCareer2.arancel}</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-foreground">
                        Matrícula
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {selectedCareer1.matricula}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {selectedCareer2.matricula}
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-foreground">
                        Acciones
                      </td>
                      <td className="px-6 py-4">
                        <Link to={`/carreras/${selectedCareer1.id}`}>
                          <Button variant="outline" size="sm">
                            Ver detalle
                          </Button>
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <Link to={`/carreras/${selectedCareer2.id}`}>
                          <Button variant="outline" size="sm">
                            Ver detalle
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-6">
              {/* Career 1 Card */}
              <Card className="shadow-usm-md">
                <CardHeader className="bg-primary/10">
                  <CardTitle className="text-lg">{selectedCareer1.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Sede</p>
                      <p className="text-sm text-muted-foreground">{selectedCareer1.campus}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Duración</p>
                      <p className="text-sm text-muted-foreground">{selectedCareer1.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Puntaje Mínimo</p>
                      <p className="text-sm font-semibold text-primary">{selectedCareer1.minScore} pts</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">Ponderaciones</p>
                    <p className="text-xs text-muted-foreground">{selectedCareer1.ponderaciones}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <DollarSign className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Costos</p>
                      <p className="text-sm text-muted-foreground">
                        Arancel: <span className="font-semibold">{selectedCareer1.arancel}</span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Matrícula: {selectedCareer1.matricula}
                      </p>
                    </div>
                  </div>
                  <Link to={`/carreras/${selectedCareer1.id}`} className="block">
                    <Button variant="outline" className="w-full">
                      Ver detalle completo
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Career 2 Card */}
              <Card className="shadow-usm-md">
                <CardHeader className="bg-primary/10">
                  <CardTitle className="text-lg">{selectedCareer2.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Sede</p>
                      <p className="text-sm text-muted-foreground">{selectedCareer2.campus}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Duración</p>
                      <p className="text-sm text-muted-foreground">{selectedCareer2.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Puntaje Mínimo</p>
                      <p className="text-sm font-semibold text-primary">{selectedCareer2.minScore} pts</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">Ponderaciones</p>
                    <p className="text-xs text-muted-foreground">{selectedCareer2.ponderaciones}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <DollarSign className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Costos</p>
                      <p className="text-sm text-muted-foreground">
                        Arancel: <span className="font-semibold">{selectedCareer2.arancel}</span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Matrícula: {selectedCareer2.matricula}
                      </p>
                    </div>
                  </div>
                  <Link to={`/carreras/${selectedCareer2.id}`} className="block">
                    <Button variant="outline" className="w-full">
                      Ver detalle completo
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* CTA to All Careers */}
            <div className="text-center mt-12">
              <Link to="/carreras">
                <Button variant="outline" size="lg">
                  Ver todas las carreras
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default ComparadorCarreras;
