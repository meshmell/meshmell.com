import { Dispatch, SetStateAction } from "react";

import ContactUsParagraph from "@/src/components/RightBottom/Footer/ContactUsParagraph";
import { useTranslations } from "next-intl";
import { LocaleKeyType } from "@/src/types/locale";
import {
  ModalOpenType,
  ModalOpenType,
  ModalOpenType,
} from "@/src/types/modals";

import ModalWrapper from "../../ModalWrapper";

type PrivacyPolicyType<T> = {
  locale: LocaleKeyType;
  setModalOpen: Dispatch<SetStateAction<ModalOpenType>>;
  modalOpen: T;
  setHoverOnModal?: Dispatch<SetStateAction<boolean>>;
};

const PrivacyPolicy = <
  T extends ModalOpenType | ModalOpenType | ModalOpenType,
>({
  locale,
  setModalOpen,
  modalOpen,
  setHoverOnModal,
}: PrivacyPolicyType<T>) => {
  const t = useTranslations("main");

  const handleGoToContact = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      contact: true,
    }));
  };

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      privacy: false,
    }));
  };

  const contentInfo = {
    en: "Privacy Policy",
    ja: "プライバシーポリシー",
  };

  return (
    <ModalWrapper
      isVisible={modalOpen.privacy}
      handleClose={handleClickClose}
      leftRight="right"
      widthWhenLargeDevice="450"
      heightWhenSmallDevice="700"
      setHoverOnModal={setHoverOnModal}
    >
      <div className="max-h-[90%] overflow-y-auto">
        <h1 className="mb-6 text-2xl font-bold">{t("privacyPolicy.h1")}</h1>

        <p className="mb-4">{t("privacyPolicy.lastUpdated")}</p>

        <section className="mb-6">
          <h2 className="mb-2 text-xl font-semibold">
            1. {t("privacyPolicy.informationWeCollect.h2")}
          </h2>
          <p>{t("privacyPolicy.informationWeCollect.p-1")}</p>
          <p>{t("privacyPolicy.informationWeCollect.p-2")}</p>
        </section>

        <section className="mb-6">
          <h2 className="mb-2 text-xl font-semibold">
            2. {t("privacyPolicy.changesToThisPrivacyPolicy.h2")}
          </h2>
          <p>{t("privacyPolicy.changesToThisPrivacyPolicy.p-1")}</p>
        </section>

        {/* <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              {t("privacyPolicy.thirdPartyAdvertisements.h2")}
            </h2>
            <p>
              {t("privacyPolicy.thirdPartyAdvertisements.p-1")}
            </p>
          </section> */}

        <ContactUsParagraph
          locale={locale}
          handleGoToContact={handleGoToContact}
          content={contentInfo}
          num={3}
        />
      </div>
    </ModalWrapper>
  );
};

export default PrivacyPolicy;
