import { Dispatch, SetStateAction } from "react";
import { BsInfoLg } from "react-icons/bs";

import { ModalOpenType } from "@/src/types/modals";

import Button from "../../Button";

type ModelInfoButtonType = {
  setModalOpen: Dispatch<SetStateAction<ModalOpenType>>;
  modalOpen: ModalOpenType;
};

const ModelInfoButton = ({ setModalOpen, modalOpen }: ModelInfoButtonType) => {
  const handleClick = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      modelInfo: !prevState.modelInfo,
      download: false,
      downloadCredit: false,
      creator: false,
      actionsSwitch: false,
      creatorInfoInNotFocused: false,
      footer: false,
      language: false,
      creatorFilter: false,
      categoryFilter: false,
      search: false,
      terms: false,
      privacy: false,
      contact: false,
      about: false,
      who: false,
      forDevelopers: false,
      forSponsors: false,
      lightAndDarkTheme: false,
      copyRight: false,
      viewsSwitch: false,
      sponsors: false,
      shareThisPage: false,
    }));
  };

  return (
    <Button handleClick={handleClick} isActive={modalOpen.shareThisPage}>
      <div className="text-3xl sm:text-4xl">
        <BsInfoLg />
      </div>
    </Button>
  );
};

export default ModelInfoButton;
