"use client";

import { CopyToClipboard } from "react-copy-to-clipboard";
import toast, { Toaster } from "react-hot-toast";
import { FiCopy } from "react-icons/fi";

import { useTranslations } from "next-intl";
import { CreatorDetailsType } from "@/src/types/creators";
import { LocaleKeyType } from "@/src/types/locale";

type CopyCreditType = {
  locale: LocaleKeyType;
  creatorsObj: CreatorDetailsType;
};

const CopyCredit = ({ locale, creatorsObj }: CopyCreditType) => {
  const t = useTranslations("main");

  const notify = () => toast(`${t("copied")}`);

  return (
    <div className="ml-2 mt-[8px]">
      <CopyToClipboard text={creatorsObj.name[locale as LocaleKeyType]}>
        <span
          onClick={notify}
          className="text-2xl text-blue-600 dark:text-blue-400 sm:text-3xl"
        >
          <FiCopy />
        </span>
      </CopyToClipboard>
      <Toaster />
    </div>
  );
};

export default CopyCredit;
