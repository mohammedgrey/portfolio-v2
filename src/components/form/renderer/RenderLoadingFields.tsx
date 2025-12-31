import RenderLoadingField from "@/components/form/renderer/RenderLoadingField";
import type { RenderFormField } from "@/components/form/renderer/types";
import { type FieldValues } from "react-hook-form";

export type RenderLoadingFieldsProps<T extends FieldValues> = Readonly<{
  fields: RenderFormField<T>[];
  className?: string;
}>;

const RenderLoadingFields = <T extends FieldValues>({
  fields,
  className,
}: RenderLoadingFieldsProps<T>) => {
  return (
    <div className={className}>
      {fields.map((field) => {
        return <RenderLoadingField key={field.name} field={field} />;
      })}
    </div>
  );
};

export default RenderLoadingFields;
