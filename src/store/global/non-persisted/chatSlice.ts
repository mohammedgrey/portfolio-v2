import type { RootState } from "@/store/store";
import { Message } from "@/types/common";

import {
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

export type ChatStoreType = {
  input: string;
  messages: Message[];
  sessionId: string | null;
  loading: boolean;
};

const initialState: ChatStoreType = {
  input: "",
  messages: [],
  loading: false,
  sessionId: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setInput: (state, action: PayloadAction<ChatStoreType["input"]>) => {
      state.input = action.payload;
    },
    setMessages: (state, action: PayloadAction<ChatStoreType["messages"]>) => {
      state.messages = action.payload;
    },
    removeLastErrorMessage: (state) => {
      const lastErrorIndex = [...state.messages]
        .reverse()
        .findIndex((m) => m.role === "error");
      if (lastErrorIndex !== -1) {
        const indexToRemove = state.messages.length - 1 - lastErrorIndex;
        state.messages.splice(indexToRemove, 1);
      }
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    setSessionId: (
      state,
      action: PayloadAction<ChatStoreType["sessionId"]>
    ) => {
      state.sessionId = action.payload;
    },
    setLoading: (state, action: PayloadAction<ChatStoreType["loading"]>) => {
      state.loading = action.payload;
    },
  },
});

export const selectChatInput = (state: RootState) => state.chat.input;
export const selectChatMessages = (state: RootState) => state.chat.messages;
export const selectSessionId = (state: RootState) => state.chat.sessionId;
export const selectChatLoading = (state: RootState) => state.chat.loading;
export const selectLastUserMessage = createSelector(
  [selectChatMessages],
  (messages) =>
    messages
      .slice()
      .reverse()
      .find((m) => m.role === "user")
);

export const {
  setInput,
  setMessages,
  addMessage,
  setSessionId,
  removeLastErrorMessage,
  setLoading,
} = chatSlice.actions;

export const chatReducer = chatSlice.reducer;
