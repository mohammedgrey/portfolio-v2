import { chatReducer, chatSlice } from "@/store/global/non-persisted/chatSlice";
import {
  persistedSettingsReducer,
  settingsSlice,
} from "@/store/global/persisted/settingsSlice";
import { modalReducer, modalSlice } from "@/store/ui/modalSlice";
import { configureStore } from "@reduxjs/toolkit";
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import { persistStore } from "redux-persist";

const store = configureStore({
  reducer: {
    [modalSlice.reducerPath]: modalReducer,
    [chatSlice.reducerPath]: chatReducer,
    [settingsSlice.reducerPath]: persistedSettingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

export const persistor =
  typeof window !== "undefined" ? persistStore(store) : null;
