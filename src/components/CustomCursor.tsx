import { useEffect, useState } from 'react';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

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

    useEffect(() => {
        // Don't add mouse event listeners on mobile
        if (isMobile) return;
        const updatePosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const updateCursorType = () => {
            const hoveredElement = document.elementFromPoint(position.x, position.y);
            if (hoveredElement) {
                const computedStyle = window.getComputedStyle(hoveredElement);
                setIsPointer(
                    computedStyle.cursor === 'pointer' ||
                    hoveredElement.tagName === 'BUTTON' ||
                    hoveredElement.tagName === 'A' ||
                    hoveredElement.closest('button') !== null ||
                    hoveredElement.closest('a') !== null
                );
            }
        };

        const handleMouseDown = () => setIsClicked(true);
        const handleMouseUp = () => setIsClicked(false);

        window.addEventListener('mousemove', updatePosition);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        // Check cursor type on move as well
        window.addEventListener('mousemove', updateCursorType);

        return () => {
            window.removeEventListener('mousemove', updatePosition);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mousemove', updateCursorType);
        };
    }, [position.x, position.y, isMobile]);

    // Don't render custom cursor on mobile devices
    if (isMobile) return null;

    return (
        <div
            className="fixed pointer-events-none z-[9999]"
            style={{
                left: position.x,
                top: position.y,
                transform: `translate(-${isPointer ? '10px' : '0px'}, -${isPointer ? '2px' : '0px'})`, // Adjustment for hand vs arrow tip
            }}
        >
            {/* Glitter Texture Definitions */}
            <svg width="0" height="0">
                <defs>
                    <filter id="glitter" x="0%" y="0%" width="100%" height="100%">
                        <feTurbulence baseFrequency="0.5" result="noise" type="fractalNoise" />
                        <feColorMatrix type="saturate" values="0" />
                        <feComponentTransfer>
                            <feFuncR type="linear" slope="3" intercept="-1" />
                            <feFuncG type="linear" slope="3" intercept="-1" />
                            <feFuncB type="linear" slope="3" intercept="-1" />
                        </feComponentTransfer>
                        <feComposite operator="in" in2="SourceGraphic" />
                    </filter>
                    <linearGradient id="silver-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="50%" stopColor="#e2e8f0" />
                        <stop offset="100%" stopColor="#cbd5e1" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Cursor Shape */}
            <div
                className={`relative transition-transform duration-100 ${isClicked ? 'scale-90' : 'scale-100'}`}
            >
                {isPointer ? (
                    // Hand Cursor
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10.5 16V9C10.5 7.61929 11.6193 6.5 13 6.5C14.3807 6.5 15.5 7.61929 15.5 9V14H16.5V4C16.5 2.61929 17.6193 1.5 19 1.5C20.3807 1.5 21.5 2.61929 21.5 4V14H22.5V6C22.5 4.61929 23.6193 3.5 25 3.5C26.3807 3.5 27.5 4.61929 27.5 6V15.5C27.5 19.3333 26 23 21.5 26.5L16.5 29.5L9.5 24.5C7.5 22.5 7.5 19.5 7.5 17.5V16H10.5Z"
                            fill="url(#silver-gradient)"
                            stroke="#64748b"
                            strokeWidth="1.5"
                        />
                        {/* Sparkle overlay */}
                        <path
                            d="M10.5 16V9C10.5 7.61929 11.6193 6.5 13 6.5C14.3807 6.5 15.5 7.61929 15.5 9V14H16.5V4C16.5 2.61929 17.6193 1.5 19 1.5C20.3807 1.5 21.5 2.61929 21.5 4V14H22.5V6C22.5 4.61929 23.6193 3.5 25 3.5C26.3807 3.5 27.5 4.61929 27.5 6V15.5C27.5 19.3333 26 23 21.5 26.5L16.5 29.5L9.5 24.5C7.5 22.5 7.5 19.5 7.5 17.5V16H10.5Z"
                            fill="white"
                            fillOpacity="0.3"
                            style={{ filter: 'url(#glitter)' }}
                        />
                    </svg>
                ) : (
                    // Arrow Cursor
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M3 3L10.5 25.5L13.5 16.5L22.5 13.5L3 3Z"
                            fill="url(#silver-gradient)"
                            stroke="#64748b"
                            strokeWidth="1.5"
                        />
                        {/* Sparkle overlay */}
                        <path
                            d="M3 3L10.5 25.5L13.5 16.5L22.5 13.5L3 3Z"
                            fill="white"
                            fillOpacity="0.3"
                            style={{ filter: 'url(#glitter)' }}
                        />
                    </svg>
                )}
            </div>
        </div>
    );
};

export default CustomCursor;
