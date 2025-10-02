import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Mesa Central</p>
                  <a href="tel:+56222303000" className="text-white/80 hover:text-accent transition-colors">
                    +56 2 2303 3000
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Admisión</p>
                  <a href="mailto:admision@usm.cl" className="text-white/80 hover:text-accent transition-colors">
                    admision@usm.cl
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Casa Central</p>
                  <p className="text-white/80">Av. España 1680, Valparaíso</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Enlaces útiles</h3>
            <ul className="space-y-2">
              <li>
                <a href="#calendario" className="text-white/80 hover:text-accent transition-colors">
                  Calendario académico
                </a>
              </li>
              <li>
                <a href="#preguntas" className="text-white/80 hover:text-accent transition-colors">
                  Preguntas frecuentes
                </a>
              </li>
              <li>
                <a href="#proceso" className="text-white/80 hover:text-accent transition-colors">
                  Proceso de admisión
                </a>
              </li>
              <li>
                <a href="#biblioteca" className="text-white/80 hover:text-accent transition-colors">
                  Biblioteca virtual
                </a>
              </li>
              <li>
                <a href="#reglamentos" className="text-white/80 hover:text-accent transition-colors">
                  Reglamentos
                </a>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-xl font-bold mb-4">Programas</h3>
            <ul className="space-y-2">
              <li>
                <a href="#pregrado" className="text-white/80 hover:text-accent transition-colors">
                  Pregrado
                </a>
              </li>
              <li>
                <a href="#postgrado" className="text-white/80 hover:text-accent transition-colors">
                  Postgrado y Magíster
                </a>
              </li>
              <li>
                <a href="#doctorado" className="text-white/80 hover:text-accent transition-colors">
                  Doctorados
                </a>
              </li>
              <li>
                <a href="#diplomados" className="text-white/80 hover:text-accent transition-colors">
                  Diplomados
                </a>
              </li>
              <li>
                <a href="#educacion-continua" className="text-white/80 hover:text-accent transition-colors">
                  Educación continua
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-4">Síguenos</h3>
            <p className="text-white/80 mb-4">
              Mantente al día con todas las novedades de la USM
            </p>
            <div className="flex gap-4">
              <a 
                href="https://facebook.com/usmcl" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 p-3 rounded-full hover:bg-accent hover:text-primary transition-all"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com/usmcl" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 p-3 rounded-full hover:bg-accent hover:text-primary transition-all"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com/usmcl" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 p-3 rounded-full hover:bg-accent hover:text-primary transition-all"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://youtube.com/usmcl" 
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
        <div className="pt-8 border-t border-white/20 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/80 text-sm">
              © 2025 Universidad Técnica Federico Santa María. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#privacidad" className="text-white/80 hover:text-accent transition-colors">
                Política de privacidad
              </a>
              <a href="#terminos" className="text-white/80 hover:text-accent transition-colors">
                Términos y condiciones
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
