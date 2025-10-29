import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, GraduationCap, Building2, CreditCard, Users, FileText, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

const BecasBeneficiosEstatales = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("todos");
  const [selectedInstitution, setSelectedInstitution] = useState<string>("todos");

  const benefits: Benefit[] = [
    {
      id: "gratuidad",
      name: "Gratuidad",
      type: "gratuidad",
      institution: "MINEDUC",
      coverage: "100% del arancel y matrícula",
      requirements: [
        "Pertenecer a los primeros 5 deciles de menores ingresos",
        "Estar matriculado en institución adscrita a Gratuidad",
        "No exceder la duración formal de la carrera"
      ],
      howToApply: "Postulación automática vía FUAS (Formulario Único de Acreditación Socioeconómica)",
      deadline: "Enero - Febrero (según calendario FUAS)",
      icon: GraduationCap
    },
    {
      id: "bea",
      name: "Beca de Excelencia Académica (BEA)",
      type: "beca",
      institution: "MINEDUC",
      coverage: "Hasta $1.150.000 anuales",
      requirements: [
        "Promedio mínimo de notas de enseñanza media: 6.0",
        "Ranking de notas dentro del 7,5% mejor de tu establecimiento",
        "Pertenecer a los primeros 7 deciles socioeconómicos"
      ],
      howToApply: "Postulación vía FUAS",
      deadline: "Enero - Febrero (según calendario FUAS)",
      icon: GraduationCap
    },
    {
      id: "bvp",
      name: "Beca Vocación de Profesor",
      type: "beca",
      institution: "MINEDUC",
      coverage: "100% del arancel anual por la duración formal de la carrera",
      requirements: [
        "Cursar una pedagogía acreditada",
        "Puntaje PSU/PAES mínimo: 600 puntos",
        "Pertenecer a los primeros 7 deciles socioeconómicos"
      ],
      howToApply: "Postulación vía FUAS",
      deadline: "Enero - Febrero (según calendario FUAS)",
      icon: GraduationCap
    },
    {
      id: "cae",
      name: "Crédito con Aval del Estado (CAE)",
      type: "credito",
      institution: "MINEDUC",
      coverage: "Hasta el 100% del arancel de referencia",
      requirements: [
        "Tener un aval (persona natural o jurídica)",
        "No tener deudas morosas con el sistema educacional",
        "Estar matriculado en institución acreditada"
      ],
      howToApply: "Postulación vía FUAS y posterior formalización con institución financiera",
      deadline: "Enero - Febrero (según calendario FUAS)",
      icon: CreditCard
    },
    {
      id: "fscu",
      name: "Fondo Solidario de Crédito Universitario",
      type: "credito",
      institution: "MINEDUC",
      coverage: "Hasta el 100% del arancel de referencia",
      requirements: [
        "Pertenecer a los primeros 9 deciles socioeconómicos",
        "Estar matriculado en universidad del Consejo de Rectores (CRUCH)",
        "Mantener buen rendimiento académico"
      ],
      howToApply: "Postulación vía FUAS",
      deadline: "Enero - Febrero (según calendario FUAS)",
      icon: CreditCard
    },
    {
      id: "junaeb-alimentacion",
      name: "Beca de Alimentación JUNAEB",
      type: "beca",
      institution: "JUNAEB",
      coverage: "Alimentación gratuita en casino universitario durante el año académico",
      requirements: [
        "Pertenecer a los primeros 6 deciles socioeconómicos",
        "Estar matriculado en educación superior",
        "Tener buen rendimiento académico"
      ],
      howToApply: "Postulación directa en portal JUNAEB o automática según FUAS",
      deadline: "Marzo - Abril (consultar calendario JUNAEB)",
      icon: Users
    },
    {
      id: "bpye",
      name: "Beca de Apoyo a la Retención Escolar",
      type: "beca",
      institution: "JUNAEB",
      coverage: "Monto variable según nivel socioeconómico",
      requirements: [
        "Estar en riesgo de deserción",
        "Pertenecer a los primeros 7 deciles",
        "Mantener asistencia regular"
      ],
      howToApply: "Asignación automática según criterios JUNAEB",
      deadline: "Asignación automática",
      icon: Users
    }
  ];

  const filteredBenefits = benefits.filter((benefit) => {
    const matchesSearch = benefit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         benefit.institution.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "todos" || benefit.type === selectedType;
    const matchesInstitution = selectedInstitution === "todos" || benefit.institution === selectedInstitution;
    return matchesSearch && matchesType && matchesInstitution;
  });

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "gratuidad":
        return "default";
      case "beca":
        return "secondary";
      case "credito":
        return "outline";
      default:
        return "default";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-hero pt-24 md:pt-28 pb-16 md:pb-20">
          <div className="container mx-auto max-w-7xl">
            <h1 className="text-[clamp(2rem,5vw,3.5rem)] leading-[1.15] text-white font-bold mb-4 animate-fade-in text-center">
              Becas y Beneficios Estatales
            </h1>
            <p className="text-[clamp(1rem,2.2vw,1.25rem)] opacity-90 max-w-3xl text-white animate-slide-up text-center mx-auto">
              Conoce cobertura, requisitos y postulación vía FUAS, JUNAEB y créditos.
            </p>
          </div>
        </section>

        <div className="container mx-auto max-w-7xl px-4 py-8 md:py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar - Desktop sticky, Mobile accordion */}
            <aside className="lg:w-80 lg:sticky lg:top-24 lg:self-start">
              <div className="lg:hidden mb-6">
                <Accordion type="single" collapsible className="bg-card rounded-lg border">
                  <AccordionItem value="filters" className="border-none">
                    <AccordionTrigger className="px-4 hover:no-underline">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        <span className="font-semibold">Filtros de búsqueda</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <FiltersContent 
                        selectedType={selectedType}
                        setSelectedType={setSelectedType}
                        selectedInstitution={selectedInstitution}
                        setSelectedInstitution={setSelectedInstitution}
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* Desktop Filters */}
              <div className="hidden lg:block bg-card rounded-lg border p-6 shadow-usm-sm">
                <div className="flex items-center gap-2 mb-6">
                  <FileText className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-semibold">Filtros</h2>
                </div>
                <FiltersContent 
                  selectedType={selectedType}
                  setSelectedType={setSelectedType}
                  selectedInstitution={selectedInstitution}
                  setSelectedInstitution={setSelectedInstitution}
                />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Buscar por nombre o institución..."
                    className="pl-10 h-12 text-base"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Results Count */}
              <div className="mb-4">
                <p className="text-muted-foreground">
                  {filteredBenefits.length} beneficio{filteredBenefits.length !== 1 ? 's' : ''} encontrado{filteredBenefits.length !== 1 ? 's' : ''}
                </p>
              </div>

              {/* Benefits List */}
              <div className="space-y-4">
                {filteredBenefits.map((benefit) => (
                  <Card key={benefit.id} className="hover:shadow-usm-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <benefit.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-start gap-2 mb-2">
                            <CardTitle className="text-xl">{benefit.name}</CardTitle>
                            <Badge variant={getBadgeVariant(benefit.type)}>
                              {benefit.type === "gratuidad" ? "Gratuidad" : benefit.type === "beca" ? "Beca" : "Crédito"}
                            </Badge>
                          </div>
                          <CardDescription className="flex items-center gap-2">
                            <Building2 className="w-4 h-4" />
                            {benefit.institution}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-1 text-sm text-muted-foreground">Cobertura</h4>
                          <p className="text-base">{benefit.coverage}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2 text-sm text-muted-foreground">Requisitos principales</h4>
                          <ul className="space-y-1">
                            {benefit.requirements.map((req, idx) => (
                              <li key={idx} className="flex gap-2 text-sm">
                                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 pt-2 border-t">
                          <div>
                            <h4 className="font-semibold mb-1 text-sm text-muted-foreground">Cómo postular</h4>
                            <p className="text-sm">{benefit.howToApply}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1 text-sm text-muted-foreground">Plazo</h4>
                            <p className="text-sm">{benefit.deadline}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredBenefits.length === 0 && (
                <Card className="p-12 text-center">
                  <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">No se encontraron beneficios</h3>
                  <p className="text-muted-foreground">
                    Intenta ajustar los filtros o términos de búsqueda
                  </p>
                </Card>
              )}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <section className="py-12 md:py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-primary-foreground shadow-usm-lg">
              <FileText className="w-16 h-16 mx-auto mb-4 opacity-90" />
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Más información sobre beneficios
              </h2>
              <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
                Para conocer más detalles sobre cada beneficio, plazos de postulación y montos actualizados, 
                visita los portales oficiales.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://fuas.cl/" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="secondary" className="text-base w-full">
                    Portal FUAS
                  </Button>
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

// Filters Component (reused for desktop and mobile)
const FiltersContent = ({ 
  selectedType, 
  setSelectedType, 
  selectedInstitution, 
  setSelectedInstitution 
}: {
  selectedType: string;
  setSelectedType: (type: string) => void;
  selectedInstitution: string;
  setSelectedInstitution: (institution: string) => void;
}) => {
  const types = [
    { value: "todos", label: "Todos" },
    { value: "gratuidad", label: "Gratuidad" },
    { value: "beca", label: "Becas" },
    { value: "credito", label: "Créditos" },
  ];

  const institutions = [
    { value: "todos", label: "Todas" },
    { value: "MINEDUC", label: "MINEDUC" },
    { value: "JUNAEB", label: "JUNAEB" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3 text-sm text-muted-foreground">Tipo de beneficio</h3>
        <div className="space-y-2">
          {types.map((type) => (
            <button
              key={type.value}
              onClick={() => setSelectedType(type.value)}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                selectedType === type.value
                  ? "bg-primary text-primary-foreground font-medium"
                  : "hover:bg-muted"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3 text-sm text-muted-foreground">Institución</h3>
        <div className="space-y-2">
          {institutions.map((institution) => (
            <button
              key={institution.value}
              onClick={() => setSelectedInstitution(institution.value)}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                selectedInstitution === institution.value
                  ? "bg-primary text-primary-foreground font-medium"
                  : "hover:bg-muted"
              }`}
            >
              {institution.label}
            </button>
          ))}
        </div>
      </div>

      <Button 
        variant="outline" 
        className="w-full"
        onClick={() => {
          setSelectedType("todos");
          setSelectedInstitution("todos");
        }}
      >
        Limpiar filtros
      </Button>
    </div>
  );
};

export default BecasBeneficiosEstatales;
