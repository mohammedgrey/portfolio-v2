import FormFieldController from "@/components/form/common/FormFieldController";
import type {
  CommonFieldProps,
  ExtraFieldPropsForInputs,
} from "@/components/form/types";
import { Input } from "@/components/ui/input";
import { type FieldValues } from "react-hook-form";

export type TextFieldProps<T extends FieldValues> = Readonly<
  CommonFieldProps<T> & ExtraFieldPropsForInputs
>;

const TextField = <T extends FieldValues>({
  placeholder,
  InputProps = {},
  ...props
}: TextFieldProps<T>) => {
  return (
    <FormFieldController {...props}>
      {({ field }) => (
        <Input placeholder={placeholder} {...field} {...InputProps} />
      )}
    </FormFieldController>
  );
};

export default TextField;
