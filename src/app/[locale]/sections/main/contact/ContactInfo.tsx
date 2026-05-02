"use client";

import AppSection from "@/components/common/AppSection";
import { Button } from "@/components/ui/button";
import { personalInfo } from "@/data/personalInfo";
import { socials } from "@/data/socials";
import { useAppTranslations } from "@/i18n";
import { AnalyticsEvent, trackEvent } from "@/lib/analytics";
import { ArrowUpRight, Check, Copy, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { type FC, useState } from "react";
import { toast } from "sonner";

interface ContactItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  link?: string;
}

const ContactItem: FC<ContactItemProps> = ({ icon, label, value, link }) => {
  const [copied, setCopied] = useState(false);
  const t = useAppTranslations("ContactPage");

  const handleCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    await navigator.clipboard.writeText(value);
    setCopied(true);
    toast.success(t("copiedToClipboard"));
    trackEvent(AnalyticsEvent.ContactCopyClick, { field: label });
    setTimeout(() => setCopied(false), 2000);
  };

  const content = (
    <article className="group relative isolate w-full min-w-0 cursor-pointer overflow-hidden rounded-2xl border border-border/60 bg-card p-4 transition-colors duration-200 focus-visible:outline-none">
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-70"
        style={{
          background:
            "radial-gradient(circle at 50% 20%, color-mix(in srgb, var(--color-background) 68%, transparent), transparent 60%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-200 group-hover:opacity-70 dark:hidden"
        style={{
          background:
            "radial-gradient(circle at 50% 65%, color-mix(in oklch, var(--color-primary) 18%, white), transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 hidden opacity-0 transition-opacity duration-200 dark:block dark:group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at 50% 65%, color-mix(in srgb, var(--color-primary) 15%, transparent), transparent 70%)",
        }}
      />
      <div className="pointer-events-none absolute -right-7 -top-7 z-0 h-20 w-20 rounded-full bg-primary/8 blur-2xl" />

      <div className="relative z-10 flex items-center gap-3">
        <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {label}
          </p>
          <p className="mt-1 truncate text-sm font-medium text-foreground/95">
            {value}
          </p>
        </div>

        {link && (
          <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
        )}

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          className="h-8 w-8 shrink-0 rounded-lg border border-transparent transition-colors group-hover:border-border/80"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>
      </div>
    </article>
  );

  if (link) {
    return (
      <Link
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full min-w-0 focus-visible:outline-none"
      >
        {content}
      </Link>
    );
  }

  return content;
};

const ContactInfo: FC = () => {
  const t = useAppTranslations("ContactPage");

  return (
    <div className="space-y-6">
      <div>
        <AppSection.Subtitle className="mb-2">
          {t("contactThrough")}
        </AppSection.Subtitle>
        <AppSection.Description className="text-muted-foreground/90">
          {t("contactThroughDesc")}
        </AppSection.Description>
      </div>

      <div className="grid min-w-0 gap-3">
        {/* Email */}
        <ContactItem
          icon={<Mail className="h-5 w-5" />}
          label={t("email")}
          value={personalInfo.email}
          link={`mailto:${personalInfo.email}`}
        />

        {/* Phone */}
        <ContactItem
          icon={<Phone className="h-5 w-5" />}
          label={t("phone")}
          value={personalInfo.phone}
          link={`tel:${personalInfo.phone}`}
        />

        {/* Social Links */}
        {socials.map((social) => {
          const iconElement = <social.icon className="h-5 w-5" />;

          return (
            <ContactItem
              key={social.title}
              icon={iconElement}
              label={social.title}
              value={social.link}
              link={social.link}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ContactInfo;
