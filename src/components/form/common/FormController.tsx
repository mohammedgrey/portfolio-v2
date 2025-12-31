import type { HTMLAttributes, ReactNode } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";

import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";

export type FormControllerProps<T extends FieldValues> = Readonly<
  Omit<HTMLAttributes<HTMLFormElement>, "onSubmit"> & {
    form: UseFormReturn<T>;
    onSubmit: (values: T) => Promise<void> | void;
    children: ReactNode;
    errorMessageClassName?: string;
  }
>;
const FormController = <T extends FieldValues>({
  form,
  onSubmit,
  children,
  errorMessageClassName = "",
  ...props
}: FormControllerProps<T>) => {
  return (
    <Form {...form}>
      <form
        onChange={() => {
          form.setError("root", { message: "" });
        }}
        onSubmit={form.handleSubmit(onSubmit, console.error)}
        {...props}
        className={cn("space-y-4", props.className)}
      >
        {children}

        {form.formState.errors.root?.message && (
          <p
            className={cn(
              "text-center font-semibold text-destructive",
              errorMessageClassName
            )}
          >
            {form.formState.errors.root.message}
          </p>
        )}
      </form>
    </Form>
  );
};

export default FormController;
