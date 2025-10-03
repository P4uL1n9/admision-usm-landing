import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="py-3" aria-label="Breadcrumb">
      <div className="container mx-auto max-w-6xl">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link to="/" className="text-primary hover:underline">
              Inicio
            </Link>
          </li>

          {pathnames.map((name, index) => {
            const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
            const isLast = index === pathnames.length - 1;

            return (
              <li key={routeTo} className="flex items-center space-x-2">
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                {isLast ? (
                  <span className="text-muted-foreground capitalize">{decodeURIComponent(name)}</span>
                ) : (
                  <Link to={routeTo} className="text-primary hover:underline capitalize">
                    {decodeURIComponent(name)}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
