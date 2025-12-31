import type { AppSelectOption } from "@/components/form/types";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

// Define the field types supported
export type FieldType =
  | "text"
  | "number"
  | "description"
  | "dropdown"
  | "dropdown-multiple"
  | "custom"
  | "switch";

// Define the base structure of a field configuration
export type FieldConfig<T extends FieldValues> = {
  name: Path<T>;
  fieldType: FieldType;
  optional?: boolean;
  label?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  description?: string;
};

export type DropdownFieldConfig<T extends FieldValues> = FieldConfig<T> & {
  fieldType: "dropdown" | "dropdown-multiple";
  options: AppSelectOption[];
  loading?: boolean;
  clearable?: boolean;
  renderOption?: (option: AppSelectOption) => React.ReactNode;
};

export type SwitchFieldConfig<T extends FieldValues> = Omit<
  FieldConfig<T>,
  "placeholder"
> & {
  fieldType: "switch";
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
};

export type CommonFieldConfig<T extends FieldValues> = FieldConfig<T> & {
  fieldType: Exclude<
    FieldType,
    "dropdown" | "dropdown-multiple" | "date" | "custom"
  >;
};

export type CustomFieldConfig<T extends FieldValues> = Omit<
  FieldConfig<T>,
  "name"
> & {
  fieldType: "custom";
  // Allow any string for custom fields as they may not map directly to form values
  // the name here is just for identification purposes and won't be used in form state (used in key prop)
  name: string;
  render: (props: { form: UseFormReturn<T> }) => React.ReactNode;
};

// A union type for all possible field configurations, ensuring type safety
export type RenderFormField<T extends FieldValues> =
  | CommonFieldConfig<T>
  | DropdownFieldConfig<T>
  | CustomFieldConfig<T>
  | SwitchFieldConfig<T>;
