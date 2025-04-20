import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";
import { FaGithub } from "react-icons/fa";

import Logo from "@/src/components/Logo";
import SnsLinksForMeshmell from "@/src/components/ModalComponents/SnsLinksForMeshmell";
import ModalWrapper from "@/src/components/ModalWrapper";
import { Link } from "@/src/i18n/navigation";
import { LocaleKeyType } from "@/src/types/locale";
import { ModalOpenType } from "@/src/types/modals";

type FooterType<T> = {
  locale: LocaleKeyType;
  setModalOpen: Dispatch<SetStateAction<ModalOpenType>>;
  modalOpen: T;
  setHoverOnModal?: Dispatch<SetStateAction<boolean>>;
};

const Footer = <T extends ModalOpenType | ModalOpenType | ModalOpenType>({
  locale,
  setModalOpen,
  modalOpen,
  setHoverOnModal,
}: FooterType<T>) => {
  const t = useTranslations("main");

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      footer: false,
    }));
  };

  const setAboutModalOpen = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      about: true,
    }));
  };

  const setContactModalOpen = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      contact: true,
    }));
  };

  const setWhoModalOpen = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      who: true,
    }));
  };

  const setTermsModalOpen = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      terms: true,
    }));
  };

  const setPrivacyModalOpen = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      privacy: true,
    }));
  };

  const setCopyRightModalOpen = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      copyRight: true,
    }));
  };

  const setForDevelopersModalOpen = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      forDevelopers: true,
    }));
  };

  const setForSponsorsModalOpen = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      forSponsors: true,
    }));
  };

  return (
    <ModalWrapper
      isVisible={modalOpen.footer}
      handleClose={handleClickClose}
      leftRight="right"
      widthWhenLargeDevice="450"
      heightWhenSmallDevice="700"
      setHoverOnModal={setHoverOnModal}
    >
      <div className="flex h-full flex-col justify-around">
        <div className="flex justify-start">
          <Logo isInFooter canBeClicked={false} />
        </div>
        <div className="flex flex-col gap-8">
          <div className="text-base font-semibold">
            <div
              className="w-36 cursor-pointer appearance-none bg-transparent outline-current hover:underline"
              onClick={setAboutModalOpen}
            >
              <div>{t("about.footer")}</div>
            </div>
            <div
              className="w-36 cursor-pointer appearance-none bg-transparent outline-current hover:underline"
              onClick={setContactModalOpen}
            >
              <div>{t("contact.footer")}</div>
            </div>
            <div
              className="w-36 cursor-pointer appearance-none bg-transparent outline-current hover:underline"
              onClick={setWhoModalOpen}
            >
              <div>{t("who.footer")}</div>
            </div>
          </div>
          <ul>
            <li className="cursor-pointer" onClick={setTermsModalOpen}>
              <div className="hover:underline">{t("terms.footer")}</div>
            </li>
            <li className="cursor-pointer" onClick={setPrivacyModalOpen}>
              <div className="hover:underline">{t("privacyPolicy.footer")}</div>
            </li>
            <li className="cursor-pointer" onClick={setCopyRightModalOpen}>
              <div className="hover:underline">{t("copyRight.footer")}</div>
            </li>
            <li className="cursor-pointer" onClick={setForDevelopersModalOpen}>
              <div className="hover:underline">{t("forDevelopers.footer")}</div>
            </li>
            <li className="cursor-pointer" onClick={setForSponsorsModalOpen}>
              <div className="hover:underline">{t("forSponsors.footer")}</div>
            </li>
          </ul>
          <SnsLinksForMeshmell locale={locale} />
          <Link
            href="https://github.com/meshmell"
            target="_blank"
            className="flex items-center"
          >
            <FaGithub className="h-8 w-8" />
          </Link>
          <div className="text-xs">
            <div>© Meshmell 2023. All rights reserved</div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default Footer;
