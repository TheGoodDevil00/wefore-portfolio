const clients = [
  { name: "Student Council", logo: "/images/clients/student-council.png" },
  { name: "Tumbledry", logo: "/images/clients/tumbledry-new.png" },
  { name: "Treat Studio", logo: "/images/clients/treat-studio-new.png" },
  { name: "Platinum Events", logo: "/images/clients/platinum-new.png" },
  { name: "Komal Electronics", logo: "/images/clients/komal-electronics-new.png" },
  { name: "Prakriti", logo: "/images/clients/prakriti-new.png" },
  { name: "Dent O Clock", logo: "/images/clients/dent-o-clock-new.png" },
  { name: "Orbit", logo: "/images/clients/orbit-new.png" },
];

const ClientLogos = () => {
  return (
    <section id="about" className="py-16 md:py-48 relative bg-transparent overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 mb-8 md:mb-20 text-center">
        <h2 className="font-display text-[24px] md:text-display-sm text-ebon-depth font-semibold tracking-tight">
          The Brands We've Transformed
        </h2>
      </div>
      <div className="w-full">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...clients, ...clients].map((client, index) => (
            <div
              key={index}
              className="flex items-center justify-center gap-4 mx-8 md:mx-48 shrink-0"
            >
              <img
                src={client.logo}
                alt={`${client.name} logo`}
                className="h-16 md:h-28 w-auto object-contain opacity-60 hover:opacity-100 transition-all duration-500 hover:scale-110 mix-blend-multiply"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
