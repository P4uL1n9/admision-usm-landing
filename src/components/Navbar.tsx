import { Menu, X, ExternalLink, ChevronDown } from "lucide-react";
import { useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import usmLogo from "@/assets/logo-usm_blanco.svg";

const TITLE_TEXT = "Admisión y Matrícula"; // cambia a "Admisión USM" si prefieres

const linkBase =
  "relative text-primary-foreground font-semibold no-underline leading-none tracking-wide transition-all duration-300 after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full";

const utilityLink =
  "text-primary-foreground hover:text-accent transition-colors font-medium no-underline leading-none text-[15px]";

// Subitems: FINANCIAMIENTO
const financiamientoItems = [
  { label: "Becas y beneficios pregrado", href: "/financiamiento/becas-beneficios-estatales" },
  { label: "Becas postgrado", href: "/financiamiento/becas-postgrado" },
  { label: "Aranceles y Matrícula de pregrado", href: "/financiamiento/aranceles" },
  { label: "Aranceles postgrado", href: "/financiamiento/aranceles-postgrado" },
];

// Subitems: VÍAS (rutas correctas)
const viasItems = [
  { label: "Admisión Centralizada – PAES", href: "/vias-admision/admision-centralizada-paes" },
  { label: "Admisión Ingreso Directo a Carreras Técnicas Universitarias", href: "/vias-admision/admision-ingreso-directo" },
  { label: "Admisión Especial", href: "/vias-admision/admision-especial" },
  { label: "Mujeres STEM", href: "/vias-admision/mujeres-stem" },
  { label: "Programas de Apoyo", href: "/vias-admision/programas-de-apoyo" },
  { label: "Becas", href: "/vias-admision/becas" },
];

// Subitems: INFORMACIONES
const informacionesItems = [
  { label: "Comparador de carreras", href: "/informaciones/comparar-carreras", external: false },
  { label: "Tour virtual USM", href: "https://tour360.usm.cl/", external: true },
  { label: "Calendario Oficial proceso de admisión", href: "https://demre.cl/calendario/calendario-proceso-2026", external: true },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ===== FINANCIAMIENTO (desktop)
  const [finOpen, setFinOpen] = useState(false);
  const finCloseTimer = useRef<number | null>(null);
  const openFin = () => {
    if (finCloseTimer.current) { clearTimeout(finCloseTimer.current); finCloseTimer.current = null; }
    setFinOpen(true);
  };
  const closeFin = (delay = 120) => {
    if (finCloseTimer.current) clearTimeout(finCloseTimer.current);
    finCloseTimer.current = window.setTimeout(() => { setFinOpen(false); finCloseTimer.current = null; }, delay);
  };
  const [mobileFinOpen, setMobileFinOpen] = useState(false);

  // ===== VÍAS (desktop)
  const [viasOpen, setViasOpen] = useState(false);
  const viasCloseTimer = useRef<number | null>(null);
  const openVias = () => {
    if (viasCloseTimer.current) { clearTimeout(viasCloseTimer.current); viasCloseTimer.current = null; }
    setViasOpen(true);
  };
  const closeVias = (delay = 120) => {
    if (viasCloseTimer.current) clearTimeout(viasCloseTimer.current);
    viasCloseTimer.current = window.setTimeout(() => { setViasOpen(false); viasCloseTimer.current = null; }, delay);
  };
  const [mobileViasOpen, setMobileViasOpen] = useState(false);

  // ===== INFORMACIONES (desktop)
  const [infoOpen, setInfoOpen] = useState(false);
  const infoCloseTimer = useRef<number | null>(null);
  const openInfo = () => {
    if (infoCloseTimer.current) { clearTimeout(infoCloseTimer.current); infoCloseTimer.current = null; }
    setInfoOpen(true);
  };
  const closeInfo = (delay = 120) => {
    if (infoCloseTimer.current) clearTimeout(infoCloseTimer.current);
    infoCloseTimer.current = window.setTimeout(() => { setInfoOpen(false); infoCloseTimer.current = null; }, delay);
  };
  const [mobileInfoOpen, setMobileInfoOpen] = useState(false);

  const menuItems = [
    { label: "Inicio", href: "/" },
    { label: "Carreras de pregrado", href: "/carreras" },
    { label: "Postgrados", href: "/postgrados" },
    { label: "Vías de admisión", href: "/vias-admision"},
    { label: "Financiamiento", href: "/financiamiento", isFin: true },
    { label: "Informaciones", href: "/informaciones", isInfo: true },
  ];

  const utilityItems = [
    { label: "DEMRE", href: "https://demre.cl/", external: true },
    { label: "Acceso Mineduc", href: "https://acceso.mineduc.cl/", external: true },
  ];

  return (
    <nav className="top-0 left-0 right-0 z-50 shadow-usm-md">
      {/* ===== TIER 1: Título + utilitarios ===== */}
      <div className="bg-primary">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex h-10 items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-primary-foreground font-bold tracking-wide text-sm sm:text-base">
                {TITLE_TEXT}
              </span>
              <span className="hidden md:inline-block text-primary-foreground/80 text-sm">
                · Universidad Técnica Federico Santa María
              </span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              {utilityItems.map((u) =>
                u.external ? (
                  <a key={u.label} href={u.href} target="_blank" rel="noopener noreferrer" className={utilityLink}>
                    {u.label} <ExternalLink className="inline-block h-4 w-4 ml-1" />
                  </a>
                ) : (
                  <NavLink key={u.label} to={u.href} className={utilityLink}>
                    {u.label}
                  </NavLink>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ===== TIER 2: Logo + botón móvil ===== */}
      <div className="bg-primary border-t border-white/15">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex h-16 xl:h-20 items-center justify-between">
            <Link to="/" className="flex items-center" aria-label="Inicio">
              <img src={usmLogo} alt="USM Logo" className="h-12 xl:h-14 w-auto object-contain" />
            </Link>

            {/* utilitarios móviles (compensar lo quitado de arriba) */}
            <div className="md:hidden">
              <button
                className="text-primary-foreground"
                onClick={() => setIsMenuOpen((v) => !v)}
                aria-label="Abrir menú"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===== TIER 3: Menú principal ===== */}
      <div className="bg-primary border-t border-white/15">
        <div className="mx-auto max-w-6xl px-4">
          {/* Desktop */}
          <div className="hidden xl:flex h-14 items-center justify-center">
            <nav className="flex items-center text-[14.5px] text-primary-foreground font-semibold">
              <ul className="flex items-center">
                {menuItems.map((item, i) => {
                  // dropdowns
                  const isVias = (item as any).isVias;
                  const isFin = (item as any).isFin;
                  const isInfo = (item as any).isInfo;

                  if (isVias || isFin || isInfo) {
                    const openFn = isVias ? openVias : isFin ? openFin : openInfo;
                    const closeFn = isVias ? closeVias : isFin ? closeFin : closeInfo;
                    const openState = isVias ? viasOpen : isFin ? finOpen : infoOpen;
                    const subItems = isVias ? viasItems : isFin ? financiamientoItems : informacionesItems;

                    return (
                      <li key={item.label} className="relative px-6" onMouseEnter={openFn} onMouseLeave={() => closeFn(120)}>
                        <div className="inline-flex items-center gap-1">
                          <NavLink
                            to={item.href}
                            className={({ isActive }) => `${linkBase} ${isActive ? "underline underline-offset-8 decoration-2" : ""}`}
                          >
                            {item.label}
                          </NavLink>
                          <ChevronDown className={`h-4 w-4 transition-transform ${openState ? "rotate-180" : ""}`} />
                        </div>

                        <div
                          role="menu"
                          className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 min-w-[260px] rounded-xl bg-white text-primary shadow-xl border border-black/5 transition-opacity duration-150 ${
                            openState ? "opacity-100 visible" : "opacity-0 invisible"
                          }`}
                        >
                          <ul className="py-2">
                            {subItems.map((sub) => (
                              <li key={sub.href}>
                                {"external" in sub && sub.external ? (
                                  <a
                                    href={sub.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between px-4 py-2.5 text-[14.5px] leading-none hover:bg-muted/60 hover:text-primary font-medium"
                                  >
                                    {sub.label}
                                    <ExternalLink className="h-4 w-4 ml-2 opacity-80" />
                                  </a>
                                ) : (
                                  <NavLink
                                    to={sub.href}
                                    className={({ isActive }) =>
                                      `block px-4 py-2.5 text-[14.5px] leading-none hover:bg-muted/60 hover:text-primary ${
                                        isActive ? "font-bold" : "font-medium"
                                      }`
                                    }
                                  >
                                    {sub.label}
                                  </NavLink>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <span aria-hidden="true" className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-6 w-px bg-primary-foreground/30" />
                      </li>
                    );
                  }

                  // items normales
                  return (
                    <li key={item.label} className="relative px-6">
                      <NavLink
                        to={item.href}
                        end={item.href === "/"}
                        className={({ isActive }) => `${linkBase} ${isActive ? "underline underline-offset-8 decoration-2" : ""}`}
                      >
                        {item.label}
                      </NavLink>
                      {i < menuItems.length - 1 && (
                        <span aria-hidden="true" className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-6 w-px bg-primary-foreground/30" />
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Mobile / tablet panel */}
          {isMenuOpen && (
            <div className="xl:hidden py-4 animate-fade-in">
              <div className="flex flex-col gap-4">
                {/* Menú principal */}
                <div className="flex flex-col text-[17px] font-semibold border-b border-white/20 pb-3">
                  {[
                    { label: "Inicio", href: "/" },
                    { label: "Carreras de pregrado", href: "/carreras" },
                    { label: "Postgrados", href: "/postgrados" },
                  ].map((item) => (
                    <NavLink
                      key={item.label}
                      to={item.href}
                      end={item.href === "/"}
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) => `${linkBase} py-2 ${isActive ? "underline underline-offset-8 decoration-2" : ""}`}
                    >
                      {item.label}
                    </NavLink>
                  ))}

                  {/* VÍAS */}
                  <div className="py-1">
                    <div className="flex items-center justify-between">
                      <NavLink to="/vias-admision" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `${linkBase} py-2 ${isActive ? "underline underline-offset-8 decoration-2" : ""}`}>
                        Vías de admisión
                      </NavLink>
                      <button
                        type="button"
                        aria-label={mobileViasOpen ? "Cerrar submenu de Vías de admisión" : "Abrir submenu de Vías de admisión"}
                        aria-expanded={mobileViasOpen}
                        className="text-primary-foreground px-2"
                        onClick={() => setMobileViasOpen((v) => !v)}
                      >
                        <ChevronDown className={`h-5 w-5 transition-transform ${mobileViasOpen ? "rotate-180" : ""}`} />
                      </button>
                    </div>
                    {mobileViasOpen && (
                      <div className="mt-1 ml-3 border-l border-white/20">
                        <ul className="pl-4">
                          {viasItems.map((sub) => (
                            <li key={sub.href} className="py-1.5">
                              <NavLink to={sub.href} onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `${linkBase} ${isActive ? "underline underline-offset-8 decoration-2" : ""}`}>
                                {sub.label}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* FINANCIAMIENTO */}
                  <div className="py-1">
                    <div className="flex items-center justify-between">
                      <NavLink to="/financiamiento" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `${linkBase} py-2 ${isActive ? "underline underline-offset-8 decoration-2" : ""}`}>
                        Financiamiento
                      </NavLink>
                      <button
                        type="button"
                        aria-label={mobileFinOpen ? "Cerrar submenu de Financiamiento" : "Abrir submenu de Financiamiento"}
                        aria-expanded={mobileFinOpen}
                        className="text-primary-foreground px-2"
                        onClick={() => setMobileFinOpen((v) => !v)}
                      >
                        <ChevronDown className={`h-5 w-5 transition-transform ${mobileFinOpen ? "rotate-180" : ""}`} />
                      </button>
                    </div>
                    {mobileFinOpen && (
                      <div className="mt-1 ml-3 border-l border-white/20">
                        <ul className="pl-4">
                          {financiamientoItems.map((sub) => (
                            <li key={sub.label} className="py-1.5">
                              <NavLink to={sub.href} onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `${linkBase} ${isActive ? "underline underline-offset-8 decoration-2" : ""}`}>
                                {sub.label}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* INFORMACIONES */}
                  <div className="py-1">
                    <div className="flex items-center justify-between">
                      <NavLink to="/informaciones" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `${linkBase} py-2 ${isActive ? "underline underline-offset-8 decoration-2" : ""}`}>
                        Informaciones
                      </NavLink>
                      <button
                        type="button"
                        aria-label={mobileInfoOpen ? "Cerrar submenu de Informaciones" : "Abrir submenu de Informaciones"}
                        aria-expanded={mobileInfoOpen}
                        className="text-primary-foreground px-2"
                        onClick={() => setMobileInfoOpen((v) => !v)}
                      >
                        <ChevronDown className={`h-5 w-5 transition-transform ${mobileInfoOpen ? "rotate-180" : ""}`} />
                      </button>
                    </div>
                    {mobileInfoOpen && (
                      <div className="mt-1 ml-3 border-l border-white/20">
                        <ul className="pl-4">
                          {informacionesItems.map((sub) => (
                            <li key={sub.label} className="py-1.5">
                              {"external" in sub && sub.external ? (
                                <a href={sub.href} target="_blank" rel="noopener noreferrer" className={linkBase} onClick={() => setIsMenuOpen(false)}>
                                  {sub.label}
                                </a>
                              ) : (
                                <NavLink to={sub.href} onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `${linkBase} ${isActive ? "underline underline-offset-8 decoration-2" : ""}`}>
                                  {sub.label}
                                </NavLink>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* utilitarios extra (opcional duplicado en mobile) */}
                <div className="md:hidden flex items-center gap-4 text-primary-foreground/90 text-sm">
                  {utilityItems.map((u) =>
                    u.external ? (
                      <a key={u.label} href={u.href} target="_blank" rel="noopener noreferrer" className="no-underline hover:underline">
                        {u.label}
                      </a>
                    ) : (
                      <NavLink key={u.label} to={u.href} className="no-underline hover:underline">
                        {u.label}
                      </NavLink>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
