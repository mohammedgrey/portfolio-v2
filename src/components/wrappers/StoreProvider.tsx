"use client";
import { useIsHydrated } from "@/hooks/common/useIsHydrated";
import store, { persistor } from "@/store/store";
import { type FC } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export type StoreProviderProps = Readonly<{
  children: React.ReactNode;
}>;
const StoreProvider: FC<StoreProviderProps> = ({ children }) => {
  const isHydrated = useIsHydrated();

  // Always render Provider, but conditionally wrap with PersistGate
  if (!isHydrated || !persistor) {
    return <Provider store={store}>{children}</Provider>;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  );
};

export default StoreProvider;
