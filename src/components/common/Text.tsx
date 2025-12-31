import { useAppTranslations } from "@/i18n";
import { TranslationKey } from "@/i18n/types";
import { cn } from "@/lib/utils";
import { type FC, type HTMLAttributes } from "react";

// Base type definitions
type ComponentType =
  | "p"
  | "span"
  | "div"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6";
type VariantType =
  | "main"
  | "description"
  | "primary"
  | "dimmed"
  | "muted"
  | "destructive";
type SizeType =
  | "xxs"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl";
type WeightType =
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold"
  | "black";

export type TextProps = Readonly<
  HTMLAttributes<HTMLElement> & {
    as?: ComponentType;
    children?: React.ReactNode;
    translationKey?: TranslationKey;
    variant?: VariantType;
    size?: SizeType;
    weight?: WeightType;
  }
>;
const Text: FC<TextProps> = ({
  as = "p",
  children,
  translationKey,
  variant = "main",
  size = "md",
  weight = "normal",
  ...props
}) => {
  const t = useAppTranslations();

  const text = translationKey ? t(translationKey) : children;
  const Component = as;

  return (
    <Component
      {...props}
      className={cn(
        {
          "text-foreground": variant === "main",
          "text-primary": variant === "primary",
          "text-description": variant === "description",
          "text-dimmed": variant === "dimmed",
          "text-muted": variant === "muted",
          "text-destructive": variant === "destructive",
        },
        {
          "text-[10px]": size === "xxs",
          "text-xs": size === "xs",
          "text-sm": size === "sm",
          "text-base": size === "md",
          "text-lg": size === "lg",
          "text-xl": size === "xl",
          "text-2xl": size === "2xl",
          "text-3xl": size === "3xl",
          "text-4xl": size === "4xl",
          "text-5xl": size === "5xl",
          "text-6xl": size === "6xl",
        },
        {
          "font-light": weight === "light",
          "font-normal": weight === "normal",
          "font-medium": weight === "medium",
          "font-semibold": weight === "semibold",
          "font-bold": weight === "bold",
          "font-extrabold": weight === "extrabold",
          "font-black": weight === "black",
        },
        props.className
      )}
    >
      {text}
    </Component>
  );
};

export default Text;
