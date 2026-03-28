import { Button } from "@/components/ui/button";
import { personalInfo } from "@/data/personalInfo";
import { useAppTranslations } from "@/i18n";
import { Copy, Mail, Phone } from "lucide-react";
import { type FC } from "react";
import { toast } from "sonner";
import { getContactInfo } from "../utils/errorConfig";

const InMessageContactInfo: FC = () => {
  const t = useAppTranslations();
  const contactInfo = getContactInfo();
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(t("Common.copiedToClipboard"));
  };

  return (
    <div className="flex flex-col gap-2 border-t border-border/50 pt-2.5">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        {t("ContactPage.contactNameThrough", {
          name: personalInfo.firstName,
        })}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {/* Email */}
        <Button
          variant="outline"
          size="sm"
          className="justify-start gap-2 h-auto py-2 px-3"
          onClick={() => copyToClipboard(contactInfo.email)}
        >
          <Mail className="w-4 h-4 shrink-0" />
          <div className="flex-1 text-left min-w-0">
            <p className="text-xs font-medium truncate">{contactInfo.email}</p>
          </div>
          <Copy className="w-3 h-3 shrink-0 opacity-50" />
        </Button>

        {/* Phone */}
        <Button
          variant="outline"
          size="sm"
          className="justify-start gap-2 h-auto py-2 px-3"
          onClick={() => copyToClipboard(contactInfo.phone)}
        >
          <Phone className="w-4 h-4 shrink-0" />
          <div className="flex-1 text-left min-w-0">
            <p className="text-xs font-medium truncate">{contactInfo.phone}</p>
          </div>
          <Copy className="w-3 h-3 shrink-0 opacity-50" />
        </Button>
      </div>

      {/* Social Links */}
      <div className="flex gap-2">
        {contactInfo.socials.map((social) => {
          const iconElement = <social.icon className="w-4 h-4" />;

          return (
            <Button
              key={social.title}
              variant="outline"
              size="sm"
              className="flex-1 gap-2"
              asChild
            >
              <a href={social.link} target="_blank" rel="noopener noreferrer">
                {iconElement}
                <span className="text-xs">{social.title}</span>
              </a>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default InMessageContactInfo;
