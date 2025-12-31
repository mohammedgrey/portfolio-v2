import type { RenderFormField } from "@/components/form/renderer/types";
import { FormDescription, FormItem, FormLabel } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import type { FieldValues } from "react-hook-form";

export type RenderLoadingFieldProps<T extends FieldValues> = Readonly<{
  field: RenderFormField<T>;
}>;

const RenderLoadingField = <T extends FieldValues>({
  field,
}: RenderLoadingFieldProps<T>) => {
  return (
    <FormItem className={field.className}>
      {!!field.label && <FormLabel>{field.label}</FormLabel>}
      <Skeleton
        style={{
          height: field.fieldType === "description" ? 102 : 40,
          width: "100%",
        }}
      />
      {!!field.description && (
        <FormDescription>{field.description}</FormDescription>
      )}
    </FormItem>
  );
};

export default RenderLoadingField;
