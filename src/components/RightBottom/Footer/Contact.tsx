import { Dispatch, SetStateAction } from "react";

import CopyEmail from "@/src/components/ModalComponents/CopyEmail";
import { useTranslations } from "next-intl";
import { LocaleKeyType } from "@/src/types/locale";
import {
  ModalOpenType,
  ModalOpenType,
  ModalOpenType,
} from "@/src/types/modals";

import ModalWrapper from "../../ModalWrapper";

type ContactType<T> = {
  locale: LocaleKeyType;
  setModalOpen: Dispatch<SetStateAction<ModalOpenType>>;
  modalOpen: T;
  setHoverOnModal?: Dispatch<SetStateAction<boolean>>;
};

const Contact = <T extends ModalOpenType | ModalOpenType | ModalOpenType>({
  locale,
  setModalOpen,
  modalOpen,
  setHoverOnModal,
}: ContactType<T>) => {
  const t = useTranslations("main");

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      contact: false,
    }));
  };

  return (
    <ModalWrapper
      isVisible={modalOpen.contact}
      handleClose={handleClickClose}
      leftRight="right"
      widthWhenLargeDevice="450"
      heightWhenSmallDevice="700"
      setHoverOnModal={setHoverOnModal}
    >
      <div className="z-1">
        <h1 className={"mb-4 text-2xl font-bold"}>{t("contact.contact")}</h1>
        <p className="mt-12 text-base">{t("contact.email")}</p>
        <CopyEmail locale={locale} />
      </div>
    </ModalWrapper>
  );
};

export default Contact;
