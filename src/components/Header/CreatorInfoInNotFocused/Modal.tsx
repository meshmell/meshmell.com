import { Dispatch, SetStateAction, useEffect } from "react";

import CreatorInfo from "@/src/components/Focus/CreatorInfo/Contents";
import ModalWrapper from "@/src/components/ModalWrapper";
import { CreatorDetailsType } from "@/src/types/creators";
import { LocaleKeyType } from "@/src/types/locale";
import { ModalOpenType } from "@/src/types/modals";

type CreatorInfoModalInNotFocusedType = {
  locale: LocaleKeyType;
  modalOpen: ModalOpenType;
  setModalOpen: Dispatch<SetStateAction<ModalOpenType>>;
  setHoverOnModal: Dispatch<SetStateAction<boolean>>;
  filteredCreatorsObj: CreatorDetailsType;
  isFocusedMode: boolean;
};

const CreatorInfoModalInNotFocused = ({
  locale,
  setModalOpen,
  filteredCreatorsObj,
  modalOpen,
  setHoverOnModal,
  isFocusedMode,
}: CreatorInfoModalInNotFocusedType) => {
  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      creatorInfoInNotFocused: false,
    }));
  };

  useEffect(() => {
    if (isFocusedMode) {
      handleClickClose();
    }
  }, [isFocusedMode]);

  return (
    <ModalWrapper
      isVisible={modalOpen.creatorInfoInNotFocused}
      handleClose={handleClickClose}
      leftRight="right"
      widthWhenLargeDevice="384"
      heightWhenSmallDevice="700"
      setHoverOnModal={setHoverOnModal}
    >
      <CreatorInfo
        locale={locale}
        creatorsObj={filteredCreatorsObj}
        isFocusedMode={isFocusedMode}
      />
    </ModalWrapper>
  );
};

export default CreatorInfoModalInNotFocused;
