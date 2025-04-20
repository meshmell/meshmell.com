import { RiShareBoxFill, RiFileCopy2Line } from "react-icons/ri";

import { useTranslations } from "next-intl";
import { LocaleKeyType } from "@/src/types/locale";

type InfoModalType = {
  locale: LocaleKeyType;
};

const CC0 = ({ locale }: InfoModalType) => {
  const t = useTranslations("main");

  return (
    <div className="flex cursor-pointer text-xl">
      <span className="w-8">
        <RiFileCopy2Line className="mt-[1px] pl-1 text-2xl text-black dark:text-white sm:text-3xl" />
      </span>
      <span className="ml-1 sm:ml-1">{t("copyRight.cc0")}</span>
      <span className="ml-1 mt-[6px] text-blue-600 dark:text-blue-400 sm:ml-2 sm:mt-[5px]">
        <a href="https://creativecommons.org/publicdomain/zero/1.0/">
          <RiShareBoxFill />
        </a>
      </span>
    </div>
  );
};

export default CC0;
