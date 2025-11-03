import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, MapPin, Clock, TrendingUp, DollarSign, Info } from "lucide-react";
import { Link } from "react-router-dom";
import carrerasRaw from "@/assets/carreras_usm.json";
import Breadcrumbs from "@/components/Breadcrumbs";
import GeneralHero from "@/components/GeneralHero";
import imagenHero from "@/assets/fotos/admision3.jpeg";

type CareerLite = {
  id: string;
  name: string;
  campus: string;
  duration: string;
  minScore: string | number;
  arancel: string;
  ponderacionesArr: string[]; // <— ahora guardamos arreglo de líneas
};

const careers: CareerLite[] = Object.values(carrerasRaw).map((c: any) => {
  const campusList = c.campus.map((sede: any) => sede.campus).join(" / ");

  const firstArancel = c.campus[0]?.arancelCLP ?? 0;
  const arancelCLP = Number(firstArancel).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  // Construye arreglo (no string con ;)
  const ponderacionesArr = [
    c.ponderaciones?.NEM ? `NEM ${c.ponderaciones.NEM}` : null,
    c.ponderaciones?.Ranking ? `Ranking ${c.ponderaciones.Ranking}` : null,
    c.ponderaciones?.M1 ? `M1 ${c.ponderaciones.M1}` : null,
    c.ponderaciones?.M2 ? `M2 ${c.ponderaciones.M2}` : null,
    c.ponderaciones?.Lectora ? `Lectora ${c.ponderaciones.Lectora}` : null,
    c.ponderaciones?.Ciencias_o_Historia
      ? `Ciencias/Historia ${c.ponderaciones.Ciencias_o_Historia}`
      : null,
  ].filter(Boolean) as string[];

  return {
    id: c.id,
    name: c.name,
    campus: campusList,
    duration: c.duration,
    minScore: c.minScore ?? "Consultar",
    arancel: arancelCLP,
    ponderacionesArr: ponderacionesArr.length ? ponderacionesArr : ["Consultar en admisión"],
  };
});

const formatMinScore = (v: string | number) =>
  typeof v === "number" ? `${v} pts` : v?.toString().toLowerCase() === "consultar" ? "Consultar" : String(v);

const ComparadorCarreras = () => {
  const [career1Id, setCareer1Id] = useState<string>("");
  const [career2Id, setCareer2Id] = useState<string>("");
  const [showComparison, setShowComparison] = useState(false);

  const selectedCareer1 = careers.find((c) => c.id === career1Id);
  const selectedCareer2 = careers.find((c) => c.id === career2Id);

  const handleCompare = () => {
    if (career1Id && career2Id) {
      setShowComparison(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <GeneralHero titulo="Comparar carreras" imagen={imagenHero} />

      <Breadcrumbs />

      {/* Intro / descripción del comparador */}
      <section className="pt-6 pb-2 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="rounded-xl border bg-white p-4 md:p-5">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-primary mt-0.5" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                Selecciona dos carreras y compáralas por <strong>sedes</strong>, <strong>duración</strong>,{" "}
                <strong>puntaje mínimo</strong>, <strong>ponderaciones</strong> y <strong>arancel anual</strong>.
                Esta herramienta es referencial y puede variar según la admisión vigente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Controles de comparación */}
      <section className="py-6 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-card rounded-xl shadow-usm-md p-5 md:p-7 border">
            <h2 className="text-xl font-bold mb-5 text-foreground">Selecciona dos carreras</h2>

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
                      .filter((c) => c.id !== career2Id)
                      .map((career) => (
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
                      .filter((c) => c.id !== career1Id)
                      .map((career) => (
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
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold h-12"
            >
              Comparar
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Resultados */}
      {showComparison && selectedCareer1 && selectedCareer2 && (
        <section className="py-12 bg-muted/30" aria-live="polite">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl font-bold mb-2 text-foreground text-center">
              Resultados de la comparación
            </h2>

            {/* Breve explicación de ponderaciones */}
            <p className="text-sm text-muted-foreground text-center max-w-3xl mx-auto mb-8">
              Las <strong>ponderaciones</strong> corresponden a los porcentajes que se aplican a tus puntajes
              (NEM, Ranking, PAES, etc.) para calcular el <em>Puntaje Ponderado de Postulación (PPP)</em>.
            </p>

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
                      <td className="px-6 py-4 text-sm text-muted-foreground">{selectedCareer1.duration}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{selectedCareer2.duration}</td>
                    </tr>

                    <tr className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-foreground flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        Puntaje Mínimo
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        <span className="font-semibold text-primary">{formatMinScore(selectedCareer1.minScore)}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        <span className="font-semibold text-primary">{formatMinScore(selectedCareer2.minScore)}</span>
                      </td>
                    </tr>

                    {/* Ponderaciones como lista */}
                    <tr className="hover:bg-muted/50 transition-colors align-top">
                      <td className="px-6 py-4 text-sm font-medium text-foreground">
                        Ponderaciones
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        <ul className="list-disc pl-5 space-y-1">
                          {selectedCareer1.ponderacionesArr.map((p, i) => (
                            <li key={i}>{p}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        <ul className="list-disc pl-5 space-y-1">
                          {selectedCareer2.ponderacionesArr.map((p, i) => (
                            <li key={i}>{p}</li>
                          ))}
                        </ul>
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
                      <td className="px-6 py-4 text-sm font-medium text-foreground">Acciones</td>
                      <td className="px-6 py-4">
                        <Link to={`/carreras/${selectedCareer1.id}`}>
                          <Button variant="outline" size="sm">Ver detalle</Button>
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <Link to={`/carreras/${selectedCareer2.id}`}>
                          <Button variant="outline" size="sm">Ver detalle</Button>
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-6">
              {/* Career 1 */}
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
                      <p className="text-sm font-semibold text-primary">
                        {formatMinScore(selectedCareer1.minScore)}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">Ponderaciones</p>
                    <ul className="list-disc pl-5 space-y-1 text-xs text-muted-foreground">
                      {selectedCareer1.ponderacionesArr.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-start gap-3">
                    <DollarSign className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Costos</p>
                      <p className="text-sm text-muted-foreground">
                        Arancel: <span className="font-semibold">{selectedCareer1.arancel}</span>
                      </p>
                    </div>
                  </div>
                  <Link to={`/carreras/${selectedCareer1.id}`} className="block">
                    <Button variant="outline" className="w-full">Ver detalle completo</Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Career 2 */}
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
                      <p className="text-sm font-semibold text-primary">
                        {formatMinScore(selectedCareer2.minScore)}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">Ponderaciones</p>
                    <ul className="list-disc pl-5 space-y-1 text-xs text-muted-foreground">
                      {selectedCareer2.ponderacionesArr.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-start gap-3">
                    <DollarSign className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Costos</p>
                      <p className="text-sm text-muted-foreground">
                        Arancel: <span className="font-semibold">{selectedCareer2.arancel}</span>
                      </p>
                    </div>
                  </div>
                  <Link to={`/carreras/${selectedCareer2.id}`} className="block">
                    <Button variant="outline" className="w-full">Ver detalle completo</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* CTA todas las carreras */}
            <div className="text-center mt-12">
              <Link to="/carreras">
                <Button variant="outline" size="lg">Ver todas las carreras</Button>
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