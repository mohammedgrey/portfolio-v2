"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import { useLocalStorage } from "usehooks-ts";

const primaryColors = [
  {
    name: "grey",
    value: "oklch(0.3846 0.0173 258.37)",
    class: "bg-[oklch(0.3846_0.0173_258.37)]",
  },
  {
    name: "blue",
    value: "oklch(0.8 0.15 230)",
    class: "bg-[oklch(0.8_0.15_230)]",
  },
  {
    name: "green",
    value: "oklch(0.75 0.12 160)",
    class: "bg-[oklch(0.75_0.12_160)]",
  },
  {
    name: "purple",
    value: "oklch(0.7 0.18 280)",
    class: "bg-[oklch(0.7_0.18_280)]",
  },
  {
    name: "orange",
    value: "oklch(0.8 0.15 70)",
    class: "bg-[oklch(0.8_0.15_70)]",
  },
  {
    name: "red",
    value: "oklch(0.75 0.12 40)",
    class: "bg-[oklch(0.75_0.12_40)]",
  },
] as const;

type PrimaryColor = (typeof primaryColors)[number];

type PrimaryColorContextType = {
  primaryColors: typeof primaryColors;
  currentColor: PrimaryColor;
  setCurrentColor: (color: PrimaryColor) => void;
};

const PrimaryColorContext = createContext<PrimaryColorContextType | undefined>(
  undefined
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
      "usePrimaryColor must be used within a PrimaryColorProvider"
    );
  }
  return context;
}

// Export the colors for use in other components if needed
export { primaryColors, type PrimaryColor };
