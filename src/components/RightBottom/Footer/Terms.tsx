import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";

import ContactUsParagraph from "@/src/components/RightBottom/Footer/ContactUsParagraph";
import { LocaleKeyType } from "@/src/types/locale";
import { ModalOpenType } from "@/src/types/modals";

import ModalWrapper from "../../ModalWrapper";

type TermsType<T> = {
  locale: LocaleKeyType;
  setModalOpen: Dispatch<SetStateAction<ModalOpenType>>;
  modalOpen: T;
  setHoverOnModal?: Dispatch<SetStateAction<boolean>>;
};

const Terms = <T extends ModalOpenType | ModalOpenType | ModalOpenType>({
  locale,
  setModalOpen,
  modalOpen,
  setHoverOnModal,
}: TermsType<T>) => {
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
      terms: false,
    }));
  };

  const contentInfo = {
    en: "Terms",
    ja: "利用規約",
  };

  return (
    <ModalWrapper
      isVisible={modalOpen.terms}
      handleClose={handleClickClose}
      leftRight="right"
      widthWhenLargeDevice="450"
      heightWhenSmallDevice="700"
      setHoverOnModal={setHoverOnModal}
    >
      <div className="max-h-[90%] overflow-y-auto">
        <div className="mx-4">
          <h1 className="mb-6 text-2xl font-bold">{t("terms.h1")}</h1>
          <p className="mb-4">{t("terms.lastUpdated")}</p>

          <section className="mb-6">
            <h2 className="mb-2 text-xl font-semibold">
              1. {t("terms.acceptanceOfTerms.h2")}
            </h2>
            <p>{t("terms.acceptanceOfTerms.p-1")}</p>
          </section>

          <section className="mb-6">
            <h2 className="mb-2 text-xl font-semibold">
              2. {t("terms.changesToTerms.h2")}
            </h2>
            <p>{t("terms.changesToTerms.p-1")}</p>
          </section>

          <section className="mb-6">
            <h2 className="mb-2 text-xl font-semibold">
              3. {t("terms.limitationsOfLiability.h2")}
            </h2>
            <p>{t("terms.limitationsOfLiability.p-1")}</p>
          </section>
          <section className="mb-6">
            <h2 className="mb-2 text-xl font-semibold">
              4. {t("terms.governingLaw.h2")}
            </h2>
            <p>{t("terms.governingLaw.p-1")}</p>
          </section>
          <ContactUsParagraph
            locale={locale}
            handleGoToContact={handleGoToContact}
            content={contentInfo}
            num={5}
          />
        </div>
      </div>
    </ModalWrapper>
  );
};

export default Terms;
