import { useMemo } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import viasDataRaw from "@/assets/vias_admision.json";
import { Info, ListChecks, FileText, ArrowLeft } from "lucide-react";

// --- Dataset adicional para Postgrado (editable si lo mueves a un JSON) ---
const viasPostData = [
  {
    id: "magister-regular",
    via: "Admisión Magíster (Regular)",
    descripcion:
      "Postulación dirigida a quienes posean un grado de Licenciado o título profesional equivalente. Requiere antecedentes académicos, carta de motivación y referencias personales o académicas.",
    requisitos: {
      "Título o grado requerido": [
        "Grado de Licenciado o título profesional equivalente.",
      ],
      "Documentos obligatorios": [
        "Carta de motivación.",
        "Dos cartas de recomendación.",
        "Certificado de notas y título.",
        "Currículum vitae actualizado.",
      ],
    },
  },
  {
    id: "doctorado-regular",
    via: "Admisión Doctorado (Regular)",
    descripcion:
      "Para candidatos/as con grado de Magíster o Licenciatura equivalente y fuerte orientación hacia la investigación. Se requiere entrevista y proyecto tentativo.",
    requisitos: {
      "Título o grado requerido": [
        "Magíster o Licenciatura equivalente.",
      ],
      "Documentos obligatorios": [
        "Currículum vitae.",
        "Carta de motivación.",
        "Propuesta de investigación.",
        "Cartas de recomendación académica.",
      ],
    },
  },
  {
    id: "postgrado-internacional",
    via: "Postulación Internacional",
    descripcion:
      "Dirigida a postulantes extranjeros/as que deseen cursar programas de Magíster o Doctorado. Se solicita validación de grados y documentos apostillados.",
    requisitos: {
      "Requisitos adicionales": [
        "Acreditar dominio de idioma español o inglés.",
        "Documentación legalizada o apostillada.",
        "Equivalencia de grados académicos según país.",
      ],
    },
  },
  {
    id: "continuidad-estudios",
    via: "Continuidad de estudios",
    descripcion:
      "Dirigida a egresados/as USM u otras instituciones que buscan continuidad académica desde programas afines.",
    requisitos: {
      "Requisitos": [
        "Certificado de egreso o título anterior.",
        "Promedio ponderado superior a 5.0.",
        "Carta de motivación.",
      ],
    },
  },
  {
    id: "convenios-dobles-titulaciones",
    via: "Convenios / Doble Titulación",
    descripcion:
      "Postulaciones mediante convenios interinstitucionales o programas de doble titulación vigentes con universidades asociadas.",
    requisitos: {
      "Requisitos": [
        "Pertenecer a institución con convenio vigente.",
        "Cumplir requisitos específicos del convenio.",
        "Carta de motivación y respaldo de la institución de origen."
      ],
      "Documentos obligatorios": [
        "Certificado de alumno regular o de título según aplique.",
        "Historial de notas.",
        "Carta de patrocinio/aval de la institución."
      ]
    }
  },
  {
    id: "especial-antecedentes-sobresalientes",
    via: "Vía Especial (Antecedentes sobresalientes)",
    descripcion:
      "Postulación excepcional basada en méritos académicos y/o productivos (publicaciones, proyectos, premios), evaluada por comité del programa.",
    requisitos: {
      "Requisitos": [
        "Antecedentes de excelencia (publicaciones, premios, investigación).",
        "Carta de motivación focalizada en aporte al programa.",
        "Cartas de recomendación académica."
      ],
      "Evaluación": [
        "Revisión por comité académico del programa.",
        "Entrevista (si corresponde)."
      ]
    }
  },
];

type Via = {
  id: string;
  via: string;
  descripcion?: string;
  requisitos?: Record<string, any> | null;
  detalleAdicional?: Record<string, any> | null;
};

// --- Utilidades ---
const asArray = (value: any): any[] => {
  if (!value && value !== 0) return [];
  return Array.isArray(value) ? value : [value];
};

const LABELS: Record<string, string> = {
  puntajePromedio: "Puntaje promedio",
  pruebaM2: "Prueba M2",
  pruebasOptativas: "Pruebas optativas",
  egresadoEnsenanzaMedia: "Egresado de Enseñanza Media",
  postulacion: "Postulación",
  NEM: "NEM",
  documentacion: "Documentación",
  vacantesYPuntajes: "Vacantes y puntajes de corte",
  programaInclusion: "Programa de inclusión",
  primerAñoMerito: "Becas de mérito (primer año)",
};

const objectEntriesPretty = (obj?: Record<string, any> | null) => {
  if (!obj || typeof obj !== "object") return [];
  return Object.entries(obj).map(([key, value]) => {
    const label =
      LABELS[key] ??
      key.replace(/([A-Z])/g, " $1").replace(/\b\w/g, (m) => m.toUpperCase());
    return [label, value] as [string, any];
  });
};

