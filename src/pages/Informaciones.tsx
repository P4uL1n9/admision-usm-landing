import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import GeneralHero from "@/components/GeneralHero";
import Footer from "@/components/Footer";
import imagenHero from "@/assets/fotos/admision1.webp";
import { ArrowRight, FileText, HelpCircle, MapPin, Phone, Mail, ExternalLink } from "lucide-react";

type Faq = { q: string; a: string | JSX.Element };

const faqs: Faq[] = [
  {
    q: "¿Cómo postulo a la USM?",
    a: (
      <>
        Si postulas por <strong>Admisión Centralizada – PAES</strong>, debes seguir el proceso nacional
        y luego priorizar tus carreras USM en el sistema de postulación. Si postulas por
        <strong> Admisión Especial</strong> o <strong>Ingreso Directo a Carreras Técnicas</strong>, revisa
        la vía correspondiente en <Link to="/vias-admision" className="text-primary underline">Vías de admisión</Link> para ver requisitos y documentación.
      </>
    ),
  },
  {
    q: "¿Dónde veo aranceles y matrícula?",
    a: (
      <>
        Los valores y formas de pago están en{" "}
        <Link to="/financiamiento/aranceles" className="text-primary underline">
          Aranceles y Matrícula de pregrado
        </Link>.
      </>
    ),
  },
  {
    q: "¿Qué becas o beneficios puedo tener?",
    a: (
      <>
        Revisa becas estatales (Mineduc) y becas internas USM en{" "}
        <Link to="/financiamiento/becas-beneficios-estatales" className="text-primary underline">
          Becas y beneficios
        </Link>.
      </>
    ),
  },
  {
    q: "¿Puedo comparar carreras?",
    a: (
      <>
        Sí, usa el{" "}
        <Link to="/informaciones/comparar-carreras" className="text-primary underline">
          Comparador de carreras
        </Link>{" "}
        para ver duración, mallas y áreas de interés.
      </>
    ),
  },
];

const rowsFechas = [
  { fecha: "Noviembre 2025", evento: "Publicación calendario Admisión 2026" },
  { fecha: "Diciembre 2025", evento: "Rendición PAES Regular" },
  { fecha: "Enero 2026", evento: "Postulación centralizada y listas de selección" },
];

