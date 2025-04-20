"use client";

import { useLocale } from "next-intl";
import { Dispatch, SetStateAction } from "react";

import { Button } from "@/components/ui/button";
import LightDarkThemeSwitchButton from "@/src/components/Header/LightDarkTheme/Button";
import LanguageSwitchButton from "@/src/components/RightBottom/Language/Button";
import { Link } from "@/src/i18n/navigation";
import { LocaleKeyType } from "@/src/types/locale";
import { ModalOpenType } from "@/src/types/modals";

import Logo from "../Logo";
import FooterButton from "../RightBottom/Footer/Button";

type HeaderType = {
  setModalOpen: Dispatch<SetStateAction<ModalOpenType>>;
};

const HomeHeader = ({ setModalOpen }: HeaderType) => {
  const locale = useLocale() as LocaleKeyType;

  return (
    <div className="flex items-center justify-between">
      <Logo />
      <div className="2xs:gap-4 mx-[0.5vw] mt-[6px] flex justify-center gap-1 sm:mt-[10px] sm:justify-end sm:gap-2">
        <Link href="/auth/login" className="flex items-center">
          <Button>Login</Button>
        </Link>
        <LanguageSwitchButton locale={locale} setModalOpen={setModalOpen} />
        <LightDarkThemeSwitchButton />
        <FooterButton setModalOpen={setModalOpen} />
      </div>
    </div>
  );
};

export default HomeHeader;
