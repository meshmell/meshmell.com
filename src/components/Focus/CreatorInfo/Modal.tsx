import { Dispatch, SetStateAction, useEffect } from "react";

import { useTranslations } from "next-intl";
import { CreatorDetailsType } from "@/src/types/creators";
import { LocaleKeyType } from "@/src/types/locale";
import { ModalOpenType } from "@/src/types/modals";
import { ModelDetailsType } from "@/src/types/models";

import ModalWrapper from "../../ModalWrapper";

import Contents from "./Contents";

type CreatorInfoModal = {
  locale: LocaleKeyType;
  modalOpen: ModalOpenType;
  setModalOpen: Dispatch<SetStateAction<ModalOpenType>>;
  focusedModelsObj: ModelDetailsType;
  focusedModelsCreatorsObj: CreatorDetailsType;
  isFocusedMode: boolean;
};

const CreatorInfoModal = ({
  locale,
  setModalOpen,
  focusedModelsCreatorsObj,
  focusedModelsObj,
  modalOpen,
  isFocusedMode,
}: CreatorInfoModal) => {
  const t = useTranslations("main");

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      creatorInfo: false,
    }));
  };

  useEffect(() => {
    if (!isFocusedMode) {
      handleClickClose();
    }
  }, [isFocusedMode]);

  return (
    <ModalWrapper
      isVisible={modalOpen.creatorInfo}
      handleClose={handleClickClose}
      leftRight="left"
      widthWhenLargeDevice="384"
      heightWhenSmallDevice="700"
    >
      <Contents
        locale={locale}
        creatorsObj={focusedModelsCreatorsObj}
        isFocusedMode={isFocusedMode}
      />
      {focusedModelsObj.source ? (
        <div className="mt-4 flex justify-center">
          <div> {t("creatorInfo.sourceCreator")} </div>
          <a
            href={focusedModelsObj.source.sourceSite}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold text-blue-500 dark:text-blue-400"
          >
            {t("creatorInfo.source")}
          </a>
        </div>
      ) : null}
    </ModalWrapper>
  );
};

export default CreatorInfoModal;
