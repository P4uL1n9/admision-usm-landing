import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import GeneralHero from "@/components/GeneralHero";
import Footer from "@/components/Footer";
import imagenHero from "@/assets/fotos/admision1.webp";

const internas = [
  {
    title: "Beca Magíster Científico/Tecnológicos USM",
    description:
      "Apoyo para estudiantes de magíster científico/tecnológico USM. Cubre parte del arancel y fomenta la investigación aplicada.",
  },
  {
    title: "Beca Doctorado USM",
    description:
      "Apoyo para estudiantes de doctorado USM. Promueve la dedicación exclusiva a investigación.",
  },
  {
    title: "Programa de Incentivos a la Iniciación Científica (PIIC)",
    description:
      "Incentiva la participación temprana en proyectos de investigación tutelados por académicos/as USM.",
  },
  {
    title: "Beca Puente USM (Doctorado y Magíster Científico/Tecnológico)",
    description:
      "Apoyo transitorio mientras el estudiante formaliza financiamiento externo o institucional definitivo.",
  },
  {
    title: "Beca Pasantías y Estadías de Investigación",
    description:
      "Financia estadías cortas en centros nacionales o internacionales para fortalecer la formación en investigación.",
  },
  {
    title: "Beca Asistencia a Congresos",
    description:
      "Apoya la presentación de trabajos en congresos o conferencias nacionales e internacionales.",
  },
  {
    title: "Beca de Alimentación",
    description:
      "Apoyo económico parcial destinado a cubrir gastos de alimentación durante el periodo académico.",
  },
];

const externas = [
  {
    title: "Becas para Estudio de Postgrado OEA",
    description:
      "Financiamiento otorgado por la Organización de los Estados Americanos para estudios de postgrado en instituciones de la región.",
  },
  {
    title: "Beca Nelson Mandela",
    description:
      "Programa orientado a promover el liderazgo, la cooperación y el desarrollo social mediante estudios de postgrado.",
  },
  {
    title: "Becas SENESCYT",
    description:
      "Programa de financiamiento ecuatoriano para estudios de postgrado, tanto en Ecuador como en el extranjero.",
  },
  {
    title: "Becas de Doctorado Nacional ANID",
    description:
      "Apoyo estatal chileno para doctorados nacionales, cubriendo arancel y asignaciones de mantención.",
  },
  {
    title: "Becas de Magíster Nacional ANID",
    description:
      "Financiamiento estatal chileno para programas de magíster en Chile, con cobertura de arancel y beneficios complementarios.",
  },
  {
    title: "Becas AUIP",
    description:
      "Becas de la Asociación Universitaria Iberoamericana de Postgrado que promueven la movilidad académica y el intercambio.",
  },
  {
    title: "Alianza del Pacífico",
    description:
      "Programa de movilidad académica entre Chile, Colombia, México y Perú para estudios de postgrado.",
  },
];

const Section = ({ title, becas }: { title: string; becas: any[] }) => (
  <section className="pb-12">
    <div className="mx-auto max-w-6xl px-4">
      <div className="flex items-center gap-3 mb-6">
        <span className="inline-block h-8 md:h-7 w-1.5 rounded-full bg-accent" />
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {becas.map((b, i) => (
          <div
            key={i}
            className="bg-muted/40 rounded-lg border border-border p-5 hover:bg-muted/60 transition-colors"
          >
            <h3 className="font-semibold text-lg text-primary mb-2">{b.title}</h3>
            <p className="text-sm leading-relaxed text-justify">
              {b.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const BecasPostgrado = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <GeneralHero titulo="Becas de Postgrado" imagen={imagenHero} />
      <Breadcrumbs />

      <main className="flex-1">
        {/* Intro */}
        <section className="py-10 md:py-8">
          <div className="mx-auto max-w-6xl px-4">
            <p className="text-justify">
              La Universidad Técnica Federico Santa María ofrece diversas becas internas y externas
              que apoyan la formación de estudiantes de postgrado, fomentando la excelencia
              académica y la investigación. A continuación se presentan las principales opciones
              disponibles.
            </p>
          </div>
        </section>

        {/* Línea divisoria */}
        <div className="mx-auto max-w-6xl px-4">
          <div className="border-t border-muted-foreground/20 my-10" />
        </div>

        {/* Secciones */}
        <Section title="Becas Internas" becas={internas} />
        <Section title="Becas Externas" becas={externas} />
      </main>

      <Footer />
    </div>
  );
};

export default BecasPostgrado;
