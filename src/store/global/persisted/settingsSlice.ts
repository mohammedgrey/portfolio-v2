import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // LocalStorage

export type SettingsStoreType = object;

const initialState: SettingsStoreType = {};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {},
});

export const {} = settingsSlice.actions;

export const persistedSettingsReducer = persistReducer<SettingsStoreType>(
  {
    key: "settings",
    storage,
  },
  settingsSlice.reducer
);
