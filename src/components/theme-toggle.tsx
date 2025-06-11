"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isAnimating, setIsAnimating] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  const cycleTheme = () => {
    setIsAnimating(true);

    // Add theme switching animation to body
    document.body.classList.add("theme-switching");

    // Flash effect
    const flash = document.createElement("div");
    flash.className =
      "fixed inset-0 bg-white/20 dark:bg-black/20 z-50 pointer-events-none";
    flash.style.opacity = "0";
    flash.style.transition = "opacity 0.15s ease-in-out";
    document.body.appendChild(flash);

    // Trigger flash
    requestAnimationFrame(() => {
      flash.style.opacity = "1";
      setTimeout(() => {
        flash.style.opacity = "0";
        setTimeout(() => {
          document.body.removeChild(flash);
        }, 150);
      }, 50);
    });

    // Change theme after a short delay for smooth effect
    setTimeout(() => {
      if (theme === "light") {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    }, 100);

    // Remove animation classes
    setTimeout(() => {
      document.body.classList.remove("theme-switching");
      setIsAnimating(false);
    }, 300);
  };

  const getIcon = () => {
    const iconClass = `h-4 w-4 transition-all duration-300 ${
      isAnimating ? "rotate-180 scale-75" : "rotate-0 scale-100"
    }`;

    switch (theme) {
      case "light":
        return <Sun className={iconClass} />;
      case "dark":
        return <Moon className={iconClass} />;
      default:
        return <Sun className={iconClass} />;
    }
  };

  const getTooltipText = () => {
    switch (theme) {
      case "light":
        return "Switch to dark mode";
      case "dark":
        return "Switch to light mode";
      default:
        return "Toggle theme";
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={cycleTheme}
      disabled={isAnimating}
      className={`h-8 w-8 theme-toggle ${isAnimating ? "scale-95" : ""}`}
      title={getTooltipText()}
    >
      {getIcon()}
    </Button>
  );
}
