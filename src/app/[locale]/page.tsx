import { setRequestLocale } from "next-intl/server";
import AppHeader from "./sections/header/AppHeader";
import ContactSection from "./sections/main/contact/ContactSection";
import GenerateSection from "./sections/main/generate/GenerateSection";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  return (
    <>
      <AppHeader />
      <main className="flex flex-col gap-8">
        {/* <HeroSection />
        <StackSection />
        <ProjectsSection /> */}
        <GenerateSection />
        <ContactSection />
      </main>
      {/* <AppFooter /> */}
    </>
  );
}
