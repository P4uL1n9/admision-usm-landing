import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import usmLogo from "@/assets/logo-usm_blanco.svg";

const linkBase =
  "text-primary-foreground hover:text-accent transition-colors font-medium no-underline";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Inicio", href: "/" },
    { label: "Carreras", href: "/carreras" },
    { label: "Comparar carreras", href: "/comparar-carreras" },
    { label: "Becas y costos", href: "/becas-y-costos" },
    { label: "Contacto", href: "#" }, // 👈 visualmente igual, pero interceptamos click
  ];

  const handleNoAction = (e: React.MouseEvent) => {
    e.preventDefault();
    // Opcional: aquí puedes poner console.log("Próximamente...");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-primary z-50 shadow-usm-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={usmLogo}
              alt="USM Logo"
              className="h-12 md:h-16 w-auto object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) =>
              item.label === "Contacto" ? (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={handleNoAction}
                  className={linkBase}
                >
                  {item.label}
                </a>
              ) : (
                <NavLink
                  key={item.label}
                  to={item.href}
                  className={linkBase}
                  end={item.href === "/"}
                >
                  {item.label}
                </NavLink>
              )
            )}

            {/* Botón Postula Aquí, parece igual pero no hace nada */}
            <Button
              variant="default"
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold shadow-usm-md"
              onClick={handleNoAction}
            >
              Postula Aquí
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col gap-4">
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
                    className={`${linkBase} py-2`}
                    end={item.href === "/"}
                  >
                    {item.label}
                  </NavLink>
                )
              )}

              <Button
                variant="default"
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold w-full"
                onClick={handleNoAction}
              >
                Postula Aquí
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
