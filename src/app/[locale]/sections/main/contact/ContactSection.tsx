"use client";

import AppSection from "@/components/common/AppSection";
import { useAppTranslations } from "@/i18n";
import { type FC } from "react";
import ContactDivider from "./ContactDivider";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";

const ContactSection: FC = () => {
  const t = useAppTranslations("ContactPage");

  return (
    <AppSection id="contact" className="overflow-x-hidden py-20">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <AppSection.Title className="text-4xl mb-4">
            {t("title")}
          </AppSection.Title>
          <AppSection.Description className="text-lg max-w-2xl mx-auto">
            {t("subtitle")}
          </AppSection.Description>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 max-w-6xl mx-auto relative">
          {/* Right: Contact Form */}
          <div className="order-1 lg:order-2">
            <ContactForm />
          </div>

          {/* Divider with OR */}
          <ContactDivider />

          {/* Left: Contact Info */}
          <div className="order-3 lg:order-1">
            <ContactInfo />
          </div>
        </div>
      </div>
    </AppSection>
  );
};

export default ContactSection;
