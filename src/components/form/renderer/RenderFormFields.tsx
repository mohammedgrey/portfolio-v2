import { cn } from "@/lib/utils";
import { type FieldValues, type UseFormReturn } from "react-hook-form";
import RenderFormField from "./RenderFormField";
import { type RenderFormField as RenderFormFieldType } from "./types";

export type RenderFormFieldsProps<T extends FieldValues> = Readonly<{
  fields: RenderFormFieldType<T>[];
  form: UseFormReturn<T>;
  className?: string;
  isLoading?: boolean;
}>;

const RenderFormFields = <T extends FieldValues>({
  fields,
  form,
  className,
  isLoading = false,
}: RenderFormFieldsProps<T>) => {
  return (
    <div className={cn("grid grid-cols-2 gap-4", className)}>
      {fields.map((field) => {
        return (
          <RenderFormField
            key={field.name}
            field={field}
            form={form}
            isLoading={isLoading}
          />
        );
      })}
    </div>
  );
};

export default RenderFormFields;
