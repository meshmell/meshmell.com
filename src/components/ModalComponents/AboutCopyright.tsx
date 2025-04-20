import { Dispatch, SetStateAction } from "react";
import { RiShareBoxFill } from "react-icons/ri";

import { useTranslations } from "next-intl";
import { LocaleKeyType } from "@/src/types/locale";
import { ModalOpenType } from "@/src/types/modals";

type AboutCopyrightType = {
  locale: LocaleKeyType;
  setModalOpen: Dispatch<SetStateAction<ModalOpenType>>;
};

const AboutCopyright = ({ locale, setModalOpen }: AboutCopyrightType) => {
  const t = useTranslations("main");

  const handleClick = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      copyRight: true,
    }));
  };

  return (
    <div className="flex cursor-pointer" onClick={handleClick}>
      {t("copyRight.aboutCopyRight")}
      <span className="ml-2 text-xl">
        <RiShareBoxFill />
      </span>
    </div>
  );
};

export default AboutCopyright;
