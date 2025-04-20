"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { LocaleKeyType } from "@/literals/language";
import HomeHeader from "@/src/components/Header/HomeHeader";
import About from "@/src/components/RightBottom/Footer/About";
import Contact from "@/src/components/RightBottom/Footer/Contact";
import CopyRight from "@/src/components/RightBottom/Footer/CopyRight";
import ForDevelopers from "@/src/components/RightBottom/Footer/ForDevelopers";
import Footer from "@/src/components/RightBottom/Footer/Modal";
import PrivacyPolicy from "@/src/components/RightBottom/Footer/PrivacyPolicy";
import Terms from "@/src/components/RightBottom/Footer/Terms";
import Who from "@/src/components/RightBottom/Footer/Who";
import LanguageSwitchModal from "@/src/components/RightBottom/Language/Modal";
import Sponsors from "@/src/components/RightBottom/Sponsors/Modal";
import { ModalOpenType } from "@/src/types/modals";
import { defaultCreatorDetails } from "@/src/utils/defaultData/creators";

const Home = ({ locale }: { locale: LocaleKeyType }) => {
  const [isWireFrame, setIsWireFrame] = useState<boolean>(false);

  const [modalOpen, setModalOpen] = useState<ModalOpenType>({
    terms: false,
    privacy: false,
    contact: false,
    about: false,
    who: false,
    forDevelopers: false,
    forSponsors: false,
    lightAndDarkTheme: false,
    language: false,
    footer: false,
    sponsors: false,
    shareThisPage: false,
    copyRight: false,
    actionsSwitch: false,
    creatorInfo: false,
    modelInfo: false,
  });

  const creators = [defaultCreatorDetails];
  const t = useTranslations("main");

  return (
    <>
      <HomeHeader setModalOpen={setModalOpen} />
      <LanguageSwitchModal
        setModalOpen={setModalOpen}
        locale={locale}
        modalOpen={modalOpen}
      />
      <Footer
        locale={locale}
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
      />
      <Terms
        locale={locale}
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
      />
      <PrivacyPolicy
        locale={locale}
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
      />
      <Contact
        locale={locale}
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
      />
      <About
        locale={locale}
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
      />
      <Who
        locale={locale}
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
        creators={creators}
      />
      <CopyRight
        locale={locale}
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
      />
      <ForDevelopers
        locale={locale}
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
      />
      <Sponsors
        locale={locale}
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
      />
      <div className="flex h-screen flex-col">
        <main className="flex flex-grow items-center justify-center">
          <div className="h-full w-full p-4 sm:p-6">
            <h2 className="mb-4 text-center text-4xl font-bold sm:mb-6">
              {t("home.title")}
            </h2>
            <p className="text-center text-lg">{t("home.description")}</p>
          </div>
        </main>
      </div>
      <HomeSingleModelWindow />
    </>
  );
};

export default Home;
