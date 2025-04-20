import { Dispatch, SetStateAction } from "react";
import { FaShareSquare } from "react-icons/fa";

import Button from "@/src/components/Button";
import { ModalOpenType } from "@/src/types/modals";

type Props = {
  setModalOpen: Dispatch<SetStateAction<ModalOpenType>>;
};

const ShareButton = ({ setModalOpen }: Props) => {
  const handleClick = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      shareThisPage: !prevState.shareThisPage,
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
      modelInfo: false,
    }));
  };

  return (
    <Button handleClick={handleClick}>
      <div className="text-2xl sm:text-3xl">
        <FaShareSquare />
      </div>
    </Button>
  );
};

export default ShareButton;
