import { feedbackModal } from "@/components/modules/modal";
import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAppTranslations } from "@/i18n";
import { AlertCircle, CheckCircle, CircleXIcon } from "lucide-react";
import { type FC, type ReactNode } from "react";

export type FeedbackModalContentProps = Readonly<{
  message: string | ReactNode;
  options?: {
    type?: "success" | "error" | "warning" | "info";
    title?: string;
  };
}>;

const FeedbackModalContent: FC<FeedbackModalContentProps> = ({
  message,
  options = {},
}) => {
  const t = useAppTranslations("Common");

  const { type } = options;
  const title = options.title;

  const icons = {
    success: <CheckCircle />,
    error: <CircleXIcon />,
    warning: <AlertCircle />,
    info: <AlertCircle />,
  };

  return (
    <>
      <AlertDialogHeader>
        {icons[type || "info"]}
        {!!title && <AlertDialogTitle>{title}</AlertDialogTitle>}
        {!!message && (
          <AlertDialogDescription>{message}</AlertDialogDescription>
        )}
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={() => feedbackModal.close()}>
          {t("OK")}
        </AlertDialogCancel>
      </AlertDialogFooter>
    </>
  );
};

export default FeedbackModalContent;
