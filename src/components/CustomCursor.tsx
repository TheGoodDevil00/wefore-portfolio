import { useEffect, useRef, useState, useCallback } from 'react';

const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isActive, setIsActive] = useState(false);
    const [isLinkHover, setIsLinkHover] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Position refs for smooth animation
    const posRef = useRef({ x: 0, y: 0 });
    const mouseRef = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number>();

    // The rotating text characters
    const cursorText = "SEE•MORE•";
    const characters = cursorText.split('');

    // Check if device is mobile/touch device
    useEffect(() => {
        const checkMobile = () => {
            const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            const isSmallScreen = window.innerWidth < 768;
            setIsMobile(isTouchDevice || isSmallScreen);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    // Smooth animation loop (GSAP-like lerping)
    const animate = useCallback(() => {
        const speed = 0.15; // Lower = smoother/slower, Higher = snappier
        const dt = 1.0 - Math.pow(1.0 - speed, 1);

        posRef.current.x += (mouseRef.current.x - posRef.current.x) * dt;
        posRef.current.y += (mouseRef.current.y - posRef.current.y) * dt;

        if (cursorRef.current) {
            cursorRef.current.style.transform = `translate(${posRef.current.x - 30}px, ${posRef.current.y - 30}px)`;
        }

        animationFrameRef.current = requestAnimationFrame(animate);
    }, []);

    // Mouse tracking and hover detection
    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (isMobile || prefersReducedMotion) return;

        // Add class to hide default cursor
        document.body.classList.add('custom-cursor-active');

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        // Hover detection for interactive elements
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Check for links
            if (target.tagName === 'A' || target.closest('a')) {
                setIsLinkHover(true);
                setIsActive(false);
                return;
            }

            // Check for buttons and interactive elements
            if (
                target.tagName === 'BUTTON' ||
                target.closest('button') ||
                target.getAttribute('role') === 'button' ||
                target.closest('[role="button"]') ||
                target.classList.contains('cursor-pointer') ||
                target.closest('.cursor-pointer') ||
                target.classList.contains('portfolio-item') ||
                target.closest('.portfolio-item') ||
                target.classList.contains('card') ||
                target.closest('.card')
            ) {
                setIsActive(true);
                setIsLinkHover(false);
                return;
            }

            setIsActive(false);
            setIsLinkHover(false);
        };

        // Start animation loop
        animationFrameRef.current = requestAnimationFrame(animate);

        // Initialize position to center
        posRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        mouseRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            document.body.classList.remove('custom-cursor-active');
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.removeEventListener('mouseleave', handleMouseLeave);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [isMobile, isVisible, animate]);

    // Don't render on mobile
    if (isMobile) return null;

    return (
        <div
            ref={cursorRef}
            className={`custom-cursor ${isActive ? 'active' : ''} ${isLinkHover ? 'linkhover' : ''}`}
            style={{
                opacity: isVisible ? 1 : 0,
            }}
        >
            {/* Rotating text circle */}
            <div className="cursor-text-circle">
                <span className="cursor-text-wrapper">
                    {characters.map((char, index) => (
                        <span
                            key={index}
                            className="cursor-char"
                            style={{
                                transform: `rotate(${index * (360 / characters.length)}deg)`,
                            }}
                            data-char={char}
                        >
                            {char}
                        </span>
                    ))}
                </span>
            </div>
        </div>
    );
};

export default CustomCursor;
