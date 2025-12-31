import FormFieldController from "@/components/form/common/FormFieldController";
import FormFieldLabelAndDescription from "@/components/form/common/FormFieldLabelAndDescription";
import type { SwitchFieldConfig } from "@/components/form/renderer/types";
import type { CommonFieldProps } from "@/components/form/types";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { type FieldValues } from "react-hook-form";

export type SwitchFieldProps<T extends FieldValues> = Readonly<
  CommonFieldProps<T, SwitchFieldConfig<T>>
>;

const SwitchField = <T extends FieldValues>({
  description,
  label,
  disabled,
  form,
  name,
  containerClassName,
  optional,
  Icon,
}: SwitchFieldProps<T>) => {
  return (
    <FormFieldController
      form={form}
      name={name}
      containerClassName={containerClassName}
      disabled={disabled}
    >
      {({ field: { value, onChange, ...field } }) => (
        <div
          className={cn(
            "aria-invalid:focus-within:ring-[3px]",
            "aria-invalid:ring-destructive/10 dark:aria-invalid:ring-destructive/30 aria-invalid:border-destructive",
            "flex gap-3 p-3 rounded-md border justify-between border-border items-center"
          )}
        >
          <div className="flex gap-4 items-center">
            {!!Icon && (
              <div className="bg-gray-100 border-[1.5px] dark:bg-gray-800 w-10 h-10 rounded-md flex items-center justify-center">
                <Icon className="!w-5 !h-5" />
              </div>
            )}
            <div className="flex flex-col gap-1">
              <FormFieldLabelAndDescription
                label={label}
                description={description}
                optional={optional}
              />
            </div>
          </div>

          <Switch checked={!!value} onCheckedChange={onChange} {...field} />
        </div>
      )}
    </FormFieldController>
  );
};

export default SwitchField;
