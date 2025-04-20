"use client";

import { Dispatch, SetStateAction } from "react";

import { LocaleKeyType } from "@/src/types/locale";
import { ModalOpenType } from "@/src/types/modals";

import Button from "../../Button";

import FlagComponent from "./FlagComponent";

type ChangeLocaleKeyType = {
  locale: LocaleKeyType;
  setModalOpen: Dispatch<SetStateAction<ModalOpenType>>;
};

const ChangeLanguage = ({ locale, setModalOpen }: ChangeLocaleKeyType) => {
  const handleClick = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      language: !prevState.language,
      footer: false,
    }));
  };

  return (
    <Button handleClick={handleClick}>
      <div className="flex h-[28px] w-[28px] items-center justify-center sm:h-8 sm:w-8">
        <div className="w-[28px] shadow-md sm:w-8">
          <FlagComponent locale={locale} />
        </div>
      </div>
    </Button>
  );
};

export default ChangeLanguage;
