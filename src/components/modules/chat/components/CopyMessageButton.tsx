import { CopyIcon } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppTranslations } from "@/i18n";
import { CheckIcon } from "lucide-react";
import { useState, type FC } from "react";
import { toast } from "sonner";

export type CopyMessageButtonProps = Readonly<{
  content: string;
  tooltipText?: string;
}>;

const CopyMessageButton: FC<CopyMessageButtonProps> = ({
  content,
  tooltipText,
}) => {
  const t = useAppTranslations("Common");
  const [justCopied, setJustCopied] = useState(false);
  const Icon = justCopied ? CheckIcon : CopyIcon;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          disabled={justCopied}
          variant="ghost"
          className="h-6 w-6 rounded-sm"
          size="icon"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(content);
              toast.success(t("copiedToClipboard"));
              setJustCopied(true);
              setTimeout(() => setJustCopied(false), 2000);
            } catch (err) {
              console.error("Failed to copy text: ", err);
            }
          }}
        >
          <Icon className="h-4! w-4! text-gray-600 dark:text-gray-400" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{tooltipText || t("copy")}</TooltipContent>
    </Tooltip>
  );
};

export default CopyMessageButton;
