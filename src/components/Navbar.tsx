import { useState, useEffect } from "react";
import { Menu, X, Instagram, Linkedin } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll for subtle navbar changes
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      {/* Brand Logo - Top Left */}
      <a 
        href="#home" 
        className={`fixed top-6 left-6 md:top-10 md:left-12 z-[60] transition-all duration-500 [[body.modal-open]_&]:opacity-0 [[body.modal-open]_&]:pointer-events-none ${scrolled ? 'scale-90 opacity-80' : 'scale-100'}`}
      >
        <div className="absolute inset-0 bg-white/10 blur-3xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <img 
          src="/images/logo-light.png" 
          alt="WeFore Media Logo" 
          className="h-8 md:h-12 object-contain relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" 
        />
      </a>

      {/* Floating Cinematic Navigation — Desktop */}
      <nav 
        className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-1 px-2 py-2 rounded-full border border-white/10 backdrop-blur-3xl transition-all duration-700 [[body.modal-open]_&]:opacity-0 [[body.modal-open]_&]:pointer-events-none [[body.modal-open]_&]:-translate-y-full ${
          scrolled 
            ? "bg-black/40 shadow-[0_8px_32px_rgba(0,0,0,0.4)] scale-95" 
            : "bg-white/5 shadow-[0_4px_24px_rgba(0,0,0,0.1)]"
        }`}
      >
        <div className="flex items-center px-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-white/60 hover:text-white font-body text-[11px] uppercase tracking-[0.15em] font-medium transition-all duration-300 px-5 py-2.5 rounded-full hover:bg-white/5"
            >
              {link.name}
            </a>
          ))}
        </div>
        
        <div className="h-4 w-[1px] bg-white/10 mx-1"></div>
        
        <a
          href="#portfolio"
          className="bg-white text-black font-body text-[11px] uppercase tracking-[0.15em] font-bold px-6 py-2.5 rounded-full hover:bg-white/90 transition-all duration-300 ml-1 shadow-lg shadow-white/5"
        >
          View Work
        </a>
      </nav>

      {/* Mobile Toggle — Minimalist Glass */}
      <button
        className="md:hidden fixed top-6 right-6 z-[60] w-12 h-12 flex items-center justify-center text-white bg-black/20 backdrop-blur-2xl rounded-full border border-white/10 transition-all duration-300 active:scale-90 [[body.modal-open]_&]:opacity-0 [[body.modal-open]_&]:pointer-events-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Menu — High-Fidelity Cinematic Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-500" style={{ backgroundColor: 'rgba(0,0,0,0.98)' }}>
          {/* Atmospheric background element */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-white/5 blur-[120px] rounded-full pointer-events-none"></div>
          
          {/* Navigation links */}
          <nav className="flex flex-col items-center gap-10 relative z-10">
            {navLinks.map((link, idx) => (
              <a
                key={link.name}
                href={link.href}
                className="font-display text-[32px] md:text-[42px] text-white/50 hover:text-white transition-all duration-500 tracking-tight hover:scale-110 active:scale-95"
                style={{ animationDelay: `${idx * 100}ms` }}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#portfolio"
              className="mt-4 bg-white text-black font-body text-[13px] uppercase tracking-[0.2em] font-bold px-10 py-4 rounded-full transition-all active:scale-95"
              onClick={() => setIsOpen(false)}
            >
              Our Work
            </a>
          </nav>

          {/* Social Links & Info at bottom */}
          <div className="absolute bottom-16 flex flex-col items-center gap-8 w-full px-10">
            <div className="w-12 h-[1px] bg-white/20"></div>
            <div className="flex items-center gap-8">
              <a
                href="https://www.instagram.com/weforeofficial/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white transition-colors"
              >
                <Instagram size={22} />
              </a>
              <a
                href="https://www.linkedin.com/company/wefore-media/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white transition-colors"
              >
                <Linkedin size={22} />
              </a>
            </div>
            <p className="text-white/20 font-body text-[10px] uppercase tracking-[0.3em]">WeFore Media © 2026</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

