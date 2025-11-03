const GeneralHero = ({ titulo, imagen }: { titulo: string; imagen?: string }) => {
    return (
        <section className="relative h-[320px] md:h-[360px] lg:h-[380px] overflow-hidden">
            <img
                src={imagen}
                alt="Fondo Carreras USM"
                className="absolute inset-0 w-full h-full object-cover object-[center_70%]"
            />
            <div className="absolute inset-0 bg-black/60" />

            <div className="relative z-10 container mx-auto px-6 h-full flex items-end max-w-6xl">
            <div className="mb-10 animate-fade-in">
                <div className="flex items-center gap-3">
                {/* Línea amarilla */}
                <span className="inline-block h-8 md:h-9 w-1.5 rounded-full bg-accent" />
                <h1 className="text-white font-bold text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] drop-shadow-[0_3px_10px_rgba(0,0,0,0.55)]">
                    {titulo}
                </h1>
                </div>
            </div>
            </div>
        </section>
    );
};

export default GeneralHero;