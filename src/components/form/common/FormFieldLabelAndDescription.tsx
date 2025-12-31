import { FormDescription, FormLabel } from "@/components/ui/form";
import { type FC } from "react";

export type FormFieldLabelAndDescriptionProps = Readonly<{
  label?: string;
  optional?: boolean;
  description?: string;
}>;
const FormFieldLabelAndDescription: FC<FormFieldLabelAndDescriptionProps> = ({
  label,
  optional,
  description,
}) => {
  return (
    <>
      {!!label && (
        <FormLabel>
          <span key="label">{label}</span>
          {optional && (
            <span className="font-light" key="optional">
              &nbsp;(Optional)
            </span>
          )}
        </FormLabel>
      )}
      {!!description && <FormDescription>{description}</FormDescription>}
    </>
  );
};

export default FormFieldLabelAndDescription;
