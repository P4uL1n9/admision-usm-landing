import { Link } from "react-router-dom";
import { MapPinned, FileCheck2, Send, Award, School, ArrowRight, } from "lucide-react";

function Steps() {
  const steps = [
    {
      n: 1,
      title: "Conoce tu vía de ingreso",
      desc: "PAES, ingreso directo, especial, traslados o extranjeros.",
      icon: <MapPinned className="h-5 w-5" />,
    },
    {
      n: 2,
      title: "Revisa requisitos",
      desc: "Puntajes, documentos y fechas clave según tu vía.",
      icon: <FileCheck2 className="h-5 w-5" />,
    },
    {
      n: 3,
      title: "Postula",
      desc: "Completa tu postulación en DEMRE o directamente en la USM.",
      icon: <Send className="h-5 w-5" />,
    },
    {
      n: 4,
      title: "Resultados y matrícula",
      desc: "Revisa seleccionados, presenta tus documentos y formaliza tu matrícula.",
      icon: <Award className="h-5 w-5" />,
    },
    {
      n: 5,
      title: "Inducción",
      desc: "Participa en las actividades de bienvenida e intégrate a la comunidad USM.",
      icon: <School className="h-5 w-5" />,
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-primary/5 to-transparent">
      <div className="mx-auto max-w-6xl px-4">
        {/* título */}
        <div className="mb-8 flex items-center gap-3">
          <span className="inline-block h-8 w-1.5 rounded-full bg-accent" />
          <h2 className="text-2xl md:text-3xl font-semibold">¿Cómo postulo?</h2>
        </div>

        {/* stepper horizontal */}
        <div className="relative flex justify-between items-start md:items-center gap-4 flex-wrap md:flex-nowrap">
          {/* línea de conexión */}
          <div className="hidden md:block absolute left-0 right-0 top-[36px] h-[3px] bg-gradient-to-r from-primary/40 via-primary/20 to-primary/40 rounded" />

          {steps.map((s, i) => (
            <div
              key={s.n}
              className="relative flex-1 min-w-[180px] text-center md:text-left"
            >
              {/* nodo */}
              <div className="relative flex justify-center md:justify-start mb-3">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-md ring-4 ring-primary/20 z-10">
                  {s.icon}
                </div>
              </div>

              {/* texto */}
              <h3 className="text-lg font-semibold text-foreground">
                {s.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-[250px] mx-auto md:mx-0">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Steps;