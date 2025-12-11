import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@/components/ThemeProvider";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Contact", href: "#contact" },
  ];

  const logoSrc = theme === 'light' ? "/images/logo-light.png" : "/images/logo.png";

  return (
    <>
      {/* Desktop Glass Navbar */}
      <nav className="glass-navbar hidden md:flex">
        {/* Logo */}
        <a href="#home" className="glass-navbar__logo">
          <img src={logoSrc} alt="WeFore Logo" />
        </a>

        {/* Navigation Links */}
        <div className="glass-navbar__links">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="glass-navbar__link"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="glass-navbar__actions">
          <Button
            variant="glass"
            size="sm"
            onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
          >
            View Work
          </Button>
          <ThemeToggle />
        </div>
      </nav>

      {/* Mobile Glass Navbar */}
      <nav className="glass-navbar-mobile md:hidden">
        <div className="flex items-center justify-between w-full">
          <a href="#home" className="glass-navbar__logo">
            <img src={logoSrc} alt="WeFore Logo" />
          </a>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              className="text-foreground p-2 rounded-full hover:bg-white/10 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="glass-mobile-menu">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="glass-mobile-menu__link"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <Button
              variant="glass"
              size="sm"
              className="w-full mt-2"
              onClick={() => {
                setIsOpen(false);
                document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View Work
            </Button>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
