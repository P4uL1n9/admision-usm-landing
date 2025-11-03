import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import GeneralHero from "@/components/GeneralHero";
import Footer from "@/components/Footer";
import imagenHero from "@/assets/fotos/admision1.webp";
import carrerasRaw from "@/assets/carreras_usm.json";

type Carrera = { id: string; name: string };

const YT_ID = "kZZMoWZq0DE";

// --- Función auxiliar para quitar tildes ---
const normalizeText = (text: string) =>
  text
    .normalize("NFD") // separa letras y acentos
    .replace(/[\u0300-\u036f]/g, "") // elimina los acentos
    .toLowerCase();

const ArancelesMatricula = () => {
  // Cargar las carreras
  const careers: Carrera[] = Array.isArray(carrerasRaw)
    ? (carrerasRaw as any[]).map((c: any) => ({
        id: c.id ?? c.slug ?? c.key,
        name: c.name ?? c.title,
      }))
    : Object.values(carrerasRaw as Record<string, any>).map((c: any) => ({
        id: c.id ?? c.slug ?? c.key,
        name: c.name ?? c.title,
      }));

  // --- Buscador ---
  const [searchTerm, setSearchTerm] = useState("");
  const filteredCareers = careers.filter((c) =>
    normalizeText(c.name ?? "").includes(normalizeText(searchTerm))
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <GeneralHero titulo="Aranceles y Matrícula de pregrado" imagen={imagenHero} />
      <Breadcrumbs />

      <main className="flex-1">
        {/* Descripción oficial + Video */}
        <section className="py-10 md:py-6">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Descripción oficial */}
              <div>
                <h2 className="text-2xl font-semibold mb-3">Información de matrículas 2026</h2>
                <div className="leading-relaxed space-y-3 text-justify">
                  <p>
                    La Universidad Técnica Federico Santa María de acuerdo a los{" "}
                    <strong>decretos 592/2025, 593/2025 y 594/2025</strong>, ha fijado los valores de
                    arancel y derecho básico de matrícula para estudiantes nuevos para las Carreras de
                    Pregrado y Programas Científicos <strong>admisión 2026</strong>.
                  </p>
                  <p>
                    Estos valores están considerados para el <strong>año 2026</strong> y su pago puede
                    diferirse hasta en <strong>diez (10) cuotas mensuales</strong>, a contar del mes de{" "}
                    <strong>marzo de 2026</strong>.
                  </p>
                  <p>
                    El valor del <strong>derecho básico de matrícula semestral</strong> para alumnos
                    nuevos admisión 2026 es <strong>$137.500</strong>.
                  </p>
                </div>
              </div>

              {/* Video YouTube embebido */}
              <div className="rounded-xl overflow-hidden shadow-usm-md border border-border">
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${YT_ID}`}
                    title="Aranceles y Matrícula USM"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Separador */}
        <div className="mx-auto max-w-6xl px-4">
          <div className="border-t border-muted-foreground/20 my-10" />
        </div>

        {/* --- Título principal --- */}
        <div className="mx-auto max-w-6xl px-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="inline-block h-8 md:h-7 w-1.5 rounded-full bg-accent" />
            <h1 className="text-black font-bold text-[clamp(1rem,2vw,3.5rem)] leading-[1.1]">
              Tabla de aranceles
            </h1>
          </div>
        </div>

        {/* --- Tabla con buscador --- */}
        <section className="pb-16">
          <div className="mx-auto max-w-3xl px-4">
            {/* Buscador */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Buscar carrera..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-2/3 rounded-lg border border-border px-4 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40
                           placeholder:text-muted-foreground/70 transition"
              />
            </div>

            {/* Tabla */}
            <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-muted-foreground">
                  <tr>
                    <th className="text-left font-semibold p-4">Carrera</th>
                    <th className="text-left font-semibold p-4 w-56">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCareers.map((c) => (
                    <tr
                      key={c.id}
                      className="border-t border-border/60 hover:bg-muted/30 transition"
                    >
                      <td className="p-4">
                        <span className="font-medium text-foreground">{c.name}</span>
                      </td>
                      <td className="p-4">
                        <Link
                          to={`/carreras/${c.id}`}
                          className="inline-flex items-center justify-center rounded-lg px-5 py-2.5
                                     bg-primary text-primary-foreground hover:bg-primary/90 transition-colors
                                     font-semibold text-[14px]"
                        >
                          Ver más detalles
                        </Link>
                      </td>
                    </tr>
                  ))}

                  {filteredCareers.length === 0 && (
                    <tr>
                      <td className="p-4 text-muted-foreground text-center" colSpan={2}>
                        No se encontraron carreras que coincidan con la búsqueda.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ArancelesMatricula;