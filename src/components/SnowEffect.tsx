import React, { useEffect, useRef } from 'react';

interface Snowflake {
    x: number;
    y: number;
    radius: number;
    speed: number;
    opacity: number;
    drift: number;
}

const SnowEffect: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const lastMouseRef = useRef({ x: -1000, y: -1000 });
    const colorRef = useRef("white");

    useEffect(() => {
        const checkTheme = () => {
            const isDark = document.documentElement.classList.contains('dark');
            colorRef.current = isDark ? "white" : "black";
        };

        checkTheme();
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        const canvas = canvasRef.current;
        if (!canvas) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let snowflakes: Snowflake[] = [];
        let trailParticles: Snowflake[] = [];

        const createSnowflakes = () => {
            const count = Math.floor((window.innerWidth * window.innerHeight) / 8000);
            const flakes: Snowflake[] = [];

            for (let i = 0; i < count; i++) {
                const depth = Math.random();
                flakes.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 2 + 1 + (depth * 2.5),
                    speed: Math.random() * 1 + 1.5 + (depth * 1.5),
                    opacity: Math.random() * 0.4 + 0.3 + (depth * 0.3),
                    drift: (Math.random() - 0.5) * (1 + depth),
                });
            }
            return flakes;
        };

        const createTrailParticle = (x: number, y: number, vx: number, vy: number) => {
            for (let i = 0; i < 8; i++) {
                trailParticles.push({
                    x: x + (Math.random() - 0.5) * 15,
                    y: y + (Math.random() - 0.5) * 15,
                    radius: Math.random() * 2 + 1,
                    speed: Math.random() * 2 + 1,
                    opacity: Math.random() * 0.5 + 0.5,
                    drift: (vx * 0.5) + (Math.random() - 0.5) * 2,
                });
            }
        };

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            snowflakes = createSnowflakes();
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const currentColor = colorRef.current;
            const isDark = currentColor === "black";

            ctx.fillStyle = currentColor;
            ctx.shadowBlur = 0;
            snowflakes.forEach((flake) => {
                ctx.beginPath();
                ctx.globalAlpha = flake.opacity;
                ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
                ctx.fill();
            });

            ctx.shadowColor = currentColor;
            ctx.shadowBlur = 8;
            trailParticles.forEach((p) => {
                ctx.beginPath();
                ctx.globalAlpha = p.opacity;
                const rgb = isDark ? "0, 0, 0" : "255, 255, 255"; // if isDark(current color is black), use 0,0,0
                ctx.fillStyle = `rgba(${rgb}, ${p.opacity})`;
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();
            });

            ctx.globalAlpha = 1.0;
            ctx.shadowBlur = 0;
        };

        const update = () => {
            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;

            snowflakes.forEach((flake) => {
                flake.y += flake.speed;
                flake.x += flake.drift;

                const dx = flake.x - mx;
                const dy = flake.y - my;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const interactionRadius = 150;

                if (distance < interactionRadius) {
                    const force = (interactionRadius - distance) / interactionRadius;
                    const angle = Math.atan2(dy, dx);
                    const repulseX = Math.cos(angle) * force * 5;
                    const repulseY = Math.sin(angle) * force * 5;

                    flake.x += repulseX;
                    flake.y += repulseY;
                }

                if (flake.y > canvas.height) {
                    flake.y = -flake.radius;
                    flake.x = Math.random() * canvas.width;
                }
                if (flake.x > canvas.width) {
                    flake.x = 0;
                } else if (flake.x < 0) {
                    flake.x = canvas.width;
                }
            });

            for (let i = trailParticles.length - 1; i >= 0; i--) {
                const p = trailParticles[i];
                p.y += p.speed;
                p.x += p.drift;
                p.opacity -= 0.03;

                if (p.opacity <= 0) {
                    trailParticles.splice(i, 1);
                }
            }

            const lmx = lastMouseRef.current.x;
            const lmy = lastMouseRef.current.y;
            if (mx !== -1000 && (Math.abs(mx - lmx) > 1 || Math.abs(my - lmy) > 1)) {
                const vx = mx - lmx;
                const vy = my - lmy;
                createTrailParticle(mx, my, vx, vy);
            }

            lastMouseRef.current = { x: mx, y: my };
        };

        const animate = () => {
            draw();
            update();
            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                mouseRef.current = { x: touch.clientX, y: touch.clientY };
            }
        };

        const handleTouchEnd = () => {
            mouseRef.current = { x: -1000, y: -1000 };
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', handleMouseMove);

        window.addEventListener('touchstart', handleTouchMove, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
        window.addEventListener('touchend', handleTouchEnd);

        animate();

        return () => {
            observer.disconnect();
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchstart', handleTouchMove);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-[50]"
            style={{ background: 'transparent' }}
        />
    );
};

export default SnowEffect;
