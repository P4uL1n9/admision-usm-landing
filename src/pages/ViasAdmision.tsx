import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import GeneralHero from "@/components/GeneralHero";
import Footer from "@/components/Footer";
import imagenHero from "@/assets/fotos/admision1.webp";
import { FileText, GraduationCap, Users, BookOpen, Award, Sparkles } from "lucide-react";

// Importa el JSON (array)
import viasData from "@/assets/vias_admision.json";

type Via = {
  id: string;
  via: string;
  descripcion?: string;
};

// Mapa de íconos por id (todas azul institucional)
const iconById: Record<string, React.ComponentType<any>> = {
  "admision-centralizada-paes": FileText,
  "admision-ingreso-directo": BookOpen,
  "admision-especial": Users,
  "mujeres-stem": Sparkles,
  "programas-de-apoyo": GraduationCap,
  "becas": Award,
};

const ViasAdmision = () => {
  // Asegura que sea arreglo por si el bundler exporta como default/objeto
  const vias: Via[] = Array.isArray((viasData as any)?.default ?? viasData)
    ? (((viasData as any)?.default ?? viasData) as Via[])
    : Object.values((viasData as any) ?? {}) as Via[];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <GeneralHero titulo="Vías de admisión" imagen={imagenHero} />
      <Breadcrumbs />

      <main className="flex-1">
        {/* Introducción */}
        <section className="py-10 md:py-6">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-2xl font-semibold mb-3 text-foreground">
              Vías de admisión pregrado
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-6xl">
              Explora las diferentes formas de ingresar a la Universidad Técnica Federico Santa María.
              Selecciona una vía para revisar requisitos y detalles específicos.
            </p>
          </div>
        </section>

        {/* Tarjetas en azul unificado */}
        <section className="pb-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vias.map(({ id, via, descripcion }) => {
                const Icon = iconById[id] ?? FileText;
                return (
                  <article
                    key={id}
                    className="group rounded-2xl border border-primary/30 bg-blue-50 p-6 
                               hover:bg-blue-100 hover:shadow-lg transition-all duration-300 
                               flex flex-col h-full"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-semibold text-primary group-hover:text-primary/90 transition-colors">
                        {via}
                      </h3>
                    </div>

                    {descripcion && (
                      <p className="text-sm text-slate-700/90 mb-4 line-clamp-3">
                        {descripcion}
                      </p>
                    )}

                    <div className="mt-auto pt-3">
                      <Link
                        to={`/vias-admision/${id}`}
                        className="inline-flex items-center justify-center rounded-lg px-4 py-2
                                   bg-primary text-primary-foreground hover:bg-primary/90
                                   transition-colors text-sm font-semibold shadow-md"
                      >
                        Ver información
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ViasAdmision;