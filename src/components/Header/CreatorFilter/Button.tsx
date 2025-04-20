"use client";

import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { RiFilter3Fill } from "react-icons/ri";

import { CreatorDetailsType } from "@/src/types/creators";
import { LocaleKeyType } from "@/src/types/locale";
import { ModalOpenType } from "@/src/types/modals";

import Button from "../../Button";

type CreatorFilterButtonType = {
  setModalOpen: Dispatch<SetStateAction<ModalOpenType>>;
  modalOpen: ModalOpenType;
  filteredCreatorsObj: CreatorDetailsType;
  locale: LocaleKeyType;
};

const CreatorFilterButton = ({
  setModalOpen,
  modalOpen,
  filteredCreatorsObj,
  locale,
}: CreatorFilterButtonType) => {
  const handleClick = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      creatorFilter: !prevState.creatorFilter,
      modelInfo: false,
      download: false,
      downloadCredit: false,
      creatorId: false,
      actionsSwitch: false,
      creatorInfoInNotFocused: false,
      footer: false,
      language: false,
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
      creator: false,
      viewsSwitch: false,
      sponsors: false,
      shareThisPage: false,
    }));
  };

  const creatorSlug = filteredCreatorsObj.slug
    ? filteredCreatorsObj.slug
    : "PlaceHolder";

  return (
    <Button
      handleClick={handleClick}
      isActive={modalOpen.creatorFilter}
      hasTwoIcons
    >
      <RiFilter3Fill className={"text-3xl sm:text-4xl"} />
      <div className="relative h-[28px] w-[28px] sm:h-[30px] sm:w-[30px]">
        {filteredCreatorsObj.slug === "" ? (
          <div className="text-3xl sm:text-4xl">
            <BsFillPersonFill />
          </div>
        ) : (
          <Image
            src={`${process.env.NEXT_PUBLIC_GCS_BUCKET_PUBLIC_URL ?? ""}/images/creators/${creatorSlug}/img.webp`}
            fill
            alt={filteredCreatorsObj.name[locale as LocaleKeyType]}
            className="rounded-lg"
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 10vw, (max-width: 1200px) 5vw, 5vw"
          />
        )}
      </div>
    </Button>
  );
};

export default CreatorFilterButton;
