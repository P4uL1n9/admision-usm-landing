import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import carrerasRaw from "@/assets/carreras_usm.json";


const CareerComparator = () => {
  const [career1, setCareer1] = useState("");
  const [career2, setCareer2] = useState("");

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
      duration: c.duration,
      campus: campusList,
      score: c.minScore,
      tuition: tuitionCLP
    };
  });

  const selectedCareer1 = careers.find(c => c.id === career1);
  const selectedCareer2 = careers.find(c => c.id === career2);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Compara carreras
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Selecciona dos carreras para comparar sus características principales
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Primera carrera
              </label>
              <Select value={career1} onValueChange={setCareer1}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona una carrera" />
                </SelectTrigger>
                <SelectContent>
                  {careers.map((career) => (
                    <SelectItem key={career.id} value={career.id}>
                      {career.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Segunda carrera
              </label>
              <Select value={career2} onValueChange={setCareer2}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona una carrera" />
                </SelectTrigger>
                <SelectContent>
                  {careers.map((career) => (
                    <SelectItem key={career.id} value={career.id}>
                      {career.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedCareer1 && selectedCareer2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
              <Card className="border-2 border-primary">
                <CardHeader className="bg-primary text-white">
                  <CardTitle className="text-xl">{selectedCareer1.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between py-3 border-b">
                      <span className="font-medium">Duración:</span>
                      <span className="text-muted-foreground">{selectedCareer1.duration}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b">
                      <span className="font-medium">Sede:</span>
                      <span className="text-muted-foreground">{selectedCareer1.campus}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b">
                      <span className="font-medium">Puntaje ponderado:</span>
                      <span className="text-muted-foreground">{selectedCareer1.score}</span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="font-medium">Arancel anual:</span>
                      <span className="text-primary font-bold">{selectedCareer1.tuition}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-secondary">
                <CardHeader className="bg-secondary text-white">
                  <CardTitle className="text-xl">{selectedCareer2.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between py-3 border-b">
                      <span className="font-medium">Duración:</span>
                      <span className="text-muted-foreground">{selectedCareer2.duration}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b">
                      <span className="font-medium">Sede:</span>
                      <span className="text-muted-foreground">{selectedCareer2.campus}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b">
                      <span className="font-medium">Puntaje ponderado:</span>
                      <span className="text-muted-foreground">{selectedCareer2.score}</span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="font-medium">Arancel anual:</span>
                      <span className="text-secondary font-bold">{selectedCareer2.tuition}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* CTA to Full Comparison */}
          <div className="text-center mt-8">
            <Link to="/comparar-carreras">
              <Button variant="outline" size="lg">
                <ArrowRight className="mr-2 h-5 w-5" />
                Ir a comparación completa
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerComparator;
