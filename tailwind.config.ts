import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "var(--color-whisper-white)",
        foreground: "var(--color-ebon-depth)",
        "ebon-depth": "var(--color-ebon-depth)",
        "whisper-white": "var(--color-whisper-white)",
        "midnight-oil-stain": "var(--color-midnight-oil-stain)",
        "onyx-shadow": "var(--color-onyx-shadow)",
        "mist-gray": "var(--color-mist-gray)",
        "steel-glimmer": "var(--color-steel-glimmer)",
        "amber-glow": "var(--color-amber-glow)",
        "sunset-gradient-base": "var(--color-sunset-gradient)",
        "earthfire-gradient-base": "var(--color-earthfire-gradient)",
        "sky-gradient-base": "var(--color-sky-gradient)",
        primary: {
          DEFAULT: "var(--color-ebon-depth)",
          foreground: "var(--color-whisper-white)",
        },
        secondary: {
          DEFAULT: "var(--color-mist-gray)",
          foreground: "var(--color-onyx-shadow)",
        },
        muted: {
          DEFAULT: "rgba(153, 161, 175, 0.06)",
          foreground: "var(--color-mist-gray)",
        },
        accent: {
          DEFAULT: "var(--color-amber-glow)",
          foreground: "var(--color-ebon-depth)",
        },
        card: {
          DEFAULT: "var(--color-whisper-white)",
          foreground: "var(--color-onyx-shadow)",
        },
      },
      backgroundImage: {
        'sky-gradient': 'var(--gradient-sky-gradient)',
        'amber-glow-radial': 'var(--gradient-amber-glow)',
        'sunset-gradient': 'var(--gradient-sunset-gradient)',
        'earthfire-gradient': 'var(--gradient-earthfire-gradient)',
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "calc(var(--radius-lg) - 2px)",
        sm: "calc(var(--radius-lg) - 4px)",
        "2xl": "var(--radius-2xl)",
        "full-btn": "var(--radius-full)",
        "pill": "var(--radius-full-2)",
      },
      fontSize: {
        'caption': ['12px', { lineHeight: '1.2' }],
        'body': ['16px', { lineHeight: '1.3', letterSpacing: '-0.16px' }],
        'subheading': ['20px', { lineHeight: '1.15', letterSpacing: '-0.2px' }],
        'heading': ['32px', { lineHeight: '1.15', letterSpacing: '-0.32px' }],
        'display-sm': ['64px', { lineHeight: '1.05', letterSpacing: '-1.28px' }],
        'display': ['72px', { lineHeight: '1.05', letterSpacing: '-1.44px' }],
      },
      spacing: {
        4: "4px",
        6: "6px",
        8: "8px",
        10: "10px",
        12: "12px",
        16: "16px",
        20: "20px",
        24: "24px",
        26: "26px",
        32: "32px",
        48: "48px",
        52: "52px",
        56: "56px",
        64: "64px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
