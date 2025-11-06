import { Link } from "react-router-dom";
import { ArrowRight, Layers, } from "lucide-react";

function FinancingHighlight() {
  return (
    <section className="py-10 md:py-10 bg-primary/5 border-y border-primary/10">
        <div className="mb-6 flex items-center gap-3 mx-auto max-w-6xl px-4">
          <span className="inline-block h-8 w-1.5 rounded-full bg-accent" />
          <h2 className="text-2xl font-semibold">Revisa nuestras becas y aranceles</h2>
        </div>
      <div className="mx-auto max-w-6xl px-4 grid gap-6 md:grid-cols-2 items-stretch">
        <FeatureCard
          icon={<Layers className="h-6 w-6" />}
          title="Becas y beneficios"
          desc="Revisa beneficios estatales e institucionales."
          to="/financiamiento/becas-beneficios-estatales"
        />
        <FeatureCard
          icon={<Layers className="h-6 w-6" />}
          title="Aranceles y matrícula"
          desc="Valores y medios de pago 2026."
          to="/financiamiento/aranceles"
        />
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

export default FinancingHighlight;