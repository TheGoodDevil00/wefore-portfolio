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

      {/* Mobile Navbar */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <a href="#home" className="flex items-center gap-2">
              <img src={logoSrc} alt="WeFore Logo" className="h-10 w-auto" />
            </a>

            <button
              className="text-foreground p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="bg-background border-t border-border">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <Button
                variant="glass"
                size="sm"
                className="w-fit"
                onClick={() => {
                  setIsOpen(false);
                  document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                View Work
              </Button>
              <ThemeToggle />
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
