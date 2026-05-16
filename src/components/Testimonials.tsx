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
    name: "Aditya Takawale",
    role: "Tumbledry",
    content: "Working with WeFore was a game-changer for our brand identity. Their creative approach and attention to detail resulted in content that truly represents who we are.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-12 md:py-24 bg-transparent border-t border-black/5">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="font-display text-[24px] md:text-display-sm text-ebon-depth text-center mb-8 md:mb-16 font-semibold tracking-tight">
          What Our Clients Say
        </h2>

        <div className="flex flex-col md:grid md:grid-cols-3 gap-4 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="card-process flex flex-col justify-between p-6 md:p-12 min-h-0 md:min-h-[320px]"
            >
              <p className="font-body text-[14px] md:text-[20px] text-onyx-shadow mb-5 md:mb-8 leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="border-t border-black/5 pt-4 md:pt-6">
                <p className="font-display text-[17px] md:text-[24px] text-ebon-depth mb-0.5">
                  {testimonial.name}
                </p>
                <p className="font-body text-[11px] md:text-[14px] text-mist-gray tracking-[-0.14px] uppercase">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
