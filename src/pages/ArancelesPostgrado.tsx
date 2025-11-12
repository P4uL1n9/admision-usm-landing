import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import GeneralHero from "@/components/GeneralHero";
import Footer from "@/components/Footer";
import imagenHero from "@/assets/fotos/admision1.webp";
import postgradosRaw from "@/assets/carreras_postgrado.json";

type Programa = {
  id: string;
  name: string;
  tipoPostgrado?: string;
  campus?: string[];
};

const DEFAULT_ARANCEL_CLP = 4_500_000;

// --- Auxiliares ---
const normalizeText = (text: string) =>
  (text ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const formatCLP = (v: number) =>
  v.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

const ArancelesPostgrado = () => {
  const programas: Programa[] = Array.isArray(postgradosRaw)
    ? (postgradosRaw as any[]).map((p: any) => ({
        id: p.id ?? p.slug ?? p.key,
        name: p.name ?? p.title,
        tipoPostgrado: p.tipoPostgrado,
        campus: Array.isArray(p.campus) ? p.campus : [],
      }))
    : Object.values(postgradosRaw as Record<string, any>).map((p: any) => ({
        id: p.id ?? p.slug ?? p.key,
        name: p.name ?? p.title,
        tipoPostgrado: p.tipoPostgrado,
        campus: Array.isArray(p.campus) ? p.campus : [],
      }));

  const [searchTerm, setSearchTerm] = useState("");
  const filtered = programas.filter((p) =>
    normalizeText(p.name ?? "").includes(normalizeText(searchTerm))
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <GeneralHero titulo="Aranceles de Postgrado" imagen={imagenHero} />
      <Breadcrumbs />

      <main className="flex-1">
        {/* --- Descripción --- */}
        <section className="py-10 md:py-6">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-2xl font-semibold mb-3">
              Información general
            </h2>
            <div className="leading-relaxed space-y-3 text-justify">
              <p>
                A continuación se presenta la{" "}
                <strong>tabla de aranceles referenciales</strong> para los
                programas de <strong>postgrado</strong> de la Universidad
                Técnica Federico Santa María.
              </p>
              <p>
                Para conocer valores específicos, revisa la
                información de cada programa.
              </p>
            </div>
          </div>
        </section>

        {/* --- Separador --- */}
        <div className="mx-auto max-w-6xl px-4">
          <div className="border-t border-muted-foreground/20 my-10" />
        </div>

        {/* --- Título principal --- */}
        <div className="mx-auto max-w-6xl px-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="inline-block h-8 md:h-7 w-1.5 rounded-full bg-accent" />
            <h1 className="text-black font-bold text-[clamp(1rem,2vw,3.5rem)] leading-[1.1]">
              Tabla de aranceles de postgrado
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
                placeholder="Buscar programa..."
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
                    <th className="text-left font-semibold p-4">Programa</th>
                    <th className="text-left font-semibold p-4 w-48">
                      Acción
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => (
                    <tr
                      key={p.id}
                      className="border-t border-border/60 hover:bg-muted/30 transition"
                    >
                      <td className="p-4">
                        <span className="font-medium text-foreground">
                          {p.name}
                        </span>
                      </td>

                      <td className="p-4">
                        <Link
                          to={`/postgrados/${p.id}`}
                          className="inline-flex items-center justify-center rounded-lg px-5 py-2.5
                                     bg-primary text-primary-foreground hover:bg-primary/90 transition-colors
                                     font-semibold text-[14px]"
                        >
                          Ver más detalles
                        </Link>
                      </td>
                    </tr>
                  ))}

                  {filtered.length === 0 && (
                    <tr>
                      <td
                        className="p-4 text-muted-foreground text-center"
                        colSpan={5}
                      >
                        No se encontraron programas que coincidan con la
                        búsqueda.
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

export default ArancelesPostgrado;
