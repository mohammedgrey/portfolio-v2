"use client";

import AppSection from "@/components/common/AppSection";
import FormController from "@/components/form/common/FormController";
import RenderFormFields from "@/components/form/renderer/RenderFormFields";
import { type FC } from "react";
import { useForm } from "react-hook-form";

const ContactSection: FC = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  return (
    <AppSection id="contact">
      <FormController
        form={form}
        onSubmit={(data) => {
          console.log(data);
        }}
      >
        <RenderFormFields
          form={form}
          fields={[
            { fieldType: "text", name: "name" },
            { fieldType: "text", name: "email" },
            {
              fieldType: "description",
              name: "message",
              className: "col-span-2",
            },
          ]}
        />
      </FormController>
    </AppSection>
  );
};

export default ContactSection;
