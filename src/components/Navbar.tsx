import { Button } from "@/components/ui/button";
import { Menu, X, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import usmLogo from "@/assets/logo-usm_blanco.svg";

const linkBase =
  "relative text-primary-foreground font-semibold no-underline leading-none tracking-wide transition-all duration-300 after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full";

const utilityLink =
  "text-primary-foreground hover:text-accent transition-colors font-medium no-underline leading-none text-[15px]";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Inicio", href: "/" },
    { label: "Carreras de pregrado", href: "/carreras" },
    { label: "Postgrados", href: "#" },
    { label: "Vías de admisión", href: "#" },
    { label: "Becas y beneficios", href: "/becas-beneficios-estatales" },
    { label: "Comparar carreras", href: "/comparar-carreras" },
    { label: "Universidad", href: "#" },
  ];

  const utilityItems = [
    { label: "DEMRE", href: "https://demre.cl/", external: true },
    { label: "Acceso Mineduc", href: "https://acceso.mineduc.cl/", external: true },
  ];

  const handleNoAction = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <nav className="top-0 left-0 right-0 z-50 shadow-usm-md">
      <div className="bg-primary">
        <div className="mx-auto px-4 max-w-6xl">
          <div className="flex flex-col">
            {/* === Fila 1: Logo + utilitarios + botón móvil === */}
            <div className="flex items-center justify-between h-20 md:h-24 py-4">
              <Link to="/" className="flex items-center">
                <img
                  src={usmLogo}
                  alt="USM Logo"
                  className="h-14 md:h-18 w-auto object-contain"
                />
              </Link>

              {/* Utilitarios en desktop */}
              <div className="hidden md:flex flex-col justify-end">
                <div className="flex items-center gap-6 self-end pb-1">
                  {utilityItems.map((u) =>
                    u.external ? (
                      <a
                        key={u.label}
                        href={u.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={utilityLink}
                      >
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

              {/* Botón Mobile */}
              <button
                className="md:hidden text-primary-foreground"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>

            {/* === Fila 2: Menú (solo más alta) === */}
            <div className="hidden md:flex items-center justify-center border-t border-white/15 h-16">
              <nav className="flex items-center text-[14.5px] text-primary-foreground font-semibold">
                <ul className="flex items-center">
                  {menuItems.map((item, i) => (
                    <li key={item.label} className="relative px-6">
                      <NavLink
                        to={item.href}
                        end={item.href === "/"}
                        className={({ isActive }) =>
                          `${linkBase} ${
                            isActive ? "underline underline-offset-8 decoration-2" : ""
                          }`
                        }
                      >
                        {item.label}
                      </NavLink>
                      {i < menuItems.length - 1 && (
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-6 w-px bg-primary-foreground/30"
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* === Menú móvil === */}
            {isMenuOpen && (
              <div className="md:hidden py-4 animate-fade-in border-t border-white/15">
                <div className="flex flex-col gap-4">
                  {/* Utilitarios */}
                  <div className="flex flex-col gap-1 border-b border-white/20 pb-3">
                    {utilityItems.map((u) =>
                      u.external ? (
                        <a
                          key={u.label}
                          href={u.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${utilityLink} py-1`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {u.label}
                        </a>
                      ) : (
                        <NavLink
                          key={u.label}
                          to={u.href}
                          className={`${utilityLink} py-1`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {u.label}
                        </NavLink>
                      )
                    )}
                  </div>

                  {/* Menú principal móvil */}
                  <div className="flex flex-col text-[17px] font-semibold">
                    {menuItems.map((item) =>
                      item.label === "Contacto" ? (
                        <a
                          key={item.label}
                          href={item.href}
                          onClick={handleNoAction}
                          className={`${linkBase} py-2`}
                        >
                          {item.label}
                        </a>
                      ) : (
                        <NavLink
                          key={item.label}
                          to={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={({ isActive }) =>
                            `${linkBase} py-2 ${
                              isActive ? "underline underline-offset-8 decoration-2" : ""
                            }`
                          }
                          end={item.href === "/"}
                        >
                          {item.label}
                        </NavLink>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
