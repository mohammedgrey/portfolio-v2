"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import { useLocalStorage } from "usehooks-ts";

const primaryColors = [
  {
    name: "blue",
    value: "oklch(0.52 0.12 250)",
    class: "bg-[oklch(0.52_0.12_250)]",
  },
  {
    name: "green",
    value: "oklch(0.5 0.11 165)",
    class: "bg-[oklch(0.5_0.11_165)]",
  },
  {
    name: "purple",
    value: "oklch(0.5774 0.2091 273.85)",
    class: "bg-[oklch(0.5774_0.2091_273.85)]",
  },
  {
    name: "orange",
    value: "oklch(0.5774 0.1085 65.65)",
    class: "bg-[oklch(0.5774_0.1085_65.65)]",
  },
  {
    name: "red",
    value: "oklch(0.52 0.13 20)",
    class: "bg-[oklch(0.52_0.13_20)]",
  },
] as const;

type PrimaryColor = (typeof primaryColors)[number];

type PrimaryColorContextType = {
  primaryColors: typeof primaryColors;
  currentColor: PrimaryColor;
  setCurrentColor: (color: PrimaryColor) => void;
};

const PrimaryColorContext = createContext<PrimaryColorContextType | undefined>(
  undefined,
);

const DEFAULT_COLOR = primaryColors[0];
const STORAGE_KEY = "primary-color";

function applyColor(color: PrimaryColor) {
  if (typeof document === "undefined") return;

  document.documentElement.style.setProperty("--primary", color.value);
}

export function PrimaryColorProvider({ children }: { children: ReactNode }) {
  const [storedColorName, setStoredColorName] = useLocalStorage<
    PrimaryColor["name"]
  >(STORAGE_KEY, DEFAULT_COLOR.name);

  // Find the current color object from the stored name
  const currentColor =
    primaryColors.find((color) => color.name === storedColorName) ||
    DEFAULT_COLOR;

  // Apply color whenever it changes
  useEffect(() => {
    applyColor(currentColor);
  }, [currentColor]);

  const setCurrentColor = (color: PrimaryColor) => {
    setStoredColorName(color.name);
  };

  const value: PrimaryColorContextType = {
    primaryColors,
    currentColor,
    setCurrentColor,
  };

  return (
    <PrimaryColorContext.Provider value={value}>
      {children}
    </PrimaryColorContext.Provider>
  );
}

export function usePrimaryColor() {
  const context = useContext(PrimaryColorContext);
  if (context === undefined) {
    throw new Error(
      "usePrimaryColor must be used within a PrimaryColorProvider",
    );
  }
  return context;
}

// Export the colors for use in other components if needed
export { primaryColors, type PrimaryColor };
