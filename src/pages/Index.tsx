import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroAdmission from "@/components/HeroSection";
import Steps from "@/components/Steps";
import Pathways from "@/components/Pathways";
import FinancingHighlight from "@/components/FinancingHighlight";

function HelpAndFAQ() {
  const faqs = [
    { q: "¿Cuál es mi vía de postulación?", a: "Depende de tu situación: egresado PAES, traslado, extranjero, etc. Revisa la sección 'Comienza aquí'." },
    { q: "¿Qué documentos necesito?", a: "Para matrícula: cédula o pasaporte, licencia de enseñanza media y documentos financieros según tu caso." },
    { q: "¿Puedo convalidar ramos?", a: "Sí, según evaluación. Consulta en 'Traslados y convalidaciones'." },
  ];

  return (
    <section className="py-10 md:py-14">
      <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-8">
        {/* Columna izquierda: contacto */}
        <div className="rounded-2xl border-2 border-primary/20 bg-primary/5 p-6 flex flex-col justify-center text-center md:text-left">
          <h3 className="text-xl font-semibold mb-2">¿Necesitas ayuda?</h3>
          <p className="text-muted-foreground">
            Contáctanos a nuestro correo electrónico:&nbsp;
            <a
              href="mailto:admision@usm.cl"
              className="text-primary font-semibold hover:underline"
            >
              admision@usm.cl
            </a>
          </p>
        </div>

        {/* Columna derecha: preguntas frecuentes */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Preguntas frecuentes</h3>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details
                key={i}
                className="rounded-xl border px-4 py-3 bg-white shadow-sm hover:shadow transition-all"
              >
                <summary className="cursor-pointer font-medium text-primary">
                  {f.q}
                </summary>
                <p className="text-sm text-muted-foreground mt-2">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <HeroAdmission />
        <Steps />
        <Pathways />
        <FinancingHighlight />

        {/* Video */}
        <section className="py-10 md:py-14 bg-primary/5 border-y border-primary/10">
          <div className="mx-auto max-w-6xl px-4 grid gap-8 md:grid-cols-2 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-2">Conoce la USM</h3>
              <p className="text-muted-foreground leading-relaxed">
                Descubre cómo vivir la experiencia universitaria, los programas de apoyo y nuestras áreas de estudio.
              </p>
              <div className="mt-5">
                <Link
                  to="/vias-admision"
                  className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-semibold"
                >
                  Ver vías de admisión
                </Link>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-usm-md border border-border">
              <div className="aspect-video">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/YkCDD6JpByQ"
                  title="USM video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>

        {/* Ayuda y preguntas */}
        <HelpAndFAQ />

        {/* Listo para postular */}
        <section className="py-10 md:py-14">
          <div className="mx-auto max-w-6xl px-4">
            <div className="rounded-2xl border-2 border-primary/20 bg-primary/5 p-8 md:p-10 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-foreground">¿Lista/o para postular?</h3>
                <p className="text-muted-foreground">
                  Revisa requisitos, vías de admisión y financiamiento para dar tu siguiente paso.
                </p>
              </div>
              <div className="flex gap-3">
                <Link
                  to="/vias-admision"
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-semibold"
                >
                  Ver vías de admisión
                </Link>
                <Link
                  to="/financiamiento"
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-3 border-2 border-primary text-primary hover:bg-primary/10 transition-colors font-semibold"
                >
                  Financiamiento
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;