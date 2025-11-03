import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Building2, CreditCard, Users, FileText, CheckCircle2 } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import GeneralHero from "@/components/GeneralHero";
import ImagenHero from "@/assets/fotos/admision2.jpeg";

interface Benefit {
  id: string;
  name: string;
  type: "beca" | "credito" | "gratuidad";
  institution: string;
  coverage: string;
  requirements: string[];
  howToApply: string;
  deadline: string;
  icon: typeof GraduationCap;
}

const benefits: Benefit[] = [
  { id: "gratuidad", name: "Gratuidad", type: "gratuidad", institution: "MINEDUC",
    coverage: "100% del arancel y matrícula",
    requirements: [
      "Pertenecer a los primeros 5 deciles de menores ingresos",
      "Estar matriculado en institución adscrita a Gratuidad",
      "No exceder la duración formal de la carrera",
    ],
    howToApply: "Postulación automática vía FUAS (Formulario Único de Acreditación Socioeconómica)",
    deadline: "Enero - Febrero (según calendario FUAS)",
    icon: GraduationCap,
  },
  { id: "bea", name: "Beca de Excelencia Académica (BEA)", type: "beca", institution: "MINEDUC",
    coverage: "Hasta $1.150.000 anuales",
    requirements: [
      "Promedio mínimo de notas de enseñanza media: 6.0",
      "Ranking de notas dentro del 7,5% mejor de tu establecimiento",
      "Pertenecer a los primeros 7 deciles socioeconómicos",
    ],
    howToApply: "Postulación vía FUAS",
    deadline: "Enero - Febrero (según calendario FUAS)",
    icon: GraduationCap,
  },
  { id: "bvp", name: "Beca Vocación de Profesor", type: "beca", institution: "MINEDUC",
    coverage: "100% del arancel anual por la duración formal de la carrera",
    requirements: ["Cursar una pedagogía acreditada","Puntaje PSU/PAES mínimo: 600 puntos","Pertenecer a los primeros 7 deciles socioeconómicos"],
    howToApply: "Postulación vía FUAS",
    deadline: "Enero - Febrero (según calendario FUAS)",
    icon: GraduationCap,
  },
  { id: "cae", name: "Crédito con Aval del Estado (CAE)", type: "credito", institution: "MINEDUC",
    coverage: "Hasta el 100% del arancel de referencia",
    requirements: ["Tener un aval (persona natural o jurídica)","No tener deudas morosas con el sistema educacional","Estar matriculado en institución acreditada"],
    howToApply: "Postulación vía FUAS y posterior formalización con institución financiera",
    deadline: "Enero - Febrero (según calendario FUAS)",
    icon: CreditCard,
  },
  { id: "fscu", name: "Fondo Solidario de Crédito Universitario", type: "credito", institution: "MINEDUC",
    coverage: "Hasta el 100% del arancel de referencia",
    requirements: ["Pertenecer a los primeros 9 deciles socioeconómicos","Estar matriculado en universidad del Consejo de Rectores (CRUCH)","Mantener buen rendimiento académico"],
    howToApply: "Postulación vía FUAS",
    deadline: "Enero - Febrero (según calendario FUAS)",
    icon: CreditCard,
  },
  { id: "junaeb-alimentacion", name: "Beca de Alimentación JUNAEB", type: "beca", institution: "JUNAEB",
    coverage: "Alimentación gratuita en casino universitario durante el año académico",
    requirements: ["Pertenecer a los primeros 6 deciles socioeconómicos","Estar matriculado en educación superior","Tener buen rendimiento académico"],
    howToApply: "Postulación directa en portal JUNAEB o automática según FUAS",
    deadline: "Marzo - Abril (consultar calendario JUNAEB)",
    icon: Users,
  },
  { id: "bpye", name: "Beca de Apoyo a la Retención Escolar", type: "beca", institution: "JUNAEB",
    coverage: "Monto variable según nivel socioeconómico",
    requirements: ["Estar en riesgo de deserción","Pertenecer a los primeros 7 deciles","Mantener asistencia regular"],
    howToApply: "Asignación automática según criterios JUNAEB",
    deadline: "Asignación automática",
    icon: Users,
  },
];

const getBadgeVariant = (type: string) => {
  switch (type) {
    case "gratuidad": return "default";
    case "beca": return "secondary";
    case "credito": return "outline";
    default: return "default";
  }
};

const BecasBeneficiosEstatales = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* HERO – título abajo a la izquierda con línea amarilla y sin descripción */}
        <GeneralHero titulo="Becas y beneficios estatales" imagen={ImagenHero} />

        <Breadcrumbs />

        {/* Lista: una card por fila, distribución interna mejorada */}
        <div className="container mx-auto max-w-6xl px-4 py-8 md:py-6">
          <div className="space-y-6">
            {benefits.map((benefit) => (
              <Card key={benefit.id} className="hover:shadow-usm-md transition-shadow border-l-4 border-l-primary">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start gap-2 mb-2">
                        <CardTitle className="text-xl">{benefit.name}</CardTitle>
                        <Badge variant={getBadgeVariant(benefit.type)} className="font-medium">
                          {benefit.type === "gratuidad" ? "Gratuidad" : benefit.type === "beca" ? "Beca" : "Crédito"}
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center gap-2 text-base">
                        <Building2 className="w-4 h-4" />
                        {benefit.institution}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="bg-muted/40 rounded-lg p-4 mb-5">
                    <h4 className="font-semibold mb-2 text-sm text-muted-foreground uppercase tracking-wide">Cobertura</h4>
                    <p className="text-base font-medium text-primary">{benefit.coverage}</p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-12">
                    <div className="md:col-span-8">
                      <h4 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">Requisitos principales</h4>
                      <ul className="grid gap-2 lg:grid-cols-2">
                        {benefit.requirements.map((req, idx) => (
                          <li key={idx} className="flex gap-3 text-sm">
                            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="md:col-span-4 md:border-l md:pl-6 space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 text-sm text-muted-foreground uppercase tracking-wide">Cómo postular</h4>
                        <p className="text-sm leading-relaxed">{benefit.howToApply}</p>
                      </div>
                      <div className="bg-primary/5 rounded-lg p-3">
                        <h4 className="font-semibold mb-1 text-xs text-muted-foreground uppercase tracking-wide">Plazo</h4>
                        <p className="text-sm font-medium text-secondary">{benefit.deadline}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA final */}
        <section className="py-12 md:py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-5xl text-center">
            <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-primary-foreground shadow-usm-lg">
              <FileText className="w-16 h-16 mx-auto mb-4 opacity-90" />
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Más información sobre beneficios</h2>
              <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
                Para conocer más detalles sobre cada beneficio, plazos de postulación y montos actualizados, visita los portales oficiales.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://fuas.cl/" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="secondary" className="text-base w-full">Portal FUAS</Button>
                </a>
                <a href="https://www.junaeb.cl/" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="text-base bg-white/10 border-white/20 hover:bg-white/20 text-primary-foreground w-full">
                    Portal JUNAEB
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BecasBeneficiosEstatales;