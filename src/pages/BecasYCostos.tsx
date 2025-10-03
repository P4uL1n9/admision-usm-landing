import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { GraduationCap, Building2, Wallet, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BecasYCostos = () => {
  const mainCards = [
    {
      title: "Becas y beneficios estatales",
      description: "Conoce cobertura, requisitos y postulación vía FUAS, JUNAEB y créditos",
      icon: GraduationCap,
      link: "/becas-beneficios-estatales"
    },
    {
      title: "Costos y aranceles",
      description: "Consulta valores de arancel y matrícula por carrera y sede",
      icon: Wallet,
      link: "/aranceles"
    }
  ];

  const arancelesData = [
    { carrera: "Ingeniería Civil", sede: "Casa Central Valparaíso", arancel: "$4.286.000", matricula: "$186.000" },
    { carrera: "Ingeniería Comercial", sede: "Casa Central Valparaíso", arancel: "$3.950.000", matricula: "$186.000" },
    { carrera: "Arquitectura", sede: "Casa Central Valparaíso", arancel: "$4.100.000", matricula: "$186.000" },
    { carrera: "Ingeniería Civil Informática", sede: "Campus Santiago San Joaquín", arancel: "$4.286.000", matricula: "$186.000" },
    { carrera: "Técnico Universitario", sede: "Campus Santiago Vitacura", arancel: "$2.800.000", matricula: "$186.000" },
  ];

  const faqs = [
    {
      question: "¿Cómo postulo a las becas USM?",
      answer: "Las becas internas USM se asignan automáticamente según tu puntaje de ingreso y situación socioeconómica. No requieren postulación adicional. Para beneficios estatales, debes postular a través del portal FUAS durante el período establecido por MINEDUC."
    },
    {
      question: "¿Qué es la Gratuidad?",
      answer: "La Gratuidad es un beneficio del Estado que cubre el arancel y la matrícula de estudiantes pertenecientes a los primeros cinco deciles de menores ingresos del país, en instituciones adscritas al beneficio como la USM."
    },
    {
      question: "¿Puedo acceder a más de un beneficio?",
      answer: "Sí, es posible combinar algunos beneficios. Por ejemplo, puedes tener una Beca USM de excelencia académica y además optar al beneficio de alimentación JUNAEB. Sin embargo, Gratuidad no es compatible con CAE u otras becas de arancel."
    },
    {
      question: "¿Cuándo debo pagar la matrícula?",
      answer: "El pago de matrícula se realiza una vez confirmada tu admisión, generalmente en enero. Las fechas exactas se publican en el calendario de admisión. El arancel anual se puede pagar al contado con descuento o en cuotas según el plan de pagos seleccionado."
    },
    {
      question: "¿Existen becas para deportistas o artistas?",
      answer: "Sí, la USM cuenta con becas de excelencia deportiva y cultural para estudiantes destacados. Estas becas pueden cubrir un porcentaje del arancel anual y requieren mantener participación activa en las actividades correspondientes."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-primary text-primary-foreground pt-24 md:pt-28 pb-12 md:pb-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h1 className="text-[clamp(2rem,5vw,3.5rem)] leading-[1.15] font-bold mb-4 animate-fade-in text-balance">
              Becas, beneficios y aranceles
            </h1>
            <p className="text-[clamp(1rem,2.2vw,1.25rem)] opacity-90 max-w-3xl animate-slide-up text-balance">
              La USM está comprometida con la equidad y el acceso a educación de calidad. 
              Conoce todas las opciones de financiamiento disponibles para ti.
            </p>
          </div>
        </section>

        {/* Main Cards Section */}
        <section className="py-16 px-4 bg-background">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {mainCards.map((card, index) => (
                <a 
                  key={index}
                  href={card.link}
                  className="block"
                >
                  <Card className="hover:shadow-usm-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group h-full">
                    <CardHeader>
                      <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <card.icon className="w-8 h-8 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{card.title}</CardTitle>
                      <CardDescription className="text-base">
                        {card.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        Ver más información
                      </Button>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Aranceles Table Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-2 text-foreground">
              Aranceles de referencia
            </h2>
            <p className="text-muted-foreground mb-8">
              Valores referenciales para el año académico 2025
            </p>
            
            <div className="bg-card rounded-lg shadow-usm-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Carrera</TableHead>
                    <TableHead className="font-semibold">Sede</TableHead>
                    <TableHead className="font-semibold text-right">Arancel Anual</TableHead>
                    <TableHead className="font-semibold text-right">Matrícula</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {arancelesData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.carrera}</TableCell>
                      <TableCell>{item.sede}</TableCell>
                      <TableCell className="text-right font-semibold text-primary">{item.arancel}</TableCell>
                      <TableCell className="text-right">{item.matricula}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <p className="text-sm text-muted-foreground mt-4">
              * Los valores pueden variar según la carrera y sede. Consulta el arancel específico en la ficha de cada programa.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 bg-background">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-2 text-foreground">
              Preguntas frecuentes
            </h2>
            <p className="text-muted-foreground mb-8">
              Encuentra respuestas a las consultas más comunes sobre becas y costos
            </p>
            
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-lg hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Contact CTA Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-primary-foreground shadow-usm-lg">
              <Mail className="w-16 h-16 mx-auto mb-4 opacity-90" />
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                ¿Tienes dudas específicas?
              </h2>
              <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
                Nuestro equipo de ayuda financiera está disponible para resolver todas tus consultas
                sobre becas, beneficios y financiamiento.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="text-base">
                  <Mail className="mr-2 h-5 w-5" />
                  Enviar consulta
                </Button>
                <Button size="lg" variant="outline" className="text-base bg-white/10 border-white/20 hover:bg-white/20 text-white">
                  Ver horarios de atención
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BecasYCostos;
