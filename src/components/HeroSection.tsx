import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Calendar, Search } from "lucide-react";
import imagenHero1 from "@/assets/fotos/inicio1.jpeg";

import carrerasData from "@/assets/carreras_usm.json";

type Carrera = {
  id: string;   // ej: "arquitectura"
  name: string; // ej: "Arquitectura"
  description?: string;
};
type CarrerasMap = Record<string, Carrera>;

const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();

function HeroAdmission() {
  return (
    <section className="relative overflow-visible">
      {/* Imagen de fondo + overlay */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage: `url(${imagenHero1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" />

      {/* Contenido principal */}
      <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-20 grid gap-10 md:grid-cols-2 items-center text-white">
        {/* Columna izquierda */}
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide bg-white/15 rounded-full px-3 py-1 backdrop-blur-sm">
            Proceso de Admisión 2026
          </span>
          <h1 className="mt-3 font-bold text-[clamp(1.8rem,4vw,3rem)] leading-tight">
            Tu futuro comienza en la USM
          </h1>
          <p className="mt-2 text-white/90 max-w-xl">
            Conoce las vías de ingreso, explora nuestras carreras y revisa las fechas clave del proceso de admisión.
          </p>

          {/* Buscador con Autocomplete (anti-404) */}
          <div className="mt-6 bg-white/90 rounded-xl p-2 shadow-usm-md border border-white/20">
            <CareerSearchAutocomplete />
            <div className="px-2 pt-1 text-xs text-muted-foreground">
              Sugerencias: informática, arquitectura, química, construcción…
            </div>
          </div>

          {/* Accesos rápidos */}
          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              to="/vias-admision"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow"
            >
              Vías de admisión <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/financiamiento/aranceles"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 border border-white/40 text-white hover:bg-white/10 font-medium"
            >
              Aranceles y matrícula
            </Link>
            <Link
              to="/vias-admision/admision-centralizada-paes"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 border border-white/40 text-white hover:bg-white/10 font-medium"
            >
              PAES
            </Link>
          </div>
        </div>

        {/* Columna derecha: panel de fechas */}
        <div className="rounded-2xl border-2 border-white/20 bg-white/10 backdrop-blur-md p-6 md:p-7 shadow-usm-md">
          <h3 className="text-xl font-semibold flex items-center gap-2 mb-3">
            <Calendar className="h-5 w-5 text-accent" />
            Línea de tiempo del proceso
          </h3>

          <ol className="space-y-4 text-white/90">
            <li className="flex gap-3">
              <div className="mt-1 h-2 w-2 rounded-full bg-accent" />
              <div>
                <div className="font-medium">Inscripción y pruebas</div>
                <p className="text-sm text-white/80">
                  Revisa calendario oficial y requisitos para rendir PAES.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="mt-1 h-2 w-2 rounded-full bg-accent" />
              <div>
                <div className="font-medium">Postulación</div>
                <p className="text-sm text-white/80">
                  Elige tus carreras y envía tu postulación según tu vía de ingreso.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="mt-1 h-2 w-2 rounded-full bg-accent" />
              <div>
                <div className="font-medium">Resultados</div>
                <p className="text-sm text-white/80">
                  Consulta los resultados oficiales y continúa el proceso.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="mt-1 h-2 w-2 rounded-full bg-accent" />
              <div>
                <div className="font-medium">Matrícula</div>
                <p className="text-sm text-white/80">
                  Formaliza tu matrícula: documentos, pagos y fechas.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

function CareerSearchAutocomplete() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const careers = useMemo(() => {
    const map = carrerasData as CarrerasMap;
    const arr: Carrera[] = Object.values(map);
    return arr.sort((a, b) => a.name.localeCompare(b.name, "es"));
  }, []);

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);

  const filtered = useMemo(() => {
    const q = normalize(query);
    if (!q) return [];
    return careers
      .filter((c) => {
        const name = normalize(c.name);
        const id = normalize(c.id);
        return name.includes(q) || id.includes(q);
      })
      .slice(0, 8);
  }, [query, careers]);

  const hasQuery = query.trim().length > 0;
  const hasResults = filtered.length > 0;

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const goTo = (id: string) => {
    setOpen(false);
    setQuery("");
    navigate(`/carreras/${id}`);
  };
  const goAll = () => {
    setOpen(false);
    setQuery("");
    navigate("/carreras");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasQuery) return goAll();
    if (hasResults) return goTo(filtered[0].id);
    return goAll();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!hasQuery) {
      if (e.key === "Enter") return; // submit manda a /carreras
      return;
    }

    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setOpen(true);
      setHighlight(0);
      return;
    }

    if (hasResults) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlight((h) => (h + 1) % filtered.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlight((h) => (h - 1 + filtered.length) % filtered.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        const item = filtered[highlight];
        if (item) goTo(item.id);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    } else {
      if (e.key === "Enter") {
        e.preventDefault();
        goAll();
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <form onSubmit={onSubmit} className="flex items-center gap-2" noValidate>
        <div className="flex-1 flex items-center bg-white rounded-lg">
          <span className="pl-3 pr-1">
            <Search className="h-4 w-4 text-muted-foreground" />
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              const v = e.target.value;
              setQuery(v);
              setOpen(v.trim().length > 0); 
              setHighlight(0);
            }}
            onFocus={() => setOpen((prev) => prev || hasQuery)}
            onKeyDown={onKeyDown}
            name="q"
            placeholder="Busca una carrera (ej: informática, arquitectura)"
            className="flex-1 bg-transparent px-2 py-2 rounded-r-lg text-foreground placeholder:text-muted-foreground focus:outline-none"
            aria-label="Buscar carreras"
            aria-autocomplete="list"
            aria-controls="career-listbox"
            aria-expanded={open}
            role="combobox"
            autoComplete="off"
          />
        </div>

        <button
          className="rounded-lg px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
          type="submit"
        >
          Buscar
        </button>
      </form>

      {open && hasQuery && (
        hasResults ? (
          <ul
            id="career-listbox"
            role="listbox"
            className="absolute z-50 mt-2 w-full max-h-72 overflow-auto rounded-xl border border-black/10 bg-white text-foreground shadow-xl"
          >
            {filtered.map((c, idx) => {
              const active = idx === highlight;
              return (
                <li
                  key={c.id}
                  role="option"
                  aria-selected={active}
                  onMouseEnter={() => setHighlight(idx)}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    goTo(c.id);
                  }}
                  className={`cursor-pointer px-3 py-2 text-sm ${
                    active ? "bg-primary/10" : "hover:bg-muted/50"
                  }`}
                >
                  <span className="font-medium">{c.name}</span>
                </li>
              );
            })}
          </ul>
        ) : (
          <ul
            id="career-listbox"
            role="listbox"
            className="absolute z-50 mt-2 w-full rounded-xl border border-black/10 bg-white text-foreground shadow-xl"
          >
            <li
              role="option"
              aria-selected={true}
              onMouseDown={(e) => {
                e.preventDefault();
                goAll();
              }}
              className="cursor-pointer px-3 py-2 text-sm bg-primary/10"
            >
              <span className="font-semibold">Ver todas las carreras</span>
            </li>
          </ul>
        )
      )}
    </div>
  );
}

export default HeroAdmission;
