import { useEffect, useRef, useState } from 'react';

interface Button3DProps {
    text?: string;
    onClick?: () => void;
}

const Button3D = ({ text = "WeFore", onClick }: Button3DProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLAnchorElement>(null);
    const glowRef = useRef<HTMLSpanElement>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isDark, setIsDark] = useState(false);

    // Detect theme changes
    useEffect(() => {
        const checkTheme = () => {
            setIsDark(document.documentElement.classList.contains('dark'));
        };

        // Initial check
        checkTheme();

        // Watch for theme changes
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const rotationForce = 0.015; // Increased for more responsive tracking

        const applyRotation = (clientX: number, clientY: number) => {
            if (!containerRef.current || !buttonRef.current) return;

            const button = buttonRef.current;

            // Get the button's position relative to the viewport
            const rect = button.getBoundingClientRect();

            const buttonPos = {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2
            };

            // Calculate rotation based on pointer distance from button center
            const newRotation = {
                x: -1 * (clientY - buttonPos.y) / (window.innerHeight * rotationForce),
                y: (clientX - buttonPos.x) / (window.innerWidth * rotationForce)
            };

            setRotation(newRotation);

            if (buttonRef.current) {
                buttonRef.current.style.transform =
                    `rotateX(${newRotation.x}deg) rotateY(${newRotation.y}deg)`;
            }

            if (glowRef.current) {
                glowRef.current.style.transform =
                    `translate(-50%, -50%) rotateX(${-1 * newRotation.x}deg) rotateY(${-1 * newRotation.y}deg)`;
            }
        };

        const handleMouseMove = (event: MouseEvent) => {
            applyRotation(event.clientX, event.clientY);
        };

        const handleTouchMove = (event: TouchEvent) => {
            if (event.touches.length > 0) {
                const touch = event.touches[0];
                applyRotation(touch.clientX, touch.clientY);
            }
        };

        const handleTouchStart = (event: TouchEvent) => {
            if (event.touches.length > 0) {
                const touch = event.touches[0];
                applyRotation(touch.clientX, touch.clientY);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
        window.addEventListener('touchstart', handleTouchStart, { passive: true });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchstart', handleTouchStart);
        };
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (onClick) {
            onClick();
        }
    };

    return (
        <div className="button3d-container" ref={containerRef}>
            <a
                href="#"
                className="button3d"
                ref={buttonRef}
                onClick={handleClick}
            >
                <span className="button3d_glow" ref={glowRef}></span>
                <span className="button3d_side button3d_front">
                    <img
                        src={isDark ? "/images/logo.png" : "/images/logo-light.png"}
                        alt="WeFore Logo"
                        className="button3d_logo"
                    />
                </span>
                <span className="button3d_side button3d_bottom"></span>
                <span className="button3d_side button3d_back"></span>
                <span className="button3d_side button3d_top"></span>
                <span className="button3d_side button3d_left"></span>
                <span className="button3d_side button3d_right"></span>
            </a>
        </div>
    );
};

export default Button3D;
