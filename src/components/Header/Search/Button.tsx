import { Dispatch, SetStateAction } from "react";
import { FaSearch } from "react-icons/fa";

import { ModalOpenType } from "@/src/types/modals";

import Button from "../../Button";

type SearchButtonType = {
  setModalOpen: Dispatch<SetStateAction<ModalOpenType>>;
  modalOpen: ModalOpenType;
  searchWord?: string;
};

const SearchButton = ({
  setModalOpen,
  modalOpen,
  searchWord,
}: SearchButtonType) => {
  const handleClick = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      search: !prevState.search,
      modelInfo: false,
      download: false,
      downloadCredit: false,
      creator: false,
      actionsSwitch: false,
      creatorInfoInNotFocused: false,
      footer: false,
      language: false,
      categoryFilter: false,
      creatorFilter: false,
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
    <Button handleClick={handleClick} isActive={modalOpen.search}>
      <FaSearch className="text-3xl sm:text-4xl" />
      {searchWord && (
        <span className="absolute right-[1px] top-[1px] block h-2 w-2 rounded-full bg-green-500 sm:right-0.5 sm:top-0.5 sm:h-3 sm:w-3" />
      )}
    </Button>
  );
};

export default SearchButton;
