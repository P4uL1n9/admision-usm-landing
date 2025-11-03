import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import viasDataRaw from "@/assets/vias_admision.json";

import { Info, ListChecks, FileText, ArrowLeft } from "lucide-react";

type Via = {
  id: string;
  via: string;
  descripcion?: string;
  requisitos?: Record<string, any> | null;
  detalleAdicional?: Record<string, any> | null;
};

const asArray = (value: any): any[] => {
  if (!value && value !== 0) return [];
  return Array.isArray(value) ? value : [value];
};

// Etiquetas legibles para algunas claves conocidas
const LABELS: Record<string, string> = {
  puntajePromedio: "Puntaje promedio",
  pruebaM2: "Prueba M2",
  pruebasOptativas: "Pruebas optativas",
  egresadoEnsenanzaMedia: "Egresado de Enseñanza Media",
  egresoMediaMismoAno: "Egreso de Enseñanza Media el mismo año",
  postulacion: "Postulación",
  NEM: "NEM",
  CIoPasaporte: "Cédula o Pasaporte",
  PAESOptativa: "PAES (optativa/recomendación)",
  tipos: "Tipos",
  egresoMedia: "Egreso de Enseñanza Media",
  documentacion: "Documentación",
  vacantesYPuntajes: "Vacantes y puntajes de corte",
  nivelIntermedio: "Nivel intermedio",
  asignacionVacantes: "Asignación de vacantes",
  programaInclusion: "Programa de inclusión",
  egresadoMedia: "Egresado de Enseñanza Media",
  primerAñoMerito: "Becas de mérito (primer año)",
};

// Devuelve un array de pares [label, value] a partir de un objeto arbitrario
const objectEntriesPretty = (obj?: Record<string, any> | null) => {
  if (!obj || typeof obj !== "object") return [];
  return Object.entries(obj).map(([key, value]) => {
    const label = LABELS[key] ?? key.replace(/([A-Z])/g, " $1").replace(/\b\w/g, (m) => m.toUpperCase());
    return [label, value] as [string, any];
  });
};

const ViasAdmisionDetail = () => {
  const params = useParams<{ id: string }>();
  // Robustecer import (default o valor directo)
  const viasData: Via[] = useMemo(() => {
    const raw = (viasDataRaw as any)?.default ?? (viasDataRaw as any);
    return Array.isArray(raw) ? (raw as Via[]) : (Object.values(raw ?? {}) as Via[]);
  }, []);

  const via = useMemo(() => viasData.find((v) => v.id === params.id), [viasData, params.id]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero distinto (franja sólida) */}
      <section className="bg-gradient-hero text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
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
                  No encontramos información para esta vía. Intenta desde el listado general.
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
                        {objectEntriesPretty(via.requisitos).map(([label, value]) => {
                          const arr = asArray(value);
                          return (
                            <div key={label}>
                              <h3 className="font-semibold text-foreground">{label}</h3>
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
                        })}
                      </div>
                    </article>
                  )}

                  {/* Detalle adicional */}
                  {objectEntriesPretty(via.detalleAdicional).length > 0 && (
                    <article className="rounded-xl border-2 border-border bg-white p-6">
                      <header className="flex items-center gap-2 mb-3 text-primary">
                        <FileText className="h-5 w-5" />
                        <h2 className="text-xl font-semibold">Detalles adicionales</h2>
                      </header>

                      <div className="space-y-3">
                        {objectEntriesPretty(via.detalleAdicional).map(([label, value]) => {
                          const arr = asArray(value);
                          return (
                            <div key={label}>
                              <h3 className="font-semibold text-foreground">{label}</h3>
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
                        })}
                      </div>
                    </article>
                  )}
                </div>

                {/* Columna lateral (CTA / enlaces futuros) */}
                <aside className="space-y-4">
                  <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-5">
                    <h3 className="font-semibold text-primary mb-2">¿Listo para postular?</h3>
                    <p className="text-sm text-primary/80">
                      Revisa fechas y documentación exigida en la vía seleccionada.
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