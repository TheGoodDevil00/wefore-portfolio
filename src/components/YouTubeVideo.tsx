import { useState, useRef } from 'react';

interface YouTubeVideoProps {
    videoId: string;
    className?: string;
}

const YouTubeVideo = ({ videoId, className = '' }: YouTubeVideoProps) => {
    const [isHovering, setIsHovering] = useState(false);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        // Small delay before loading iframe to prevent accidental triggers
        hoverTimeoutRef.current = setTimeout(() => {
            setIsHovering(true);
        }, 200);
    };

    const handleMouseLeave = () => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }
        setIsHovering(false);
    };

    return (
        <div
            className={`relative w-full h-full ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Thumbnail - always visible as base layer */}
            <img
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                alt="YouTube video thumbnail"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isHovering ? 'opacity-0' : 'opacity-100'}`}
                onError={(e) => {
                    // Fallback to hqdefault if maxresdefault not available
                    e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                }}
            />

            {/* YouTube iframe - loads on hover for preview */}
            {isHovering && (
                <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&modestbranding=1&rel=0&enablejsapi=1`}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    title="YouTube video preview"
                    style={{ border: 'none' }}
                />
            )}
        </div>
    );
};

export default YouTubeVideo;
