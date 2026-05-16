import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-[85vh] md:min-h-[90vh] flex flex-col items-center justify-center px-4 md:px-6 overflow-hidden pt-16 md:pt-20 bg-transparent">
      <div className="container mx-auto text-center relative z-10 max-w-4xl flex flex-col items-center justify-center h-full gap-5 md:gap-8">
        
        {/* Logo with atmospheric halo */}
        <div className="relative group mb-2 md:mb-4">
          <div className="absolute inset-0 bg-white/10 blur-3xl rounded-full scale-150 opacity-50"></div>
          <div className="relative px-6 md:px-12 py-4 md:py-8">
            <img 
              src="/images/logo-light.png" 
              alt="WeFore Media Logo" 
              className="h-24 md:h-28 object-contain animate-fade-in drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" 
            />
          </div>
        </div>
        
        <h1 className="font-display text-[28px] sm:text-[36px] md:text-display-sm lg:text-[56px] leading-[1.15] text-white drop-shadow-md font-semibold tracking-tight px-2">
          Social Media Marketing That Converts
        </h1>
        
        <p className="font-body text-[14px] md:text-[18px] text-white/85 max-w-md md:max-w-3xl mx-auto leading-relaxed drop-shadow-sm px-4">
          We craft scroll-stopping content, strategies, and event campaigns that transform your brand's online presence into a massive asset.
        </p>

        <div className="flex items-center justify-center mt-2 md:mt-4">
          <a href="#portfolio" className="bg-white text-black hover:bg-white/90 flex items-center gap-2 px-8 md:px-10 py-3 md:py-4 rounded-full transition-all font-semibold text-[14px] md:text-[16px] shadow-lg hover:shadow-white/20">
            View Work
            <ArrowDown size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
