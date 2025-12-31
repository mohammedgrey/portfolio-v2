import { useLocale } from "next-intl";

const useCurrentLocale = () => {
  const currentLocale = useLocale();
  const isEn = currentLocale?.includes("en") || false;
  const isAr = currentLocale?.includes("ar") || false;
  const isRtl = isAr;

  return { currentLocale, isRtl, isEn, isAr };
};
export default useCurrentLocale;

export type UseCurrentLocaleReturn = ReturnType<typeof useCurrentLocale>;
