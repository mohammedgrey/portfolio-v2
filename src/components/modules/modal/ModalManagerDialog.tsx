import { Dialog, DialogContent } from "@/components/ui/dialog";
import { type FC, type ReactNode } from "react";

export type ModalManagerDialogProps = Readonly<{
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  preferableWidth?: number;
  position?: "center" | "top-end" | "bottom-end" | "top-start" | "bottom-start";
}>;

const ModalManagerDialog: FC<ModalManagerDialogProps> = ({
  children,
  onClose,
  open,
  preferableWidth = 400,
  position = "center",
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="p-3 py-4"
        style={{ width: `${preferableWidth}px` }}
        position={position}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default ModalManagerDialog;
