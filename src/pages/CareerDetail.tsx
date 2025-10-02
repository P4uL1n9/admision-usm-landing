import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, TrendingUp, Clock, BookOpen, FileText } from "lucide-react";
import mallaEjemplo from "@/assets/malla-ejemplo.png";

// Mock data - replace with actual data
const careersData: Record<string, any> = {
  "ing-civil-informatica": {
    name: "Ingeniería Civil Informática",
    description: "La carrera de Ingeniería Civil Informática de la USM forma profesionales altamente capacitados en el desarrollo de soluciones tecnológicas innovadoras. Nuestros egresados lideran la transformación digital en empresas nacionales e internacionales.",
    area: "Ingeniería",
    campus: "Casa Central Valparaíso",
    duration: "5 años (10 semestres)",
    minScore: 650,
    pondNEM: "20%",
    pondRanking: "20%",
    pondMatematica: "30%",
    pondLenguaje: "20%",
    pondCiencias: "10%",
    perfil: "Profesional capaz de diseñar, desarrollar, implementar y mantener sistemas de información complejos utilizando tecnologías de vanguardia.",
    campoLaboral: "Empresas de tecnología, consultoras, startups, instituciones financieras, sector público, emprendimiento tecnológico.",
    requirements: [
      "PSU/PAES: Puntaje mínimo 650 puntos",
      "Ranking de notas: Mínimo percentil 60",
      "Matemática obligatoria",
      "Ciencias (Física recomendada)"
    ]
  },
  "ing-civil-industrial": {
    name: "Ingeniería Civil Industrial",
    description: "Forma ingenieros con una sólida base científica y habilidades de gestión para optimizar procesos productivos y liderar organizaciones en un entorno globalizado.",
    area: "Ingeniería",
    campus: "Casa Central Valparaíso",
    duration: "5 años (10 semestres)",
    minScore: 640,
    pondNEM: "20%",
    pondRanking: "20%",
    pondMatematica: "30%",
    pondLenguaje: "20%",
    pondCiencias: "10%",
    perfil: "Profesional con visión estratégica capaz de diseñar, implementar y mejorar sistemas de producción y gestión empresarial.",
    campoLaboral: "Industrias manufactureras, servicios, consultoría, sector financiero, gestión de proyectos.",
    requirements: [
      "PSU/PAES: Puntaje mínimo 640 puntos",
      "Ranking de notas: Mínimo percentil 55",
      "Matemática obligatoria",
      "Ciencias (Física o Química)"
    ]
  },
  "ing-civil-electronica": {
    name: "Ingeniería Civil Electrónica",
    description: "Especialistas en sistemas electrónicos, telecomunicaciones, automatización y control, con sólidos conocimientos en tecnologías de vanguardia.",
    area: "Ingeniería",
    campus: "Casa Central Valparaíso",
    duration: "5 años (10 semestres)",
    minScore: 630,
    pondNEM: "20%",
    pondRanking: "20%",
    pondMatematica: "30%",
    pondLenguaje: "20%",
    pondCiencias: "10%",
    perfil: "Ingeniero capaz de diseñar e implementar sistemas electrónicos complejos y soluciones de automatización industrial.",
    campoLaboral: "Telecomunicaciones, automatización industrial, electrónica de consumo, energías renovables.",
    requirements: [
      "PSU/PAES: Puntaje mínimo 630 puntos",
      "Ranking de notas: Mínimo percentil 55",
      "Matemática obligatoria",
      "Física obligatoria"
    ]
  },
  "arquitectura": {
    name: "Arquitectura",
    description: "Forma arquitectos creativos y técnicamente competentes, capaces de diseñar espacios habitables que integren funcionalidad, estética y sostenibilidad.",
    area: "Arquitectura y Diseño",
    campus: "Casa Central Valparaíso",
    duration: "6 años (12 semestres)",
    minScore: 620,
    pondNEM: "25%",
    pondRanking: "20%",
    pondMatematica: "25%",
    pondLenguaje: "25%",
    pondCiencias: "5%",
    perfil: "Profesional capaz de concebir, diseñar y coordinar proyectos arquitectónicos sustentables e innovadores.",
    campoLaboral: "Oficinas de arquitectura, construcción, urbanismo, diseño de interiores, patrimonio.",
    requirements: [
      "PSU/PAES: Puntaje mínimo 620 puntos",
      "Ranking de notas: Mínimo percentil 50",
      "Matemática obligatoria",
      "Portafolio creativo (evaluación complementaria)"
    ]
  },
  "ing-civil-mecanica": {
    name: "Ingeniería Civil Mecánica",
    description: "Profesionales expertos en diseño, análisis, fabricación y mantenimiento de sistemas mecánicos, térmicos y energéticos.",
    area: "Ingeniería",
    campus: "Casa Central Valparaíso",
    duration: "5 años (10 semestres)",
    minScore: 625,
    pondNEM: "20%",
    pondRanking: "20%",
    pondMatematica: "30%",
    pondLenguaje: "20%",
    pondCiencias: "10%",
    perfil: "Ingeniero con sólidos conocimientos en mecánica, termodinámica y diseño de sistemas energéticos.",
    campoLaboral: "Industria manufacturera, energía, minería, consultoría, desarrollo de productos.",
    requirements: [
      "PSU/PAES: Puntaje mínimo 625 puntos",
      "Ranking de notas: Mínimo percentil 55",
      "Matemática obligatoria",
      "Física obligatoria"
    ]
  },
  "ing-comercial": {
    name: "Ingeniería Comercial",
    description: "Prepara profesionales con competencias en gestión de negocios, finanzas, marketing y toma de decisiones estratégicas para el mundo empresarial.",
    area: "Negocios",
    campus: "Santiago San Joaquín",
    duration: "5 años (10 semestres)",
    minScore: 610,
    pondNEM: "25%",
    pondRanking: "20%",
    pondMatematica: "25%",
    pondLenguaje: "25%",
    pondCiencias: "5%",
    perfil: "Profesional con visión de negocios y habilidades de liderazgo para gestionar organizaciones y proyectos.",
    campoLaboral: "Empresas multinacionales, banca, consultoría, marketing, emprendimiento.",
    requirements: [
      "PSU/PAES: Puntaje mínimo 610 puntos",
      "Ranking de notas: Mínimo percentil 50",
      "Matemática obligatoria",
      "Lenguaje obligatorio"
    ]
  }
};

const CareerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const career = id ? careersData[id] : null;

  if (!career) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Carrera no encontrada</h1>
            <Link to="/carreras">
              <Button>Volver a Carreras</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-hero pt-24 pb-12">
        <div className="container mx-auto px-4">
          <Link to="/carreras" className="inline-flex items-center gap-2 text-white hover:text-accent mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Volver a Carreras
          </Link>
          
          <div className="flex flex-wrap gap-3 mb-4">
            <Badge className="bg-accent text-accent-foreground">{career.area}</Badge>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-md text-white">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{career.campus}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-md text-white">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{career.duration}</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {career.name}
          </h1>
          <p className="text-white/90 text-lg max-w-3xl">
            {career.description}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-grow py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Perfil Profesional */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Perfil Profesional
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{career.perfil}</p>
                </CardContent>
              </Card>

              {/* Campo Laboral */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Campo Laboral
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{career.campoLaboral}</p>
                </CardContent>
              </Card>

              {/* Malla Curricular */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Malla Curricular
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Consulta el plan de estudios completo de la carrera:
                  </p>
                  <img 
                    src={mallaEjemplo} 
                    alt="Malla curricular ejemplo" 
                    className="w-full rounded-lg border shadow-sm mb-4"
                  />
                  <Button variant="outline" className="w-full">
                    Descargar Malla Curricular (PDF)
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Admissions Info */}
            <div className="space-y-6">
              {/* Puntajes y Ponderaciones */}
              <Card className="bg-primary text-primary-foreground">
                <CardHeader>
                  <CardTitle>Admisión</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm opacity-90 mb-1">Puntaje Mínimo</p>
                    <p className="text-3xl font-bold">{career.minScore} pts</p>
                  </div>
                  
                  <div className="border-t border-white/20 pt-4">
                    <p className="font-semibold mb-3">Ponderaciones:</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="opacity-90">NEM</span>
                        <span className="font-semibold">{career.pondNEM}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="opacity-90">Ranking</span>
                        <span className="font-semibold">{career.pondRanking}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="opacity-90">Matemática</span>
                        <span className="font-semibold">{career.pondMatematica}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="opacity-90">Lenguaje</span>
                        <span className="font-semibold">{career.pondLenguaje}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="opacity-90">Ciencias</span>
                        <span className="font-semibold">{career.pondCiencias}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Requisitos */}
              <Card>
                <CardHeader>
                  <CardTitle>Requisitos</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {career.requirements.map((req: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span className="text-sm text-muted-foreground">{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* CTA */}
              <Button 
                size="lg" 
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold shadow-usm-md"
              >
                Postula Aquí
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CareerDetail;
