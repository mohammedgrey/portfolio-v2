import { getAppTranslations } from "@/i18n";
import { generateDomains } from "./generateDomains";

const getDomains = async () => {
  const t = await getAppTranslations("Domains");
  const domains = generateDomains(t);

  return { domains };
};

export default getDomains;

export type GetDomainsReturn = Awaited<ReturnType<typeof getDomains>>;
