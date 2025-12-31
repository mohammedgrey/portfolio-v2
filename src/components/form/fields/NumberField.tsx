import { type FieldValues } from "react-hook-form";

import FormFieldController from "@/components/form/common/FormFieldController";
import type {
  CommonFieldProps,
  ExtraFieldPropsForInputs,
} from "@/components/form/types";
import { Input } from "@/components/ui/input";

export type NumberFieldProps<T extends FieldValues> = Readonly<
  CommonFieldProps<T> & ExtraFieldPropsForInputs
>;

const NumberField = <T extends FieldValues>({
  placeholder,
  InputProps = {},
  ...props
}: NumberFieldProps<T>) => {
  return (
    <FormFieldController {...props}>
      {({ field: { onChange, ...field } }) => (
        <Input
          type="number"
          placeholder={placeholder}
          onChange={(e) => {
            onChange(Number(e.target.value));
          }}
          {...field}
          {...InputProps}
        />
      )}
    </FormFieldController>
  );
};

export default NumberField;
