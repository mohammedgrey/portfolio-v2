"use client";
import { useAppSelector } from "@/store/store";
import { closeModal } from "@/store/ui/modalSlice";
import { useDispatch } from "react-redux";
import ModalManagerDialog from "./ModalManagerDialog";

const ModalManager = () => {
  const dispatch = useDispatch();
  const { isOpen, content, preferableWidth, position } = useAppSelector(
    (state) => state.modal
  );

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <ModalManagerDialog
      open={isOpen}
      onClose={handleClose}
      preferableWidth={preferableWidth}
      position={position}
    >
      {content}
    </ModalManagerDialog>
  );
};

export default ModalManager;