const ViasAdmisionDetail = () => {
  const params = useParams<{ id: string }>();
  const location = useLocation();

  // Detectar si la ruta actual es de postgrado
  const isPostgrado = useMemo(
    () => viasPostData.some(v => v.id === params.id),
    [params.id]
  );

  // Dataset según tipo
  const viasData: Via[] = useMemo(() => {
    if (isPostgrado) return viasPostData;
    const raw = (viasDataRaw as any)?.default ?? (viasDataRaw as any);
    return Array.isArray(raw)
      ? (raw as Via[])
      : (Object.values(raw ?? {}) as Via[]);
  }, [isPostgrado]);

  const via = useMemo(
    () => viasData.find((v) => v.id === params.id),
    [viasData, params.id]
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-hero text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="flex items-center gap-3 mb-2">
            <Link
              to={isPostgrado ? "/vias-admision" : "/vias-admision"}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition"
            >
              <ArrowLeft className="h-4 w-4" /> Volver a{" "}
              {isPostgrado ? "vías de postgrado" : "vías de admisión"}
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-block h-8 md:h-7 w-1.5 rounded-full bg-accent" />
            <h1 className="font-bold text-[clamp(1.4rem,3vw,3rem)] leading-tight">
              {via ? via.via : "Vía de admisión no encontrada"}
            </h1>
          </div>
        </div>
      </section>

      <Breadcrumbs />

      <main className="flex-1">
        <section className="py-10 md:py-6">
          <div className="mx-auto max-w-6xl px-4">
            {!via ? (
              <div className="rounded-xl border border-border bg-white p-6">
                <p className="text-muted-foreground">
                  No encontramos información para esta vía. Intenta desde el
                  listado general.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Columna principal */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Descripción */}
                  {via.descripcion && (
                    <article className="rounded-xl border-2 border-border bg-white p-6">
                      <header className="flex items-center gap-2 mb-3 text-primary">
                        <Info className="h-5 w-5" />
                        <h2 className="text-xl font-semibold">Descripción</h2>
                      </header>
                      <p className="leading-relaxed text-justify">
                        {via.descripcion}
                      </p>
                    </article>
                  )}

                  {/* Requisitos */}
                  {objectEntriesPretty(via.requisitos).length > 0 && (
                    <article className="rounded-xl border-2 border-border bg-white p-6">
                      <header className="flex items-center gap-2 mb-3 text-primary">
                        <ListChecks className="h-5 w-5" />
                        <h2 className="text-xl font-semibold">Requisitos</h2>
                      </header>
                      <div className="space-y-3">
                        {objectEntriesPretty(via.requisitos).map(
                          ([label, value]) => {
                            const arr = asArray(value);
                            return (
                              <div key={label}>
                                <h3 className="font-semibold text-foreground">
                                  {label}
                                </h3>
                                {arr.length > 1 ? (
                                  <ul className="list-disc pl-5">
                                    {arr.map((item, i) => (
                                      <li key={i}>{String(item)}</li>
                                    ))}
                                  </ul>
                                ) : (
                                  <p>{String(arr[0])}</p>
                                )}
                              </div>
                            );
                          }
                        )}
                      </div>
                    </article>
                  )}

                  {/* Detalles adicionales */}
                  {objectEntriesPretty(via.detalleAdicional).length > 0 && (
                    <article className="rounded-xl border-2 border-border bg-white p-6">
                      <header className="flex items-center gap-2 mb-3 text-primary">
                        <FileText className="h-5 w-5" />
                        <h2 className="text-xl font-semibold">
                          Detalles adicionales
                        </h2>
                      </header>
                      <div className="space-y-3">
                        {objectEntriesPretty(via.detalleAdicional).map(
                          ([label, value]) => {
                            const arr = asArray(value);
                            return (
                              <div key={label}>
                                <h3 className="font-semibold text-foreground">
                                  {label}
                                </h3>
                                {arr.length > 1 ? (
                                  <ul className="list-disc pl-5">
                                    {arr.map((item, i) => (
                                      <li key={i}>{String(item)}</li>
                                    ))}
                                  </ul>
                                ) : (
                                  <p>{String(arr[0])}</p>
                                )}
                              </div>
                            );
                          }
                        )}
                      </div>
                    </article>
                  )}
                </div>

                {/* Columna lateral */}
                <aside className="space-y-4">
                  <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-5">
                    <h3 className="font-semibold text-primary mb-2">
                      ¿Listo para postular?
                    </h3>
                    <p className="text-sm text-primary/80">
                      {isPostgrado
                        ? "Consulta fechas de postulación en la Escuela de Postgrado USM o directamente en cada programa."
                        : "Revisa fechas y documentación exigida en la vía seleccionada."}
                    </p>
                  </div>
                </aside>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ViasAdmisionDetail;
