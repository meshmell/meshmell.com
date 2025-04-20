import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction, useEffect } from "react";

import SnsLinksForShareThisSite from "@/src/components/ModalComponents/SnsLinksForShareThisSite";
import { ModalOpenType } from "@/src/types/modals";

import ModalWrapper from "../../ModalWrapper";

type ShareModalWhenListType = {
  locale: LocaleKeyType;
  setModalOpen: Dispatch<SetStateAction<ModalOpenType>>;
  modalOpen: ModalOpenType;
  isFocusedMode: boolean;
};

const ShareModalWhenList = ({
  locale,
  setModalOpen,
  modalOpen,
  isFocusedMode,
}: ShareModalWhenListType) => {
  const t = useTranslations("main");

  useEffect(() => {
    if (isFocusedMode) {
      handleClickClose();
    }
  }, [isFocusedMode]);

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
    }));
  };

  return (
    <ModalWrapper
      isVisible={modalOpen.shareThisPage}
      handleClose={handleClickClose}
      leftRight="right"
      widthWhenLargeDevice="450"
      heightWhenSmallDevice="700"
    >
      <h2 className="text-2xl font-bold sm:text-3xl">{t("share.title")}</h2>
      <SnsLinksForShareThisSite locale={locale} />
    </ModalWrapper>
  );
};

export default ShareModalWhenList;
