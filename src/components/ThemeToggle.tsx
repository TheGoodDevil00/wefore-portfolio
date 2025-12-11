import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
    const { theme, setTheme } = useTheme();
    const isDark = theme === "dark";

    return (
        <button
            className={cn("liquid-toggle", className)}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-pressed={isDark}
            aria-label="Toggle theme"
        >
            {/* The sliding thumb */}
            <span className="thumb" />

            {/* Icons */}
            <span className="toggle-icons">
                <Sun className="sun-icon" />
                <Moon className="moon-icon" />
            </span>
        </button>
    );
}
