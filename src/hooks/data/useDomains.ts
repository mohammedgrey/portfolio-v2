import { useAppTranslations } from "@/i18n";
import { generateDomains } from "./generateDomains";

const useDomains = () => {
  const t = useAppTranslations("Domains");
  const domains = generateDomains(t);

  return {
    domains,
  };
};
export default useDomains;

export type UseDomainsReturn = ReturnType<typeof useDomains>;
