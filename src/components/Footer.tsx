import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-14 pb-8">
      <div className="mx-auto max-w-6xl px-4">
        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 mb-12">
          {/* Col 1: Admisión / Contacto principal */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-4">Admisión y Matrícula</h3>
            <p className="text-white/85 leading-relaxed mb-5">
              ¿Tienes dudas sobre vías de ingreso, requisitos o fechas? Escríbenos y te ayudamos.
            </p>

            {/* Email + teléfono en una sola fila */}
            <div className="flex flex-wrap items-center gap-4 mb-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-md bg-white/5 flex items-center justify-center">
                  <Mail className="h-5 w-5" />
                </span>
                <a
                  href="mailto:admision@usm.cl"
                  className="font-medium text-white hover:text-accent transition-colors"
                >
                  admision@usm.cl
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-md bg-white/5 flex items-center justify-center">
                  <Phone className="h-5 w-5" />
                </span>
                <a
                  href="tel:+56222303000"
                  className="font-medium text-white hover:text-accent transition-colors"
                >
                  +56 2 2303 3000
                </a>
              </div>
            </div>

            {/* Dirección */}
            <div className="flex items-start gap-3">
              <span className="p-2 rounded-md bg-white/5 flex items-center justify-center mt-1">
                <MapPin className="h-5 w-5" />
              </span>
              <div className="text-white/85 leading-snug">
                <div className="font-medium text-white">Casa Central</div>
                <div>Av. España 1680, Valparaíso</div>
              </div>
            </div>
          </div>

          {/* Col 2: Enlaces útiles (sitio de admisión) */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Enlaces útiles</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/vias-admision" className="text-white/85 hover:text-accent transition-colors">
                  Vías de admisión
                </Link>
              </li>
              <li>
                <Link to="/carreras" className="text-white/85 hover:text-accent transition-colors">
                  Carreras de pregrado
                </Link>
              </li>
              <li>
                <Link to="/financiamiento" className="text-white/85 hover:text-accent transition-colors">
                  Financiamiento
                </Link>
              </li>
              <li>
                <Link to="/financiamiento/aranceles" className="text-white/85 hover:text-accent transition-colors">
                  Aranceles y matrícula
                </Link>
              </li>
              <li>
                <Link to="/vias-admision/admision-centralizada-paes" className="text-white/85 hover:text-accent transition-colors">
                  PAES (Admisión centralizada)
                </Link>
              </li>
              <li>
                <a
                  href="https://demre.cl/calendario/calendario-proceso-2026"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-white/85 hover:text-accent transition-colors"
                >
                  Calendario DEMRE
                  <ExternalLink className="h-4 w-4" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Sedes y Campus (resumen) */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Sedes y Campus</h4>
            <ul className="space-y-2 text-white/85">
              <li>Casa Central · Valparaíso</li>
              <li>Campus San Joaquín · Santiago</li>
              <li>Campus Vitacura · Santiago</li>
              <li>Sede Viña del Mar</li>
              <li>Sede Concepción</li>
            </ul>
            <div className="mt-3">
              <a
                href="https://tour360.usm.cl/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white/85 hover:text-accent no-underline transition-colors"
              >
                Tour virtual 360°
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Col 4: ¿Necesitas ayuda? */}
          <div>
            <h4 className="text-lg font-semibold mb-3">¿Necesitas ayuda?</h4>
            <p className="text-white/85 text-sm mb-3">
              Escríbenos a <a href="mailto:admision@usm.cl" className="font-semibold hover:text-accent transition-colors">admision@usm.cl</a> y te responderemos.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/AdmisionUSM/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-3 rounded-full hover:bg-accent hover:text-primary transition-all"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/admisionusm/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-3 rounded-full hover:bg-accent hover:text-primary transition-all"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.tiktok.com/@admisionusm"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-3 rounded-full hover:bg-accent hover:text-primary transition-all"
                aria-label="TikTok"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                >
                  <path d="M12.75 2c.3 2.3 1.9 4.1 4.1 4.7v2.2c-1-.1-2-.4-3-.8v7c0 3.2-2.4 6-5.6 6.8-3.6.9-7.1-1.3-8-4.9s1.3-7.1 4.9-8c.9-.2 1.7-.2 2.6 0v2.5c-.4-.1-.8-.1-1.2 0-1.8.5-2.8 2.3-2.3 4.1.5 1.8 2.3 2.8 4.1 2.3 1.5-.4 2.5-1.8 2.5-3.3V2h2z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/usmadmision"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-3 rounded-full hover:bg-accent hover:text-primary transition-all"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/80 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Universidad Técnica Federico Santa María. Todos los derechos reservados.
            </p>
            <nav className="flex flex-wrap items-center gap-6 text-sm">
              <a href="https://www.usm.cl/politicas/privacidad" className="text-white/80 hover:text-accent transition-colors">
                Política de privacidad
              </a>
              <a href="https://www.usm.cl/politicas/terminos" className="text-white/80 hover:text-accent transition-colors">
                Términos y condiciones
              </a>
              <Link to="/informaciones/comparar-carreras" className="text-white/80 hover:text-accent transition-colors">
                Comparador de carreras
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;