import { useEffect, useRef } from 'react';

const AtmosphericBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Add subtle mouse parallax effect
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;

            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;

            containerRef.current.style.setProperty('--mouse-x', `${x}px`);
            containerRef.current.style.setProperty('--mouse-y', `${y}px`);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div
            ref={containerRef}
            className="atmospheric-bg"
            style={{ '--mouse-x': '0px', '--mouse-y': '0px' } as React.CSSProperties}
        >
            {/* Base gradient layer */}
            <div className="atmo-base" />

            {/* Large flowing orbs - deep teal/cyan */}
            <div className="atmo-orb atmo-orb-1" />
            <div className="atmo-orb atmo-orb-2" />
            <div className="atmo-orb atmo-orb-3" />

            {/* Medium orbs - lavender/magenta accents */}
            <div className="atmo-orb atmo-orb-4" />
            <div className="atmo-orb atmo-orb-5" />

            {/* Small accent orbs - soft highlights */}
            <div className="atmo-orb atmo-orb-6" />
            <div className="atmo-orb atmo-orb-7" />

            {/* Aurora wave effects */}
            <div className="aurora-wave aurora-wave-1" />
            <div className="aurora-wave aurora-wave-2" />
            <div className="aurora-wave aurora-wave-3" />

            {/* Grain overlay */}
            <div className="atmo-grain" />

            {/* Soft vignette */}
            <div className="atmo-vignette" />
        </div>
    );
};

export default AtmosphericBackground;
