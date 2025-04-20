"use client";

import { Dispatch, SetStateAction } from "react";

import HorizontalViewIcon from "@/src/components/Svg/Views/HorizontalViewIcon";
import PerspectiveViewIcon from "@/src/components/Svg/Views/PerspectiveViewIcon";
import VerticalViewIcon from "@/src/components/Svg/Views/VerticalViewIcon";
import { ModalOpenType } from "@/src/types/modals";
import { viewTypes } from "@/src/types/views";

import Button from "../../Button";

type ViewsSwitchButtonType = {
  setModalOpen: Dispatch<SetStateAction<ModalOpenType>>;
  modalOpen: ModalOpenType;
  view: viewTypes;
};

const ViewsSwitchButton = ({
  view,
  setModalOpen,
  modalOpen,
}: ViewsSwitchButtonType) => {
  const handleClick = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      viewsSwitch: !prevState.viewsSwitch,
      modelInfo: false,
      download: false,
      downloadCredit: false,
      creator: false,
      actionsSwitch: false,
      creatorInfoInNotFocused: false,
      footer: false,
      language: false,
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
      categoryFilter: false,
      shareThisPage: false,
    }));
  };

  return (
    <>
      <Button handleClick={handleClick} isActive={modalOpen.viewsSwitch}>
        <div
          className={`fill-black dark:fill-white ${modalOpen.viewsSwitch ? "text-white" : "text-black dark:text-white"} h-[35px] sm:h-[40px]`}
        >
          {view === "perspective" ? (
            <PerspectiveViewIcon />
          ) : view === "vertical" ? (
            <VerticalViewIcon />
          ) : (
            <HorizontalViewIcon />
          )}
        </div>
      </Button>
    </>
  );
};

export default ViewsSwitchButton;
