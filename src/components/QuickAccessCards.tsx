import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, DollarSign, Award } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const QuickAccessCards = () => {
  const cards = [
    // {
    //   icon: GraduationCap,
    //   title: "Vías de admisión",
    //   description: "Conoce todas las opciones para ingresar a la USM",
    //   link: "#admision",
    // },
    {
      icon: Award,
      title: "Becas y beneficios",
      description: "Descubre las ayudas económicas disponibles",
      link: "becas-beneficios-estatales",
    },
    {
      icon: DollarSign,
      title: "Costos y aranceles",
      description: "Descubre los costos y aranceles de nuestras carreras",
      link: "aranceles",
    },
  ];

  return (
    <section className="py-8 md:py-12 bg-muted">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <a 
                key={index} 
                href={card.link}
                className="group"
              >
                <Card className="h-full hover:shadow-usm-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-primary">
                  <CardContent className="p-6 text-center">
                    <div className="mb-6 flex justify-center">
                      <div className="bg-primary/10 p-6 rounded-full group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                        <Icon className="h-12 w-12 text-primary group-hover:text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {card.description}
                    </p>
                  </CardContent>
                </Card>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuickAccessCards;
