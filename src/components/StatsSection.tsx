import { Users, Award, BookOpen, Building2 } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      number: "20.000+",
      label: "Estudiantes activos",
    },
    {
      icon: Award,
      number: "100+",
      label: "Años de excelencia",
    },
    {
      icon: BookOpen,
      number: "60+",
      label: "Programas académicos",
    },
    {
      icon: Building2,
      number: "4",
      label: "Sedes en Chile",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-primary text-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            La USM en números
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Más de 20.000 estudiantes ya son parte de nuestra comunidad universitaria
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index} 
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-white/10 p-4 rounded-full">
                    <Icon className="h-8 w-8 md:h-10 md:w-10" />
                  </div>
                </div>
                <div className="text-3xl md:text-5xl font-bold mb-2 text-accent">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-white/80">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
