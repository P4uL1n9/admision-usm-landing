import { Link } from "react-router-dom";
import { ArrowRight, FileText, } from "lucide-react";

function Pathways() {
  const cards = [
    { title: "Admisión Centralizada PAES", desc: "Postulación por DEMRE para pregrado.", to: "/vias-admision/admision-centralizada-paes" },
    { title: "Ingreso Directo", desc: "Vías alternativas según perfil.", to: "/vias-admision/admision-ingreso-directo" },
    { title: "Admisión Especial", desc: "Cupos y requisitos especiales.", to: "/vias-admision/admision-especial" },
    { title: "Programas de Apoyo", desc: "Para estudiantes de otras instituciones.", to: "/vias-admision/programas-de-apoyo" },
    { title: "Mujeres STEM", desc: "Programas de apoyo y orientación.", to: "/vias-admision/mujeres-stem" },
    { title: "Becas", desc: "Requisitos y documentación.", to: "/vias-admision/becas" },
  ];
  return (
    <section className="py-10 md:py-6">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-6 flex items-center gap-3">
          <span className="inline-block h-8 w-1.5 rounded-full bg-accent" />
          <h2 className="text-2xl font-semibold">Comienza aquí</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((c, i) => (
            <FeatureCard key={i} icon={<FileText className="h-6 w-6" />} title={c.title} desc={c.desc} to={c.to} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
  to,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="group rounded-2xl border-2 border-primary/20 bg-blue-50 hover:bg-blue-100 hover:shadow-lg transition-all duration-300 p-5 flex flex-col h-full"
    >
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-primary group-hover:text-primary/90">{title}</h3>
      </div>
      <p className="mt-3 text-sm text-slate-700/90">{desc}</p>
      <span className="mt-auto inline-flex items-center gap-1 pt-3 font-semibold text-primary group-hover:gap-2 transition-all">
        Abrir <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
}

export default Pathways;