const Informaciones = () => {
  // Estado simple para el acordeón
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const toggle = (i: number) => setOpenIdx((prev) => (prev === i ? null : i));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <GeneralHero titulo="Informaciones" imagen={imagenHero} />
      <Breadcrumbs />

      <main className="flex-1">
        {/* ===== Intro + accesos rápidos ===== */}
        <section className="py-10 md:py-6">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-semibold mb-3">Todo lo que necesitas para postular</h2>
                <p className="leading-relaxed">
                  En esta sección reunimos herramientas, preguntas frecuentes, documentos y formas de contacto
                  para que resuelvas tus dudas sobre el proceso de admisión, financiamiento y vida universitaria en la USM.
                </p>

                {/* Accesos rápidos */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link
                    to="/informaciones/comparar-carreras"
                    className="group rounded-2xl border-2 border-primary/20 bg-blue-50 hover:bg-blue-100 hover:shadow-lg transition-all duration-300 p-5 flex flex-col h-full"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        <FileText className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-semibold text-primary group-hover:text-primary/90">Comparador de carreras</h3>
                    </div>
                    <p className="mt-2 text-sm text-slate-700/90">
                      Compara duración, mallas y áreas para elegir mejor.
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1 pt-3 font-semibold text-primary group-hover:gap-2 transition-all">
                      Abrir <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>

                  <a
                    href="https://tour360.usm.cl/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-2xl border-2 border-primary/20 bg-blue-50 hover:bg-blue-100 hover:shadow-lg transition-all duration-300 p-5 flex flex-col h-full"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-semibold text-primary group-hover:text-primary/90">
                        Tour virtual USM
                      </h3>
                    </div>
                    <p className="mt-2 text-sm text-slate-700/90">
                      Recorre nuestros campus en 360° y conoce sus instalaciones.
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1 pt-3 font-semibold text-primary group-hover:gap-2 transition-all">
                      Abrir <ExternalLink className="h-4 w-4" />
                    </span>
                  </a>
                </div>
              </div>

              {/* Tarjeta de contacto rápida */}
              <aside className="rounded-2xl border-2 border-primary/20 bg-primary/5 p-5 h-full">
                <h3 className="font-semibold text-primary mb-3">¿Necesitas ayuda?</h3>
                <p className="text-sm text-primary/80">
                  Nuestro equipo de Admisión puede orientarte durante el proceso.
                </p>
                <div className="mt-4 space-y-2 text-sm">
                  <a href="mailto:admision@usm.cl" className="flex items-center gap-2 text-primary hover:underline">
                    <Mail className="h-4 w-4" /> admision@usm.cl
                  </a>
                  <a href="tel:+56322220000" className="flex items-center gap-2 text-primary hover:underline">
                    <Phone className="h-4 w-4" /> +56 32 222 0000
                  </a>
                </div>
                <div className="mt-4">
                  <Link
                    to="/vias-admision"
                    className="inline-flex items-center gap-2 rounded-lg px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-semibold"
                  >
                    Ver vías de admisión <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ===== FAQs ===== */}
        <section className="pb-6 md:pb-10">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-5 flex items-center gap-3">
              <span className="inline-block h-8 w-1.5 rounded-full bg-accent" />
              <h2 className="text-2xl font-semibold">Preguntas frecuentes</h2>
            </div>

            <div className="space-y-3">
              {faqs.map((f, i) => {
                const open = openIdx === i;
                return (
                  <div
                    key={i}
                    className="rounded-xl border-2 border-border bg-white overflow-hidden"
                  >
                    <button
                      className="w-full flex items-center justify-between gap-4 px-4 py-3 text-left"
                      onClick={() => toggle(i)}
                      aria-expanded={open}
                    >
                      <div className="flex items-center gap-2">
                        <HelpCircle className="h-5 w-5 text-primary" />
                        <span className="font-semibold">{f.q}</span>
                      </div>
                      <span
                        className={`inline-block transition-transform ${open ? "rotate-180" : ""}`}
                        aria-hidden="true"
                      >
                        ▾
                      </span>
                    </button>
                    <div
                      className={`px-4 pb-4 text-muted-foreground leading-relaxed transition-[max-height,opacity] duration-300 ${
                        open ? "opacity-100 max-h-96" : "opacity-0 max-h-0"
                      }`}
                    >
                      <div className="pt-1">{f.a}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===== Fechas clave ===== */}
        <section className="py-8 md:py-12 bg-primary/5 border-y border-primary/10">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-5 flex items-center gap-3">
              <span className="inline-block h-8 w-1.5 rounded-full bg-accent" />
              <h2 className="text-2xl font-semibold">Fechas clave</h2>
            </div>

            <div className="overflow-hidden rounded-xl border border-border bg-white">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-muted-foreground">
                  <tr>
                    <th className="text-left font-semibold p-3 w-48">Fecha</th>
                    <th className="text-left font-semibold p-3">Evento</th>
                  </tr>
                </thead>
                <tbody>
                  {rowsFechas.map((r, i) => (
                    <tr key={i} className="border-t border-border/60">
                      <td className="p-3 font-medium">{r.fecha}</td>
                      <td className="p-3 text-muted-foreground">{r.evento}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-3 text-sm text-muted-foreground">
              * Las fechas pueden actualizarse según calendario oficial del proceso.
            </div>
          </div>
        </section>

        {/* ===== Descargas / Enlaces útiles ===== */}
        <section className="py-10 md:py-12">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-5 flex items-center gap-3">
              <span className="inline-block h-8 w-1.5 rounded-full bg-accent" />
              <h2 className="text-2xl font-semibold">Documentos y enlaces útiles</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="https://demre.cl/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl border-2 border-border bg-white p-4 hover:shadow-usm-lg transition-all"
              >
                <div>
                  <div className="font-semibold">DEMRE</div>
                  <div className="text-sm text-muted-foreground">Información PAES y proceso nacional</div>
                </div>
                <ExternalLink className="h-5 w-5 text-primary" />
              </a>

              <a
                href="https://acceso.mineduc.cl/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl border-2 border-border bg-white p-4 hover:shadow-usm-lg transition-all"
              >
                <div>
                  <div className="font-semibold">Acceso Mineduc</div>
                  <div className="text-sm text-muted-foreground">Beneficios estatales y normativa</div>
                </div>
                <ExternalLink className="h-5 w-5 text-primary" />
              </a>

              <Link
                to="/financiamiento/aranceles"
                className="group flex items-center justify-between rounded-xl border-2 border-border bg-white p-4 hover:shadow-usm-lg transition-all"
              >
                <div>
                  <div className="font-semibold">Aranceles y matrícula USM</div>
                  <div className="text-sm text-muted-foreground">Valores, cuotas y formas de pago</div>
                </div>
                <ArrowRight className="h-5 w-5 text-primary" />
              </Link>

              <Link
                to="/vias-admision"
                className="group flex items-center justify-between rounded-xl border-2 border-border bg-white p-4 hover:shadow-usm-lg transition-all"
              >
                <div>
                  <div className="font-semibold">Vías de admisión USM</div>
                  <div className="text-sm text-muted-foreground">PAES, especial, ingreso directo y más</div>
                </div>
                <ArrowRight className="h-5 w-5 text-primary" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Informaciones;