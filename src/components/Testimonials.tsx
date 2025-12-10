import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Darshan & Varsha Gandhi",
    role: "Treat Studio Cafe",
    content: "WeFore truly understood our vision and brought it to life with exceptional creativity. Their unique content perfectly captured our brand identity and elevated our cafe's aesthetic.",
  },
  {
    name: "Shubhankar Waichal",
    role: "Platinum Event",
    content: "The quality of work WeFore delivers is outstanding. They created distinctive content that set our brand apart and beautifully showcased what makes our events special.",
  },
  {
    name: "Aditiya Takawale",
    role: "Tumbledry",
    content: "Working with WeFore was a game-changer for our brand identity. Their creative approach and attention to detail resulted in content that truly represents who we are.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12">
          What Our <span className="text-gradient">Clients</span> Say
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 group snow-cap"
            >
              <Quote className="text-primary/40 mb-4 group-hover:text-primary/60 transition-colors" size={32} />
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
