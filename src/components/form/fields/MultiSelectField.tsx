import { type FieldValues } from "react-hook-form";

import FormFieldController from "@/components/form/common/FormFieldController";
import type { DropdownFieldConfig } from "@/components/form/renderer/types";
import type { CommonFieldProps } from "@/components/form/types";
import MultiSelect from "@/components/ui/multi-select";

export type MultiSelectFieldPrimitiveValue = string | number | boolean;
export type MultiSelectFieldProps<T extends FieldValues> = Readonly<
  CommonFieldProps<T, DropdownFieldConfig<T>>
>;

const MultiSelectField = <T extends FieldValues>({
  placeholder,
  options,
  loading = false,
  clearable = false,
  renderOption,
  ...props
}: MultiSelectFieldProps<T>) => {
  return (
    <FormFieldController {...props}>
      {({ field: { value, ...field }, fieldState }) => (
        <MultiSelect
          aria-invalid={!!fieldState?.error}
          value={value ?? []}
          {...field}
          renderOption={renderOption}
          clearable={clearable}
          disabled={loading || props.disabled}
          placeholder={placeholder}
          options={options.map((option) => {
            const isPrimitiveValue =
              typeof option === "string" ||
              typeof option === "number" ||
              typeof option === "boolean";

            const optionValue = isPrimitiveValue ? option : option.value;
            const optionLabel = isPrimitiveValue
              ? (option as string)
              : option.label;

            return {
              label: optionLabel,
              value: optionValue,
            };
          })}
        />
      )}
    </FormFieldController>
  );
};

export default MultiSelectField;
