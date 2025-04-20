import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { RiShareBoxFill } from "react-icons/ri";

import { CreatorDetailsType } from "@/src/types/creators";
import { LocaleKeyType } from "@/src/types/locale";
import { ModalOpenType } from "@/src/types/modals";

import Button from "../../Button";

type CreatorInfoButtonInNotFocusedType = {
  setModalOpen: Dispatch<SetStateAction<ModalOpenType>>;
  modalOpen: ModalOpenType;
  filteredCreatorsObj: CreatorDetailsType;
  locale: LocaleKeyType;
};

const CreatorInfoButtonInNotFocused = ({
  setModalOpen,
  modalOpen,
  filteredCreatorsObj,
  locale,
}: CreatorInfoButtonInNotFocusedType) => {
  const handleClick = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      creatorInfoInNotFocused: !prevState.creatorInfoInNotFocused,
      modelInfo: false,
      download: false,
      downloadCredit: false,
      creator: false,
      actionsSwitch: false,
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
      search: false,
    }));
  };

  const creatorSlug = filteredCreatorsObj.slug
    ? filteredCreatorsObj.slug
    : "PlaceHolder";

  return (
    <div className="fixed right-[10px] top-[60px] z-50 flex cursor-pointer items-center justify-start sm:top-[80px]">
      <Button
        handleClick={handleClick}
        isActive={modalOpen.creatorInfoInNotFocused}
      >
        <div className="relative h-[28px] w-[28px] sm:h-[30px] sm:w-[30px]">
          <Image
            src={`${process.env.NEXT_PUBLIC_GCS_BUCKET_PUBLIC_URL ?? ""}/images/creators/${creatorSlug}/img.webp`}
            fill
            alt={filteredCreatorsObj.name[locale as LocaleKeyType]}
            className="rounded-lg"
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 10vw, (max-width: 1200px) 5vw, 5vw"
          />
        </div>
        <span className="mt-[2px] text-3xl sm:mt-[2px] sm:text-4xl">
          <RiShareBoxFill
            className={`${modalOpen.creatorInfoInNotFocused ? "dark-text-white text-white" : "text-black dark:text-white"}`}
          />
        </span>
      </Button>
    </div>
  );
};

export default CreatorInfoButtonInNotFocused;
