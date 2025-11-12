import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import GeneralHero from "@/components/GeneralHero";
import Footer from "@/components/Footer";
import imagenHero from "@/assets/fotos/admision1.webp";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, CreditCard, ExternalLink, Info } from "lucide-react";

const Financiamiento = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <GeneralHero titulo="Financiamiento" imagen={imagenHero} />
      <Breadcrumbs />

      <main className="flex-1">
        {/* Intro */}
        <section className="py-10 md:py-6">
          <div className="mx-auto max-w-6xl px-4">
            <Card className="border-2">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 text-primary">
                  <Info className="h-5 w-5" />
                  <span className="text-sm font-semibold tracking-wide uppercase">
                    Información general
                  </span>
                </div>
                <CardTitle className="text-2xl">Opciones para financiar tus estudios</CardTitle>
              </CardHeader>

              <CardContent className="leading-relaxed">
                <p className="mb-3">
                  En esta sección encontrarás las alternativas de{" "}
                  <strong>becas y beneficios</strong>, junto con la información de{" "}
                  <strong>aranceles y matrícula</strong> de la Universidad Técnica Federico Santa
                  María.
                </p>

                <ul className="list-disc pl-5 space-y-1 mb-5">
                  <li>
                    Revisa primero si cumples requisitos para <em>beneficios estatales</em>{" "}
                    (Mineduc/DEMRE).
                  </li>
                  <li>Complementa con <em>becas internas</em> y apoyos institucionales.</li>
                  <li>Consulta aranceles por carrera y costos de matrícula vigentes.</li>
                </ul>

                {/* Enlaces útiles */}
                <div className="mt-6">
                  <Badge className="w-max mb-3" variant="secondary">
                    Enlaces útiles
                  </Badge>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a
                      href="https://demre.cl/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-14 group rounded-xl p-5 border-2 border-primary/20 bg-primary text-primary-foreground
                                 flex items-center justify-between hover:bg-primary/90 hover:shadow-usm-lg
                                 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/30"
                    >
                      <span className="font-semibold">DEMRE</span>
                      <ExternalLink className="h-4 w-4 opacity-90 group-hover:opacity-100" />
                    </a>

                    <a
                      href="https://acceso.mineduc.cl/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-14 group rounded-xl p-5 border-2 border-primary/20 bg-primary text-primary-foreground
                                 flex items-center justify-between hover:bg-primary/90 hover:shadow-usm-lg
                                 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/30"
                    >
                      <span className="font-semibold">Beneficios Mineduc</span>
                      <ExternalLink className="h-4 w-4 opacity-90 group-hover:opacity-100" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Separador */}
        <div className="mx-auto max-w-6xl px-4">
          <div className="border-t border-muted-foreground/20 my-10" />
        </div>

        {/* FINANCIAMIENTO PREGRADO */}
        <section className="pb-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-10">
              <div className="flex items-center gap-3">
                <span className="inline-block h-8 md:h-7 w-1.5 rounded-full bg-accent" />
                <h1 className="text-black font-bold text-[clamp(1rem,2vw,3.5rem)] leading-[1.1]">
                  Financiamiento Pregrado
                </h1>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Becas y beneficios */}
              <Card className="group border-2 hover:shadow-usm-lg transition-all duration-300 h-full flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl p-3 bg-primary/10 group-hover:scale-110 transition">
                      <GraduationCap className="h-7 w-7 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Becas y beneficios</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col justify-between flex-1">
                  <p className="text-muted-foreground mb-6">
                    Revisa las <strong>becas estatales</strong> (Gratuidad, Bicentenario, Juan Gómez
                    Millas, etc.), <strong>becas internas USM</strong> y apoyos socioeconómicos.
                  </p>
                  <Link to="/financiamiento/becas-beneficios-estatales" className="w-full sm:w-auto">
                    <Button className="rounded-xl w-full sm:w-auto">Ver becas y beneficios</Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Aranceles y matrícula */}
              <Card className="group border-2 hover:shadow-usm-lg transition-all duration-300 h-full flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl p-3 bg-primary/10 group-hover:scale-110 transition">
                      <CreditCard className="h-7 w-7 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Aranceles y matrícula</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col justify-between flex-1">
                  <p className="text-muted-foreground mb-6">
                    Consulta los <strong>aranceles</strong> por carrera y los valores de{" "}
                    <strong>matrícula</strong> para estudiantes de pregrado.
                  </p>
                  <Link to="/financiamiento/aranceles" className="w-full sm:w-auto">
                    <Button className="rounded-xl w-full sm:w-auto">
                      Ver aranceles y matrícula
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FINANCIAMIENTO POSTGRADO */}
        <section className="pb-20 bg-muted/30">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-10">
              <div className="flex items-center gap-3">
                <span className="inline-block h-8 md:h-7 w-1.5 rounded-full bg-accent" />
                <h1 className="text-black font-bold text-[clamp(1rem,2vw,3.5rem)] leading-[1.1]">
                  Financiamiento Postgrado
                </h1>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Becas de postgrado */}
              <Card className="group border-2 hover:shadow-usm-lg transition-all duration-300 h-full flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl p-3 bg-primary/10 group-hover:scale-110 transition">
                      <GraduationCap className="h-7 w-7 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Becas de postgrado</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col justify-between flex-1">
                  <p className="text-muted-foreground mb-6">
                    Explora las <strong>becas internas USM</strong> y <strong>externas</strong>{" "}
                    disponibles para programas de <strong>magíster y doctorado</strong>.
                  </p>
                  <Link to="/financiamiento/becas-postgrado" className="w-full sm:w-auto">
                    <Button className="rounded-xl w-full sm:w-auto">
                      Ver becas de postgrado
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Aranceles de postgrado */}
              <Card className="group border-2 hover:shadow-usm-lg transition-all duration-300 h-full flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl p-3 bg-primary/10 group-hover:scale-110 transition">
                      <CreditCard className="h-7 w-7 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Aranceles de postgrado</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col justify-between flex-1">
                  <p className="text-muted-foreground mb-6">
                    Revisa los <strong>aranceles referenciales</strong> para programas de postgrado.
                    Valor estimativo y único por año académico.
                  </p>
                  <Link to="/financiamiento/aranceles-postgrado" className="w-full sm:w-auto">
                    <Button className="rounded-xl w-full sm:w-auto">
                      Ver aranceles de postgrado
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Financiamiento;