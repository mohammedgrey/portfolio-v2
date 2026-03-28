"use client";
import { CircleCheck } from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  return (
    <Sonner
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      className="toaster group"
      icons={{
        success: <CircleCheck className="size-4 text-success" />,
      }}
      style={
        {
          // Background colors for different toast types
          // Using gray shades that adapt to light/dark mode
          "--normal-bg": isDarkMode
            ? "var(--color-gray-800)"
            : "var(--background)",
          "--success-bg": isDarkMode
            ? "var(--color-gray-800)"
            : "var(--background)",
          "--error-bg": isDarkMode
            ? "var(--color-gray-800)"
            : "var(--background)",
          "--warning-bg": isDarkMode
            ? "var(--color-gray-800)"
            : "var(--background)",
          "--info-bg": isDarkMode
            ? "var(--color-gray-800)"
            : "var(--background)",

          // Border colors for different toast types
          "--normal-border": "var(--border)",
          "--success-border": "var(--border)",
          "--error-border": "var(--border)",
          "--warning-border": "var(--border)",
          "--info-border": "var(--border)",

          // Text colors
          "--normal-text": "var(--foreground)",
          "--success-text": "var(--foreground)",
          "--error-text": "var(--foreground)",
          "--warning-text": "var(--foreground)",
          "--info-text": "var(--foreground)",

          // Icon color customization
          "--error-icon": "var(--destructive)",
          "--warning-icon": "var(--warning)",
          "--info-icon": "var(--primary)",
          "--loading-icon": "var(--muted-foreground)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
