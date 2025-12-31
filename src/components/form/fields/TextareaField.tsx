import FormFieldController from "@/components/form/common/FormFieldController";
import type { CommonFieldProps } from "@/components/form/types";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { type FieldValues } from "react-hook-form";

export type TextareaFieldProps<T extends FieldValues> = Readonly<
  CommonFieldProps<T>
>;

const TextareaField = <T extends FieldValues>({
  placeholder,
  ...props
}: TextareaFieldProps<T>) => {
  return (
    <FormFieldController {...props}>
      {({ field }) => (
        <Textarea
          placeholder={placeholder}
          rows={4}
          {...field}
          className={cn("resize-none")}
        />
      )}
    </FormFieldController>
  );
};

export default TextareaField;
