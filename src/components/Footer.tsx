import { Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/weforeofficial/", label: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/wefore-media/?viewAsMember=true", label: "LinkedIn" },
  ];

  return (
    <footer className="py-10 md:py-16 bg-transparent text-ebon-depth relative z-10">
      <div className="container mx-auto px-4 md:px-6 border-t border-black/5 pt-10 md:pt-16">
        <div className="flex flex-col items-center justify-center gap-5 md:gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="/images/logo-light.png" alt="WeFore Media Logo" className="h-10 md:h-20 w-auto opacity-90" />
          </div>

          <div className="flex items-center gap-4 md:gap-6 justify-center">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/5 flex items-center justify-center text-mist-gray hover:text-ebon-depth hover:bg-black/10 transition-all duration-300"
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="font-body text-[12px] md:text-[14px] text-mist-gray tracking-[-0.14px] text-center">
            © 2026 WeFore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
