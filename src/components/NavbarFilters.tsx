export const NavbarFilters = () => (
  <>
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

    {/* Procedural Liquid Effect Filter (Optimized) */}
    <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
      <filter id="switcher-filter" primitiveUnits="objectBoundingBox">
        <feTurbulence 
          type="fractalNoise" 
          baseFrequency="0.01 0.1" 
          numOctaves="1" 
          result="noise" 
        />
        <feGaussianBlur in="SourceGraphic" stdDeviation="0.04" result="blur" />
        <feDisplacementMap
          id="disp"
          in="blur"
          in2="noise"
          scale="0.5"
          xChannelSelector="R"
          yChannelSelector="G">
        </feDisplacementMap>
      </filter>
    </svg>
  </>
);
