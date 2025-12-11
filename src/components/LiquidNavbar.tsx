import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './LiquidNavbar.css';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ThemeProvider';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

const LiquidNavbar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);
    const bubbleRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<(HTMLAnchorElement | HTMLButtonElement | null)[]>([]);
    const { theme } = useTheme();

    const logoSrc = theme === 'light' ? "/images/logo-light.png" : "/images/logo.png";

    const navLinks = [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Portfolio", href: "#portfolio" },
        { name: "Contact", href: "#contact" },
    ];

    useEffect(() => {
        // Initial positioning
        moveBubble(activeIndex, false);
    }, []);

    const moveBubble = (index: number, animate: boolean = true) => {
        const target = itemsRef.current[index];
        if (!target || !bubbleRef.current || !navRef.current) return;

        // Calculate relative position within the nav container
        const navRect = navRef.current.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();

        const relativeX = targetRect.left - navRect.left;
        const width = targetRect.width;

        // Apply GSAP animation
        if (animate) {
            // "Active" state ensures the wrapper is not blurred during movement if desired,
            // or we can just let it blur for the effect.
            // The provided "goo" effect relies on blur.

            // Stretch effect during movement (optional simple stretch)
            const currentX = parseFloat(bubbleRef.current.style.getPropertyValue('--x') || '0');
            const distance = Math.abs(relativeX - currentX);

            // If distance is large, we can stretch width temporarily? 
            // For now, let's just slide smoothly.

            gsap.to(bubbleRef.current, {
                '--x': `${relativeX}px`,
                width: width,
                duration: 0.6,
                ease: "elastic.out(1, 0.75)",
                onStart: () => {
                    navRef.current?.setAttribute('data-moving', 'true');
                },
                onComplete: () => {
                    navRef.current?.setAttribute('data-moving', 'false');
                    navRef.current?.setAttribute('data-settled', 'true');
                }
            });
        } else {
            // Immediate set
            gsap.set(bubbleRef.current, {
                '--x': `${relativeX}px`,
                width: width
            });
        }
    };

    const handleMouseEnter = (index: number) => {
        moveBubble(index);
    };

    const handleMouseLeave = () => {
        moveBubble(activeIndex);
    };

    const handleClick = (index: number) => {
        setActiveIndex(index);
        moveBubble(index);
    };

    return (
        <>
            {/* SVG Filters for Liquid Effect */}
            <svg className="sr-only" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                            result="goo"
                        />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                </defs>
            </svg>

            {/* Desktop Liquid Navbar */}
            <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block">
                <div className="flex items-center gap-4">
                    {/* Logo outside the liquid bar? Or inside? Let's keep separate as per design usually */}
                    <a href="#home" className="w-[100px] flex-shrink-0">
                        <img src={logoSrc} alt="WeFore Logo" className="h-8 object-contain" />
                    </a>

                    {/* The Liquid Container */}
                    <div className="liquid-navbar" ref={navRef} onMouseLeave={handleMouseLeave}>

                        {/* Liquid Bubble Indicator */}
                        <div className="liquid-indicator-container">
                            <div className="indicator__liquid" ref={bubbleRef}>
                                <div className="liquid-nav-wrapper">
                                    <div className="liquids"></div>
                                </div>
                                <div className="shadow"></div>
                            </div>
                        </div>

                        {/* Nav Items */}
                        {navLinks.map((link, index) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className={`nav-item ${activeIndex === index ? 'active' : ''}`}
                                ref={(el: HTMLAnchorElement | null) => { itemsRef.current[index] = el; }}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onClick={() => handleClick(index)}
                            >
                                {link.name}
                            </a>
                        ))}

                        {/* View Work Button - Treated as the last item for the bubble to slide to */}
                        <div
                            className="nav-item-wrapper"
                            onMouseEnter={() => handleMouseEnter(navLinks.length)}
                            onClick={() => {
                                handleClick(navLinks.length);
                                document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
                            }}
                        >
                            <button
                                className="nav-item font-bold"
                                ref={(el: HTMLButtonElement | null) => { itemsRef.current[navLinks.length] = el; }}
                            >
                                View Work
                            </button>
                        </div>
                    </div>

                    <ThemeToggle />
                </div>
            </nav>

            {/* Mobile Navbar (Simplified but glassy) */}
            <nav className="fixed top-0 left-0 right-0 z-50 p-4 md:hidden glass">
                <div className="flex items-center justify-between">
                    <img src={logoSrc} alt="WeFore" className="h-8" />
                    <div className="flex gap-2">
                        <ThemeToggle />
                        <button onClick={() => setIsOpen(!isOpen)} className="p-2">
                            {isOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
                {isOpen && (
                    <div className="absolute top-16 left-4 right-4 bg-background/90 backdrop-blur-lg p-4 rounded-xl border border-border flex flex-col gap-4 shadow-xl">
                        {navLinks.map((link) => (
                            <a key={link.name} href={link.href} className="text-lg font-medium p-2" onClick={() => setIsOpen(false)}>
                                {link.name}
                            </a>
                        ))}
                        <Button onClick={() => { setIsOpen(false); document.getElementById("portfolio")?.scrollIntoView(); }}>
                            View Work
                        </Button>
                    </div>
                )}
            </nav>
        </>
    );
};

export default LiquidNavbar;
