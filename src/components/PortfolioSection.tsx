import { useState, useEffect } from "react";
import { youtubeReels, youtubeStories, posterImages } from "@/config/cloudinaryVideos";
import YouTubeThumbnail from "./YouTubeThumbnail";
import { PlaySquare, Image as ImageIcon, Film, X } from "lucide-react";

type PortfolioItem = {
  type: "youtube" | "image";
  content: string;
};

const PortfolioSection = () => {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  // Lock scroll and hide navbar when modal is open
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("modal-open");
    } else {
      document.body.style.overflow = "unset";
      document.body.classList.remove("modal-open");
    }
    
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [selectedItem]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedItem(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="portfolio" className="py-12 md:py-24 bg-transparent overflow-hidden border-t border-black/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="font-display text-[24px] md:text-display-sm text-ebon-depth mb-2 md:mb-4 font-semibold tracking-tight">
            Our Work
          </h2>
          <p className="font-body text-[13px] md:text-body text-mist-gray max-w-2xl mx-auto">
            Scroll through our latest creations — tap to watch.
          </p>
        </div>

        <div className="flex flex-col gap-8 md:gap-16">

          {/* Reels Section */}
          <div className="overflow-hidden">
            <div className="flex items-center gap-2 mb-3 md:mb-6 text-ebon-depth">
              <PlaySquare size={16} className="text-mist-gray md:w-5 md:h-5" />
              <h3 className="font-display text-[18px] md:text-[24px] font-semibold tracking-tight">Reels</h3>
            </div>
            <div className={`flex animate-marquee hover:[animation-play-state:paused] gap-3 md:gap-4 pb-4 md:pb-8 w-max ${selectedItem ? "[animation-play-state:paused]" : ""}`}>
              {[...youtubeReels, ...youtubeReels].map((id, index) => (
                <div 
                  key={`reel-${id}-${index}`} 
                  className="w-[140px] md:w-[200px] shrink-0 aspect-[9/16] rounded-lg md:rounded-xl overflow-hidden bg-neutral-900"
                >
                  <YouTubeThumbnail
                    videoId={id}
                    onClick={() => setSelectedItem({ type: "youtube", content: id })}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Creative Posters Section */}
          <div className="overflow-hidden">
            <div className="flex items-center gap-2 mb-3 md:mb-6 text-ebon-depth">
              <ImageIcon size={16} className="text-mist-gray md:w-5 md:h-5" />
              <h3 className="font-display text-[18px] md:text-[24px] font-semibold tracking-tight">Creative Posters</h3>
            </div>
            <div className={`flex animate-marquee-reverse hover:[animation-play-state:paused] gap-3 md:gap-4 pb-4 md:pb-8 w-max ${selectedItem ? "[animation-play-state:paused]" : ""}`}>
              {[...posterImages, ...posterImages, ...posterImages].map((src, index) => (
                <div 
                  key={`poster-${index}`} 
                  className="w-[200px] md:w-[300px] shrink-0 aspect-[4/5] rounded-lg md:rounded-xl overflow-hidden bg-muted border border-black/5 cursor-zoom-in hover:scale-[1.02] transition-transform duration-300"
                  onClick={() => setSelectedItem({ type: "image", content: src })}
                >
                  <img src={src} alt={`Poster ${index + 1}`} className="w-full h-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          </div>

          {/* Motion Stories Section */}
          <div className="overflow-hidden">
            <div className="flex items-center gap-2 mb-3 md:mb-6 text-ebon-depth">
              <Film size={16} className="text-mist-gray md:w-5 md:h-5" />
              <h3 className="font-display text-[18px] md:text-[24px] font-semibold tracking-tight">Motion Stories</h3>
            </div>
            <div className={`flex animate-marquee hover:[animation-play-state:paused] gap-3 md:gap-4 pb-4 md:pb-8 w-max ${selectedItem ? "[animation-play-state:paused]" : ""}`}>
              {[...youtubeStories, ...youtubeStories].map((id, index) => (
                <div 
                  key={`story-${id}-${index}`} 
                  className="w-[140px] md:w-[200px] shrink-0 aspect-[9/16] rounded-lg md:rounded-xl overflow-hidden bg-neutral-900"
                >
                  <YouTubeThumbnail
                    videoId={id}
                    onClick={() => setSelectedItem({ type: "youtube", content: id })}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Overlay — YouTube Embed or Image */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-3 md:p-10 animate-in fade-in duration-300"
          onClick={() => setSelectedItem(null)}
        >
          {/* Close button */}
          <button 
            className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all z-[110]"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedItem(null);
            }}
          >
            <X size={22} />
          </button>
          
          <div 
            className="relative w-full max-w-lg md:max-w-xl h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedItem.type === "youtube" ? (
              <div className="w-full aspect-[9/16] max-h-[85vh] rounded-xl md:rounded-2xl overflow-hidden shadow-2xl bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedItem.content}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                  title="YouTube video player"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  frameBorder="0"
                />
              </div>
            ) : (
              <img 
                src={selectedItem.content} 
                alt="Full preview" 
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default PortfolioSection;
