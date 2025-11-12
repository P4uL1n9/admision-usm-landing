import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Clock, BookOpen, DollarSign, Hash, GraduationCap, Calendar } from "lucide-react";
import carrerasRaw from "@/assets/carreras_usm.json";
import Breadcrumbs from "@/components/Breadcrumbs";

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
  tituloProfesional: string;
  campoLaboral: string;
  requirements: string[];
  mallaImage: string;
  mallaPDF: string;
};

const CareerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const backState = (location.state || {}) as {
    from?: string; q?: string; area?: string; sede?: string; regimen?: string;
  };

  const rawCareer = id
    ? (Object.values(carrerasRaw) as any[]).find((c) => c.id === id)
    : null;

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

  const campusList = rawCareer.campus.map((s: any) => s.campus).join(" / ");
  const campusArray = rawCareer.campus.map((s: any) => s.campus);

  const pond = rawCareer.ponderaciones || {};
  const pondNEM = pond.NEM || "-";
  const pondRanking = pond.Ranking || "-";
  const pondMatematica = pond.M1 || "-";
  const pondLenguaje = pond.Lectora || "-";
  const pondCiencias = pond.Ciencias_o_Historia || "-";

  const findMallaImageUrl = (fileName: string | undefined): string | undefined => {
    if (!fileName) return undefined;
    const entry = Object.entries(mallasImportadas).find(([fullPath]) => fullPath.endsWith(fileName));
    return entry ? (entry[1] as string) : undefined;
  };

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
    tituloProfesional:
      rawCareer.tituloProfesional ||
      "Profesional con formación científica y tecnológica orientada a la resolución de problemas reales.",
    campoLaboral:
      rawCareer.campoLaboral ||
      "Desarrollo profesional en sectores públicos y privados relacionados con el área de la carrera.",
    requirements:
      rawCareer.requirements || [
        "Puntaje mínimo de postulación según admisión vigente",
        "Cumplir requisitos establecidos por el proceso de admisión",
      ],
    mallaImage: findMallaImageUrl(rawCareer.mallaImage) ?? "/fallback-malla.png",
    mallaPDF: rawCareer.mallaPDF || "/mallas/placeholder.pdf",
  };

  const firstCampus = rawCareer.campus?.[0] ?? null;
  const arancelFormatted = firstCampus?.arancelCLP
    ? firstCampus.arancelCLP.toLocaleString("es-CL", { style: "currency", currency: "CLP", minimumFractionDigits: 0, maximumFractionDigits: 0 })
    : "Consultar";
  const codigoDemre = firstCampus?.codigoDemre ?? "-";
  const gradoAcademico = rawCareer.gradoAcademico ?? "-";
  const regimenDisplay =
    rawCareer.regimenes?.length ? rawCareer.regimenes.join(" / ") : (rawCareer.regimen ?? "-");

  // 🔙 Construye href de retorno con filtros (si vienen en state). Si no, usa historial o /carreras.
  const buildBackHref = () => {
    if (backState?.from === "/carreras") {
      const params = new URLSearchParams();
      if (backState.area) params.set("area", backState.area);
      if (backState.sede) params.set("sede", backState.sede);
      if (backState.regimen) params.set("regimen", backState.regimen);
      if (backState.q) params.set("q", backState.q); // texto buscado
      const qs = params.toString();
      return `/carreras${qs ? `?${qs}` : ""}`;
    }
    return null;
  };
  const backHref = buildBackHref();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-hero pt-24 md:pt-24 pb-16 md:pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Botón VOLVER (estilizado + conserva filtros) */}
          <div className="mb-6">
            <Button
              variant="outline"
              className="group inline-flex items-center gap-2 rounded-full border-white/30 bg-white/10
                         text-white px-4 py-2 backdrop-blur-sm shadow-sm hover:bg-white/20 hover:text-white
                         focus-visible:ring-2 focus-visible:ring-white/40 transition-all"
              onClick={() => {
                if (backHref) {
                  navigate(backHref);
                } else if (window.history.length > 1) {
                  navigate(-1);
                } else {
                  navigate("/carreras");
                }
              }}
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              <span className="font-semibold">Volver</span>
            </Button>
          </div>

          <div className="flex flex-wrap gap-3 mb-4">
            <Badge className="bg-accent text-accent-foreground">{career.area}</Badge>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-md text-white">
                <MapPin className="h-4 w-4" />
                <div className="flex flex-wrap gap-2">
                  {career && campusArray.map((sede: string, idx: number) => (
                    <span key={idx} className="text-sm bg-white/5 px-2 py-0.5 rounded-md">{sede}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-block h-8 md:h-9 w-1.5 rounded-full bg-accent" />
            <h1 className="text-white font-bold text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] drop-shadow-[0_3px_10px_rgba(0,0,0,0.55)]">
              {career.name}
            </h1>
          </div>
        </div>
      </section>

      <Breadcrumbs />

      {/* Main Content */}
      <section className="flex-grow py-6 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column */}
            <div className="w-full lg:flex-1 space-y-6">
              <Card>
                <CardHeader><CardTitle className="flex items-center gap-2">Descripción</CardTitle></CardHeader>
                <CardContent><p className="font-medium text-base text-justify">{career.description}</p></CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="flex items-center gap-2">Detalles de la carrera</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-5 w-5 text-primary mt-1" />
                      <div><span className="text-base font-medium font-semibold">Título profesional:</span>
                        <span className="ml-2 text-base font-medium text-foreground">{career.tituloProfesional}</span></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <GraduationCap className="h-5 w-5 text-primary mt-1" />
                      <div><span className="text-base font-medium font-semibold">Grado académico:</span>
                        <span className="ml-2 text-base font-medium text-foreground">{gradoAcademico}</span></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-primary mt-1" />
                      <div><span className="text-base font-medium font-semibold">Régimen:</span>
                        <span className="ml-2 text-base font-medium text-foreground">{regimenDisplay}</span></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-primary mt-1" />
                      <div><span className="text-base font-medium font-semibold">Duración:</span>
                        <span className="ml-2 text-base font-medium text-foreground">{career.duration}</span></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <DollarSign className="h-5 w-5 text-primary mt-1" />
                      <div><span className="text-base font-medium font-semibold">Arancel:</span>
                        <span className="ml-2 text-base font-medium text-foreground">{arancelFormatted}</span></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Hash className="h-5 w-5 text-primary" />
                      <div><span className="text-base font-medium font-semibold">Código DEMRE:</span>
                        <span className="ml-2 text-base font-medium text-foreground">{codigoDemre}</span></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="w-full lg:w-[360px] space-y-6">
              <Card className="bg-primary text-primary-foreground">
                <CardHeader><CardTitle>Admisión</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm opacity-90 mb-1">Puntaje Mínimo</p>
                    <p className="text-3xl font-bold">{career.minScore} pts</p>
                  </div>
                  <div className="border-t border-white/20 pt-4">
                    <p className="font-semibold mb-3">Ponderaciones:</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="opacity-90">NEM</span><span className="font-semibold">{career.pondNEM}</span></div>
                      <div className="flex justify-between"><span className="opacity-90">Ranking</span><span className="font-semibold">{career.pondRanking}</span></div>
                      <div className="flex justify-between"><span className="opacity-90">Matemática</span><span className="font-semibold">{career.pondMatematica}</span></div>
                      <div className="flex justify-between"><span className="opacity-90">Lenguaje</span><span className="font-semibold">{career.pondLenguaje}</span></div>
                      <div className="flex justify-between"><span className="opacity-90">Ciencias</span><span className="font-semibold">{career.pondCiencias}</span></div>
                    </div>
                  </div>
                  <div className="pt-4">
                    <Link to="/financiamiento/becas-beneficios-estatales">
                      <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold">Ver becas disponibles</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Malla Curricular */}
          <Card className="mt-6">
            <CardHeader><CardTitle className="flex items-center gap-2">Malla Curricular</CardTitle></CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 text-black">Consulta el plan de estudios completo de la carrera:</p>
              <img src={career.mallaImage} alt="Malla curricular" className="w-full rounded-lg border shadow-sm mb-4 object-contain" />
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CareerDetail;
