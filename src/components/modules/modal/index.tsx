import ConfirmationModalContent, {
  type ConfirmationModalContentProps,
} from "@/components/modules/modal/ConfirmationModalContent";
import store from "@/store/store";
import { closeModal, openModal } from "@/store/ui/modalSlice";
import { type ReactNode } from "react";
import FeedbackModalContent, {
  type FeedbackModalContentProps,
} from "./FeedbackModalContent";

export function openModalCustom(
  content: ReactNode,
  {
    preferableWidth,
    position = "center",
  }: {
    preferableWidth?: number;
    position?:
      | "center"
      | "top-end"
      | "bottom-end"
      | "top-start"
      | "bottom-start";
  } = {}
) {
  store.dispatch(openModal({ content, preferableWidth, position }));
}

export function closeActiveModal() {
  store.dispatch(closeModal());
}

export const feedbackModal = (
  message: string | ReactNode,
  options: FeedbackModalContentProps["options"] & {
    preferableWidth?: number;
  } = {}
) => {
  const { preferableWidth, ...restOfOptions } = options;
  openModalCustom(
    <FeedbackModalContent message={message} options={restOfOptions} />,
    {
      preferableWidth,
      position: "center",
    }
  );
};

export const confirmationModal = (
  message: string | ReactNode,
  options: ConfirmationModalContentProps["options"] & {
    preferableWidth?: number;
  } = {}
) => {
  const { preferableWidth, ...restOfOptions } = options;
  openModalCustom(
    <ConfirmationModalContent message={message} options={restOfOptions} />,
    {
      preferableWidth,
      position: "bottom-end",
    }
  );
};

feedbackModal.custom = openModalCustom;
feedbackModal.close = closeActiveModal;

confirmationModal.custom = openModalCustom;
confirmationModal.close = closeActiveModal;

type OptionsWithoutType = Omit<FeedbackModalContentProps["options"], "type">;

feedbackModal.info = (
  message: string | ReactNode,
  options: OptionsWithoutType = {}
) => feedbackModal(message, { type: "info", ...options });
feedbackModal.success = (
  message: string | ReactNode,
  options: OptionsWithoutType = {}
) => feedbackModal(message, { type: "success", ...options });
feedbackModal.warning = (
  message: string | ReactNode,
  options: OptionsWithoutType = {}
) => feedbackModal(message, { type: "warning", ...options });
feedbackModal.error = (
  message: string | ReactNode,
  options: OptionsWithoutType = {}
) => feedbackModal(message, { type: "error", ...options });
