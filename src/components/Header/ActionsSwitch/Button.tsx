"use client";

import { Dispatch, SetStateAction } from "react";
import { FaWalking } from "react-icons/fa";

import { ModalOpenType } from "@/src/types/modals";

import Button from "../../Button";

type ActionsSwitchButtonType = {
  setModalOpen: Dispatch<SetStateAction<ModalOpenType>>;
  modalOpen: ModalOpenType;
};

const ActionsSwitchButton = ({
  setModalOpen,
  modalOpen,
}: ActionsSwitchButtonType) => {
  const handleClick = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      actionsSwitch: !prevState.actionsSwitch,
      modelInfo: false,
      download: false,
      downloadCredit: false,
      creator: false,
      footer: false,
      language: false,
      categoryFilter: false,
      creatorFilter: false,
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
    }));
  };

  return (
    <Button handleClick={handleClick} isActive={modalOpen.actionsSwitch}>
      <FaWalking className="text-3xl sm:text-4xl" />
    </Button>
  );
};

export default ActionsSwitchButton;
