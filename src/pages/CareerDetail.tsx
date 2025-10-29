import { useParams, Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, TrendingUp, Clock, BookOpen, FileText } from "lucide-react";
import carrerasRaw from "@/assets/carreras_usm.json";

const mallasImportadas = import.meta.glob("@/assets/mallas/*", {
  eager: true,
  query: "?url",
  import: "default",
});

type CarreraDetalle = {
  id: string;
  name: string;
  description: string;
  area: string;
  campus: string;
  duration: string;
  minScore: number;
  pondNEM: string;
  pondRanking: string;
  pondMatematica: string;
  pondLenguaje: string;
  pondCiencias: string;
  perfil: string;
  campoLaboral: string;
  requirements: string[];
  mallaImage: string;
  mallaPDF: string;
};

const CareerDetail = () => {
  const { id } = useParams<{ id: string }>();

  // 1. Buscar la carrera cruda en el JSON por id
  const rawCareer = id
    ? (Object.values(carrerasRaw) as any[]).find((c) => c.id === id)
    : null;

  // 2. Si no existe, mostramos “Carrera no encontrada”
  if (!rawCareer) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Carrera no encontrada</h1>
            <Link to="/carreras">
              <Button>Volver a Carreras</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // 3. Transformar los datos crudos en el shape que usa la vista
  //    - campus: unimos las sedes con salto de línea
  const campusList = rawCareer.campus
    .map((sede: any) => sede.campus)
    .join(" / ");

  //    - ponderaciones: del objeto -> campos sueltos
  const pond = rawCareer.ponderaciones || {};
  const pondNEM = pond.NEM || "-";
  const pondRanking = pond.Ranking || "-";
  const pondMatematica = pond.M1 || "-"; // M1 es matemática obligatoria
  const pondLenguaje = pond.Lectora || "-"; // 'Lectora' = comprensión lectora / lenguaje
  const pondCiencias = pond.Ciencias_o_Historia || "-";

  const findMallaImageUrl = (fileName: string | undefined): string | undefined => {
    if (!fileName) return undefined;
    // buscamos una key que termine en ese nombre
    const entry = Object.entries(mallasImportadas).find(([fullPath]) =>
      fullPath.endsWith(fileName)
    );
    return entry ? entry[1] as string : undefined;
  };

  //    - usar los campos nuevos del JSON (campoLaboral, requirements, malla...)
  const career: CarreraDetalle = {
    id: rawCareer.id,
    name: rawCareer.name,
    description: rawCareer.description,
    area: rawCareer.area,
    campus: campusList,
    duration: rawCareer.duration,
    minScore: rawCareer.minScore,
    pondNEM,
    pondRanking,
    pondMatematica,
    pondLenguaje,
    pondCiencias,
    perfil: rawCareer.perfil || "Profesional con formación científica y tecnológica orientada a la resolución de problemas reales.",
    campoLaboral: rawCareer.campoLaboral || "Desarrollo profesional en sectores públicos y privados relacionados con el área de la carrera.",
    requirements: rawCareer.requirements || [
      "Puntaje mínimo de postulación según admisión vigente",
      "Cumplir requisitos establecidos por el proceso de admisión",
    ],
    mallaImage: findMallaImageUrl(rawCareer.mallaImage) ?? "/fallback-malla.png",
    mallaPDF: rawCareer.mallaPDF || "/mallas/placeholder.pdf",
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-hero pt-24 md:pt-28 pb-12 md:pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <Link to="/carreras" className="inline-flex items-center gap-2 text-white hover:text-accent mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Volver a Carreras
          </Link>
          
          <div className="flex flex-wrap gap-3 mb-4">
            <Badge className="bg-accent text-accent-foreground">{career.area}</Badge>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-md text-white">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{career.campus}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-md text-white">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{career.duration}</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {career.name}
          </h1>
          <p className="text-white/90 text-lg max-w-3xl">
            {career.description}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-grow py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Perfil Profesional */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Perfil Profesional
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{career.perfil}</p>
                </CardContent>
              </Card>

              {/* Campo Laboral */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Campo Laboral
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{career.campoLaboral}</p>
                </CardContent>
              </Card>

              {/* Malla Curricular */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Malla Curricular
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Consulta el plan de estudios completo de la carrera:
                  </p>
                  <img 
                    src={career.mallaImage} 
                    alt="Malla curricular" 
                    className="w-full rounded-lg border shadow-sm mb-4"
                  />
                  {/* <Button variant="outline" className="w-full">
                    Descargar Malla Curricular (PDF)
                  </Button> */}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Admissions Info */}
            <div className="space-y-6">
              {/* Puntajes y Ponderaciones */}
              <Card className="bg-primary text-primary-foreground">
                <CardHeader>
                  <CardTitle>Admisión</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm opacity-90 mb-1">Puntaje Mínimo</p>
                    <p className="text-3xl font-bold">{career.minScore} pts</p>
                  </div>
                  
                  <div className="border-t border-white/20 pt-4">
                    <p className="font-semibold mb-3">Ponderaciones:</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="opacity-90">NEM</span>
                        <span className="font-semibold">{career.pondNEM}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="opacity-90">Ranking</span>
                        <span className="font-semibold">{career.pondRanking}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="opacity-90">Matemática</span>
                        <span className="font-semibold">{career.pondMatematica}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="opacity-90">Lenguaje</span>
                        <span className="font-semibold">{career.pondLenguaje}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="opacity-90">Ciencias</span>
                        <span className="font-semibold">{career.pondCiencias}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Requisitos */}
              <Card>
                <CardHeader>
                  <CardTitle>Requisitos</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {career.requirements.map((req: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span className="text-sm text-muted-foreground">{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* CTA */}
              <Link to="/aranceles">
                <Button 
                  size="lg" 
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold shadow-usm-md mt-4"
                >
                  Aranceles
                </Button>
              </Link>

              <Link to="/becas-beneficios-estatales">
                <Button 
                  size="lg" 
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold shadow-usm-md mt-4"
                >
                  Becas y Beneficios
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CareerDetail;
