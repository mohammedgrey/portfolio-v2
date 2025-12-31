import type { FieldConfig } from "@/components/form/renderer/types";
import type { InputProps } from "@/components/ui/input";
import type { ReactNode } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";

export type MultiStepFormStep = {
  label: string;
  content: ReactNode;
  validate?: () => Promise<boolean> | boolean;
};

export type CommonFieldProps<
  T extends FieldValues,
  U extends FieldConfig<T> = FieldConfig<T>
> = Omit<U, "fieldType"> & {
  form: UseFormReturn<T>;
  containerClassName?: string;
};

export type ExtraFieldPropsForInputs = {
  InputProps?: {
    startAdornment?: InputProps["startAdornment"];
    endAdornment?: InputProps["endAdornment"];
  };
};

export type AppSelectOptionValue = number | string | boolean;
export type AppSelectOption =
  | AppSelectOptionValue
  | {
      label: string;
      value: AppSelectOptionValue;
    };
