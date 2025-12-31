import { feedbackModal } from "@/components/modules/modal";
import { Button, type ButtonProps } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppTranslations } from "@/i18n";
import { useState, type FC, type ReactNode } from "react";

export type ConfirmationModalContentProps = Readonly<{
  message: string | ReactNode;
  options: {
    title?: string;
    onConfirm?: () => void | Promise<void>;
    confirmButtonProps?: ButtonProps;
    cancelButtonProps?: ButtonProps;
  };
}>;

const ConfirmationModalContent: FC<ConfirmationModalContentProps> = ({
  message,
  options = {},
}) => {
  const [loadingConfirm, setLoadingConfirm] = useState(false);
  const t = useAppTranslations("Common");

  const title = options.title;

  const handleConfirm = async () => {
    setLoadingConfirm(true);
    await options.onConfirm?.();
    feedbackModal.close();
    setLoadingConfirm(false);
  };

  return (
    <>
      <DialogHeader>
        {!!title && <DialogTitle>{title}</DialogTitle>}
        {!!message && <DialogDescription>{message}</DialogDescription>}
      </DialogHeader>
      <DialogFooter>
        <Button
          onClick={() => feedbackModal.close()}
          variant="outline"
          className="grow"
          {...options.cancelButtonProps}
        >
          {options.cancelButtonProps?.children || t("close")}
        </Button>

        <Button
          className="grow"
          loading={loadingConfirm}
          onClick={handleConfirm}
          {...options.confirmButtonProps}
        >
          {options.confirmButtonProps?.children || t("confirm")}
        </Button>
      </DialogFooter>
    </>
  );
};

export default ConfirmationModalContent;
