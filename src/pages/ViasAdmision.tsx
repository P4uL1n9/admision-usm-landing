import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import GeneralHero from "@/components/GeneralHero";
import Footer from "@/components/Footer";
import imagenHero from "@/assets/fotos/admision1.webp";
import { FileText, GraduationCap, Users, BookOpen, Award, Sparkles, ClipboardList, ScrollText } from "lucide-react";

// JSON de PREGRADO
import viasData from "@/assets/vias_admision.json";

type Via = {
  id: string;
  via: string;
  descripcion?: string;
};

// Íconos para PREGRADO
const iconById: Record<string, React.ComponentType<any>> = {
  "admision-centralizada-paes": FileText,
  "admision-ingreso-directo": BookOpen,
  "admision-especial": Users,
  "mujeres-stem": Sparkles,
  "programas-de-apoyo": GraduationCap,
  "becas": Award,
};

// ---- POSTGRADO (editable aquí o muévelo a un JSON si prefieres)
const viasPostData: Via[] = [
  {
    id: "magister-regular",
    via: "Admisión Magíster (Regular)",
    descripcion:
      "Para postulantes con grado de Licenciado o título profesional equivalente. Requiere antecedentes académicos, carta de motivación y referencias.",
  },
  {
    id: "doctorado-regular",
    via: "Admisión Doctorado (Regular)",
    descripcion:
      "Para candidatos/as con grado de Magíster o Licenciatura equivalente y fuerte orientación a la investigación. Entrevista y proyecto tentativo.",
  },
  {
    id: "postgrado-internacional",
    via: "Postulación Internacional",
    descripcion:
      "Postulación de estudiantes extranjeros/as. Se solicita equivalencia de grados, nivel de idioma y documentación legalizada/apostillada.",
  },
  {
    id: "convenios-dobles-titulaciones",
    via: "Convenios / Doble Titulación",
    descripcion:
      "Para postulaciones mediante convenios interinstitucionales o programas de doble titulación vigentes con universidades asociadas.",
  },
  {
    id: "continuidad-estudios",
    via: "Continuidad de estudios",
    descripcion:
      "Para egresados/as USM u otras instituciones que buscan continuidad desde programas afines; contempla convalidaciones caso a caso.",
  },
  {
    id: "especial-antecedentes-sobresalientes",
    via: "Vía Especial (Antecedentes sobresalientes)",
    descripcion:
      "Postulación excepcional basada en méritos académicos y/o productivos (publicaciones, proyectos), evaluada por comité del programa.",
  },
];

// Íconos para POSTGRADO (asignamos por id genérico)
const iconByPostId: Record<string, React.ComponentType<any>> = {
  "magister-regular": GraduationCap,
  "doctorado-regular": GraduationCap,
  "postgrado-internacional": ScrollText,
  "convenios-dobles-titulaciones": ClipboardList,
  "continuidad-estudios": BookOpen,
  "especial-antecedentes-sobresalientes": Award,
};

const ViasAdmision = () => {
  // Asegura arreglo para PREGRADO
  const vias: Via[] = Array.isArray((viasData as any)?.default ?? viasData)
    ? (((viasData as any)?.default ?? viasData) as Via[])
    : (Object.values((viasData as any) ?? {}) as Via[]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <GeneralHero titulo="Vías de admisión pregrado y postgrado" imagen={imagenHero} />
      <Breadcrumbs />

      <main className="flex-1">
        {/* --- PREGRADO --- */}
        <section className="py-10 md:py-6">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-2xl font-semibold mb-3 text-foreground">
              Vías de admisión <span className="text-primary">pregrado</span>
            </h2>
            <p className="leading-relaxed max-w-6xl mb-6">
              Explora las diferentes formas de ingresar a la Universidad Técnica Federico Santa María para
              programas de pregrado. Selecciona una vía para revisar requisitos y detalles.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vias.map(({ id, via, descripcion }) => {
                const Icon = iconById[id] ?? FileText;
                return (
                  <article
                    key={`pre-${id}`}
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
                      <p className="text-sm text-slate-700/90 mb-4 line-clamp-3">{descripcion}</p>
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

        {/* Separador */}
        <div className="mx-auto max-w-6xl px-4">
          <div className="border-t border-muted-foreground/20 my-10" />
        </div>

        {/* --- POSTGRADO --- */}
        <section className="pb-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-2xl font-semibold mb-3 text-foreground">
              Vías de admisión <span className="text-primary">postgrado</span>
            </h2>
            <p className="leading-relaxed max-w-6xl mb-6">
              Revisa las alternativas de ingreso a programas de <strong>magíster</strong> y{" "}
              <strong>doctorado</strong>. Los requisitos específicos pueden variar según programa.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {viasPostData.map(({ id, via, descripcion }) => {
                const Icon = iconByPostId[id] ?? GraduationCap;
                return (
                  <article
                    key={`post-${id}`}
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
                      <p className="text-sm text-slate-700/90 mb-4 line-clamp-3">{descripcion}</p>
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
