const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-display text-heading md:text-display-sm text-ebon-depth mb-8">
              We Are <br />
              WeFore Media
            </h2>
            <p className="font-body text-body text-onyx-shadow mb-6 leading-relaxed">
              Founded on the principle of atmospheric storytelling, WeFore Media is a creative collective dedicated to transforming how brands connect with their audiences. 
            </p>
            <p className="font-body text-body text-onyx-shadow mb-6 leading-relaxed">
              We blend cinematic production with strategic social media management to create digital ecosystems that don't just capture attention—they hold it.
            </p>
            <div className="flex gap-12 mt-12">
              <div>
                <p className="font-display text-heading text-ebon-depth mb-1">50+</p>
                <p className="font-body text-[12px] text-mist-gray uppercase tracking-wider">Clients</p>
              </div>
              <div>
                <p className="font-display text-heading text-ebon-depth mb-1">500+</p>
                <p className="font-body text-[12px] text-mist-gray uppercase tracking-wider">Stories Told</p>
              </div>
              <div>
                <p className="font-display text-heading text-ebon-depth mb-1">10M+</p>
                <p className="font-body text-[12px] text-mist-gray uppercase tracking-wider">Impressions</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-[40px] overflow-hidden border border-black/5 bg-muted shadow-xl">
               <img src="/images/about-team.jpg" alt="WeFore Media Team" className="w-full h-full object-cover" />
            </div>
            {/* Subtle floating branding element */}
            <div className="absolute -bottom-6 -right-6 bg-ebon-depth text-white p-8 rounded-[30px] hidden md:block">
              <p className="font-display text-subheading mb-2">Our Mission</p>
              <p className="font-body text-[14px] opacity-80 max-w-[200px]">
                To craft narratives that define the new genre of digital media.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
