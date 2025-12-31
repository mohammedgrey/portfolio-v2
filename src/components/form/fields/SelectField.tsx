import FormFieldController from "@/components/form/common/FormFieldController";
import type { DropdownFieldConfig } from "@/components/form/renderer/types";
import type { CommonFieldProps } from "@/components/form/types";
import SingleSelect from "@/components/ui/single-select";

import { type FieldValues } from "react-hook-form";

export type SelectFieldPrimitiveValue = string | number | boolean;
export type SelectFieldProps<T extends FieldValues> = Readonly<
  CommonFieldProps<T, DropdownFieldConfig<T>>
>;

const SelectField = <T extends FieldValues>({
  options,
  placeholder,
  clearable = false,
  loading = false,
  renderOption,
  ...props
}: SelectFieldProps<T>) => {
  return (
    <FormFieldController {...props}>
      {({ field: { ...field }, fieldState }) => (
        <SingleSelect
          aria-invalid={!!fieldState?.error}
          {...field}
          clearable={clearable}
          renderOption={renderOption}
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

export default SelectField;
