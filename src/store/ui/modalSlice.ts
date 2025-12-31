import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ReactNode } from "react";

interface ModalState {
  isOpen: boolean;
  content: ReactNode | null;
  preferableWidth?: number;
  position: "center" | "top-end" | "bottom-end" | "top-start" | "bottom-start";
}

const initialState: ModalState = {
  isOpen: false,
  content: null,
  preferableWidth: undefined,
  position: "center",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{
        content: ReactNode;
        preferableWidth?: number;
        position?: ModalState["position"];
      }>
    ) => {
      state.isOpen = true;
      state.content = action.payload.content;
      state.preferableWidth = action.payload.preferableWidth;
      state.position = action.payload.position ?? "center";
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.content = null;
      state.position = "center";
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
