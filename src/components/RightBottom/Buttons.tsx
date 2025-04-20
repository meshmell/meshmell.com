import { Dispatch, SetStateAction } from "react";

import FooterButton from "@/src/components/RightBottom/Footer/Button";
import LanguageSwitchButton from "@/src/components/RightBottom/Language/Button";
import SponsorButton from "@/src/components/RightBottom/Sponsors/Button";
import { LocaleKeyType } from "@/src/types/locale";
import { ModalOpenType } from "@/src/types/modals";

import Logo from "../Logo";

import ShareButton from "./Share/Button";

type RightBottomButtonsType = {
  locale: LocaleKeyType;
  setModalOpen: Dispatch<SetStateAction<ModalOpenType>>;
  isIn3D?: boolean;
};

const RightBottomButtons = ({
  locale,
  setModalOpen,
  isIn3D,
}: RightBottomButtonsType) => {
  return (
    <>
      {isIn3D && (
        <div className="fixed bottom-[10px] right-32 z-[70] hidden cursor-pointer xl:block">
          <Logo />
        </div>
      )}
      <div className="fixed bottom-[18px] right-5 z-[70] cursor-pointer">
        <div className="vertical-buttons-container">
          <ShareButton setModalOpen={setModalOpen} />
          <LanguageSwitchButton locale={locale} setModalOpen={setModalOpen} />
          <FooterButton setModalOpen={setModalOpen} />
          <SponsorButton setModalOpen={setModalOpen} />
        </div>
      </div>
    </>
  );
};

export default RightBottomButtons;
