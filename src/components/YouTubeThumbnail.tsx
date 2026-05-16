import { useState } from 'react';
import { Play } from 'lucide-react';

interface YouTubeThumbnailProps {
  videoId: string;
  className?: string;
  onClick?: () => void;
}

/**
 * Renders a YouTube video thumbnail with a play icon overlay.
 * Uses maxresdefault with fallback to hqdefault.
 */
const YouTubeThumbnail = ({ videoId, className = '', onClick }: YouTubeThumbnailProps) => {
  const [imgSrc, setImgSrc] = useState(
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  );

  return (
    <div 
      className={`relative w-full h-full group cursor-pointer ${className}`}
      onClick={onClick}
    >
      <img
        src={imgSrc}
        alt="Video thumbnail"
        className="w-full h-full object-cover"
        loading="lazy"
        onError={() => {
          // Fallback to hqdefault if maxres is unavailable
          setImgSrc(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
        }}
      />
      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors duration-300">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
          <Play size={20} className="text-black ml-0.5" fill="black" />
        </div>
      </div>
    </div>
  );
};

export default YouTubeThumbnail;
