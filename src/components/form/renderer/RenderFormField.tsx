import MultiSelectField from "@/components/form/fields/MultiSelectField";
import NumberField from "@/components/form/fields/NumberField";
import SelectField from "@/components/form/fields/SelectField";
import SwitchField from "@/components/form/fields/SwitchField";
import TextareaField from "@/components/form/fields/TextareaField";
import TextField from "@/components/form/fields/TextField";
import RenderLoadingField from "@/components/form/renderer/RenderLoadingField";
import type { CommonFieldProps } from "@/components/form/types";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { type RenderFormField as RenderFormFieldType } from "./types";

export type RenderFormFieldProps<T extends FieldValues> = Readonly<{
  field: RenderFormFieldType<T>;
  form: UseFormReturn<T>;
  isLoading?: boolean;
}>;

const RenderFormField = <T extends FieldValues>({
  field,
  form,
  isLoading = false,
}: RenderFormFieldProps<T>) => {
  const { name, fieldType, className } = field;

  const commonFieldProps = {
    ...field,
    form,
    name: name as Path<T>,
    containerClassName: className,
  } satisfies CommonFieldProps<T>;

  if (isLoading) {
    return <RenderLoadingField key={name} field={field} />;
  }

  switch (fieldType) {
    case "text":
      return <TextField {...commonFieldProps} />;
    case "number":
      return <NumberField {...commonFieldProps} />;
    case "description":
      return <TextareaField {...commonFieldProps} />;
    case "dropdown":
      return <SelectField {...commonFieldProps} options={field.options} />;
    case "dropdown-multiple":
      return <MultiSelectField {...commonFieldProps} options={field.options} />;
    case "switch":
      return <SwitchField {...commonFieldProps} />;
    case "custom":
      return field.render({ form });

    default:
      return null;
  }
};

export default RenderFormField;
