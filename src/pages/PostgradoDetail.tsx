import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, BookOpen, GraduationCap, Calendar, Layers } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";

import postgradosRaw from "@/assets/carreras_postgrado.json";

const mallasImportadas = import.meta.glob("@/assets/mallasPostgrado/*", {
  eager: true,
  query: "?url",
  import: "default",
});


type Postgrado = {
  id: string;
  name: string;
  description?: string;
  areasEspecializacion?: string[];
  gradoAcademico?: string;
  duration?: string;
  regimen?: string;
  regimenes?: string[];
  modalidad?: string;
  tipoPostgrado?: string;
  campus?: string[];          // array de sedes
  requirements?: string[];    // requisitos
  mallaImage?: string;        // nombre de archivo (png/jpg/etc)
};

const findMallaImageUrl = (fileName?: string): string | undefined => {
  if (!fileName) return undefined;
  const entry = Object.entries(mallasImportadas).find(([fullPath]) =>
    fullPath.endsWith(fileName)
  );
  return entry ? (entry[1] as string) : undefined;
};

const PostgradoDetail = () => {
  const { id } = useParams<{ id: string }>();

  // 1) Buscar el programa en el JSON de postgrados
  const raw: Postgrado | undefined = id
    ? (Object.values(postgradosRaw) as Postgrado[]).find((c) => c.id === id)
    : undefined;

  if (!raw) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Programa no encontrado</h1>
            <Link to="/postgrados" className="underline text-primary">
              Volver a Postgrados
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // 2) Campos derivados/cotejados
  const regimenDisplay =
    raw.regimenes && raw.regimenes.length > 0
      ? raw.regimenes.join(" / ")
      : raw.regimen || "—";

  const campusArray = Array.isArray(raw.campus) ? raw.campus : [];
  const areas = Array.isArray(raw.areasEspecializacion) ? raw.areasEspecializacion : [];
  const requisitos = Array.isArray(raw.requirements) ? raw.requirements : [];

  const mallaUrl = findMallaImageUrl(raw.mallaImage) ?? "/fallback-malla.png";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* HERO con línea amarilla a la izquierda, esquina inferior izquierda */}
      <section className="relative bg-gradient-hero pt-24 md:pt-24 pb-16 md:pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-wrap gap-3 mb-4">
            {raw.tipoPostgrado && (
              <Badge className="bg-accent text-accent-foreground">
                {raw.tipoPostgrado}
              </Badge>
            )}

            {/* Campus como chips */}
            {campusArray.length > 0 && (
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-md text-white">
                <MapPin className="h-4 w-4" />
                <div className="flex flex-wrap gap-2">
                  {campusArray.map((sede, idx) => (
                    <span
                      key={idx}
                      className="text-sm bg-white/5 px-2 py-0.5 rounded-md"
                    >
                      {sede}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-block h-8 md:h-9 w-1.5 rounded-full bg-accent" />
            <h1 className="text-white font-bold text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] drop-shadow-[0_3px_10px_rgba(0,0,0,0.55)]">
              {raw.name}
            </h1>
          </div>
        </div>
      </section>

      <Breadcrumbs />

      {/* CONTENIDO */}
      <section className="flex-grow py-6 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* COLUMNA IZQUIERDA */}
            <div className="w-full lg:flex-1 space-y-6">
              {/* Descripción */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Descripción
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium text-base text-justify whitespace-pre-line">
                    {raw.description || "Próximamente."}
                  </p>
                </CardContent>
              </Card>

              {/* Áreas de especialización (si existen) */}
              {areas.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      Áreas de especialización
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="flex flex-col gap-2">
                        {areas.map((a, i) => (
                            <li key={i} className="flex items-start gap-2">
                            <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" />
                            <span className="text-sm leading-relaxed">{a}</span>
                            </li>
                        ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Requisitos (si existen) */}
              {requisitos.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      Requisitos de postulación
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {requisitos.map((r, i) => (
                        <li key={i} className="flex gap-3 text-sm">
                          <span className="inline-block h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center mt-0.5">
                            •
                          </span>
                          <span className="leading-relaxed whitespace-pre-line">{r}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Malla Curricular */}
                <Card className="mt-6">
                    <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        Plan de estudios
                    </CardTitle>
                    </CardHeader>
                    <CardContent>
                    <p className="text-muted-foreground mb-4">
                        Revisa el plan de estudios del programa:
                    </p>
                    <img
                        src={mallaUrl}
                        alt="Malla curricular"
                        className="w-full rounded-lg border shadow-sm mb-2 object-contain"
                    />
                    </CardContent>
                </Card>
            </div>

            {/* COLUMNA DERECHA - Detalles */}
            <div className="w-full lg:w-[360px] space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Detalles del programa</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <GraduationCap className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground">Grado académico</p>
                      <p className="font-medium">{raw.gradoAcademico || "—"}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <BookOpen className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground">Tipo de postgrado</p>
                      <p className="font-medium">{raw.tipoPostgrado || "—"}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground">Régimen</p>
                      <p className="font-medium">{regimenDisplay}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Layers className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground">Modalidad</p>
                      <p className="font-medium">{raw.modalidad || "—"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-primary flex-shrink-0 self-start mt-[2px]" />
                    <div className="flex-1">
                        <p className="text-sm text-muted-foreground leading-tight">Duración</p>
                        <p className="font-medium leading-snug">{raw.duration || "—"}</p>
                    </div>
                  </div>

                  {campusArray.length > 0 && (
                    <div className="pt-2">
                      <p className="text-sm text-muted-foreground mb-2">Campus</p>
                      <div className="flex flex-wrap gap-2">
                        {campusArray.map((s, i) => (
                          <Badge key={i} variant="outline">
                            {s}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PostgradoDetail;
