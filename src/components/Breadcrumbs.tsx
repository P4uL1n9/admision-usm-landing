import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

// Mapea rutas/segmentos a etiquetas “bonitas”
const LABELS: Record<string, string> = {
  // primeros niveles
  "": "Inicio",
  "carreras": "Carreras de pregrado",
  "comparar-carreras": "Comparar carreras",
  "becas-beneficios-estatales": "Becas y beneficios",
  "vias-de-admision": "Vías de admisión",
  "postgrados": "Postgrados",
  "universidad": "Universidad",
  "financiamiento": "Financiamiento",
  "aranceles": "Aranceles y matrícula de pregrado",
};

// Fallback: de "ing-civil-informatica" -> "Ing Civil Informatica"
function prettifySlug(slug: string) {
  return slug
    .split("-")
    .map(s => (s ? s[0].toUpperCase() + s.slice(1) : s))
    .join(" ");
}

const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const parts = pathname.split("/").filter(Boolean);

  const items = parts.map((seg, idx) => {
    const route = "/" + parts.slice(0, idx + 1).join("/");
    const label = LABELS[seg] ?? prettifySlug(decodeURIComponent(seg));
    return { route, label, isLast: idx === parts.length - 1 };
  });

  const root = { route: "/", label: LABELS[""] ?? "Inicio" };

  return (
    <nav className="mt-6 mb-1" aria-label="Breadcrumb">
      <div className="container mx-auto max-w-6xl px-4">
        <ol className="flex flex-wrap items-center text-[15px] leading-none">
          {/* Root */}
          <li>
            <Link
              to={root.route}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {root.label}
            </Link>
          </li>

          {/* Restantes */}
          {items.map(({ route, label, isLast }) => (
            <li key={route} className="flex items-center">
              <ChevronRight className="mx-2 h-4 w-4 text-primary" />
              {isLast ? (
                <span className="text-foreground font-semibold">{label}</span>
              ) : (
                <Link
                  to={route}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;