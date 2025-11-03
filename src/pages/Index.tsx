import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, ChevronLeft, ChevronRight, FileText, GraduationCap, Layers, MapPin } from "lucide-react";
import imagenHero1 from "@/assets/fotos/inicio1.jpeg";
import imagenHero2 from "@/assets/fotos/inicio2.jpg";
import imagenHero3 from "@/assets/fotos/inicio3.jpg";

// ===================
// Configuración
// ===================
type Slide = {
  id: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  // Puedes cambiar por import de imágenes locales si quieres
  imageUrl?: string;
};

const SLIDES: Slide[] = [
  {
    id: "admision-2026",
    title: "Admisión 2026",
    subtitle: "Conoce las vías de ingreso, requisitos y fechas clave para postular a la USM.",
    ctaLabel: "Ver vías de admisión",
    ctaHref: "/vias-admision",
    imageUrl: imagenHero1 // reemplaza por una tuya
  },
  {
    id: "financiamiento",
    title: "Financiamiento",
    subtitle: "Becas y beneficios, aranceles y matrícula: toda la info en un solo lugar.",
    ctaLabel: "Ir a financiamiento",
    ctaHref: "/financiamiento",
    imageUrl: imagenHero2
  },
  {
    id: "compara-carreras",
    title: "Compara carreras",
    subtitle: "Explora y compara mallas, áreas, duración y más para decidir mejor.",
    ctaLabel: "Comparar ahora",
    ctaHref: "/informaciones/comparar-carreras",
    imageUrl: imagenHero3
  },
];

// ===================
// Componente
// ===================
const Index = () => {
  // --- Carrusel ---
  const [active, setActive] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const next = () => setActive((p) => (p + 1) % SLIDES.length);
  const prev = () => setActive((p) => (p - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    if (isHover) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }
    intervalRef.current = window.setInterval(() => next(), 6000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHover]);

  // Accesibilidad teclado
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* ================= HERO / CARRUSEL ================= */}
        <section
          className="relative overflow-hidden"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          aria-roledescription="Carrusel de anuncios"
        >
          {/* Slides */}
          <div className="relative h-[64vh] md:h-[78vh]">
            {SLIDES.map((s, i) => {
              const isActive = i === active;
              return (
                <div
                  key={s.id}
                  className={`absolute inset-0 transition-opacity duration-700 ${isActive ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                  aria-hidden={!isActive}
                >
                  {/* Fondo imagen + overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url(${s.imageUrl ?? ""})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <div className="absolute inset-0 bg-black/60" />

                  {/* Contenido */}
                  <div className="relative z-10 mx-auto max-w-6xl px-4 h-full flex items-end md:items-center">
                    <div className="text-primary-foreground pb-10 md:pb-0">
                      <h1 className="font-bold text-[clamp(1.8rem,4vw,3.5rem)] leading-tight">
                        {s.title}
                      </h1>
                      <p className="mt-2 max-w-2xl text-white/90 text-[clamp(0.95rem,1.2vw,1.1rem)]">
                        {s.subtitle}
                      </p>

                      <div className="mt-5">
                        <Link
                          to={s.ctaHref}
                          className="inline-flex items-center gap-2 rounded-xl px-5 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-semibold shadow-lg"
                        >
                          {s.ctaLabel}
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Controles */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-3">
              <button
                onClick={prev}
                className="pointer-events-auto inline-flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white h-10 w-10 backdrop-blur"
                aria-label="Slide anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                className="pointer-events-auto inline-flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white h-10 w-10 backdrop-blur"
                aria-label="Siguiente slide"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Indicadores */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Ir al slide ${i + 1}`}
                  className={`h-2.5 w-2.5 rounded-full transition-all ${i === active ? "bg-white" : "bg-white/50 hover:bg-white/80"}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ================= ATAJOS DESTACADOS ================= */}
        <section className="py-10 md:py-14">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-6 flex items-center gap-3">
              <span className="inline-block h-8 w-1.5 rounded-full bg-accent" />
              <h2 className="text-2xl font-semibold">Explora</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Vías */}
              <FeatureCard
                icon={<FileText className="h-6 w-6" />}
                title="Vías de admisión"
                desc="PAES, especial, ingreso directo y más."
                to="/vias-admision"
              />
              {/* Financiamiento */}
              <FeatureCard
                icon={<Layers className="h-6 w-6" />}
                title="Financiamiento"
                desc="Becas, aranceles y matrícula."
                to="/financiamiento"
              />
              {/* Comparador */}
              <FeatureCard
                icon={<GraduationCap className="h-6 w-6" />}
                title="Carreras de pregrado"
                desc="Carreras de pregrado disponibles."
                to="/carreras"
              />
              {/* Tour */}
              <FeatureCardExternal
                icon={<MapPin className="h-6 w-6" />}
                title="Tour virtual USM"
                desc="Recorre nuestros campus en 360°."
                href="https://tour360.usm.cl/"
              />
            </div>
          </div>
        </section>

        {/* ================= VIDEO SPOTLIGHT ================= */}
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

        {/* ================= NOVEDADES / FECHAS ================= */}
        <section className="py-10 md:py-14">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-6 flex items-center gap-3">
              <span className="inline-block h-8 w-1.5 rounded-full bg-accent" />
              <h2 className="text-2xl font-semibold">Novedades y fechas</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <NewsCard
                tag="Calendario"
                title="Fechas del Proceso de Admisión 2026"
                desc="Revisa las etapas del proceso centralizado y las fechas importantes."
                to="https://demre.cl/calendario/calendario-proceso-2026"
              />
              <NewsCard
                tag="Financiamiento"
                title="Aranceles y matrícula 2026"
                desc="Valores, cuotas y vías de pago para estudiantes nuevos."
                to="/financiamiento/aranceles"
              />
              <NewsCard
                tag="Herramienta"
                title="Carreras de pregrado"
                desc="Revisa las carreras que ofrecemos."
                to="/carreras"
              />
            </div>
          </div>
        </section>

        {/* ================= STATS ================= */}
        <section className="py-10 md:py-14 bg-white">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <Stat value="50+" label="Carreras y programas" />
              <Stat value="5" label="Campus y sedes" />
              <Stat value="10+" label="Áreas de estudio" />
              <Stat value="100%" label="Compromiso con STEM" />
            </div>
          </div>
        </section>

        {/* ================= CTA FINAL ================= */}
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

// ===================
// Subcomponentes
// ===================

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

function FeatureCardExternal({
  icon,
  title,
  desc,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
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
    </a>
  );
}

function NewsCard({
  tag,
  title,
  desc,
  to,
}: {
  tag: string;
  title: string;
  desc: string;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="group rounded-2xl border-2 border-border bg-white p-5 hover:shadow-usm-lg transition-all duration-300"
    >
      <span className="inline-block text-xs font-semibold uppercase tracking-wide text-primary/80 bg-primary/10 rounded-full px-2 py-1">
        {tag}
      </span>
      <h4 className="mt-3 text-lg font-semibold group-hover:text-primary transition-colors">{title}</h4>
      <p className="text-sm text-muted-foreground mt-1">{desc}</p>
      <span className="mt-3 inline-flex items-center gap-1 font-semibold text-primary group-hover:gap-2 transition-all">
        Ver más <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border-2 border-primary/20 bg-primary/5 p-6">
      <div className="text-3xl font-bold text-primary">{value}</div>
      <div className="text-sm text-primary/80 mt-1">{label}</div>
    </div>
  );
}

export default Index;