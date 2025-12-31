import { type ReactNode } from "react";
import type { FieldValues, Path, UseControllerReturn } from "react-hook-form";

import FormFieldLabelAndDescription from "@/components/form/common/FormFieldLabelAndDescription";
import type { CommonFieldProps } from "@/components/form/types";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

export type FormFieldControllerProps<T extends FieldValues> = Readonly<
  Omit<CommonFieldProps<T>, "placeholder"> & {
    children: (field: UseControllerReturn<T, Path<T>>) => ReactNode;
  }
>;
const FormFieldController = <T extends FieldValues>({
  form,
  children,
  label,
  name,
  containerClassName,
  description,
  optional = false,
}: FormFieldControllerProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={(fieldProps) => (
        <FormItem className={cn(containerClassName)}>
          <FormFieldLabelAndDescription
            label={label}
            optional={optional}
            description={description}
          />
          <FormControl>{children(fieldProps)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormFieldController;
