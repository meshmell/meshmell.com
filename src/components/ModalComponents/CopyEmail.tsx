"use client";

import { CopyToClipboard } from "react-copy-to-clipboard";
import toast, { Toaster } from "react-hot-toast";
import { FiCopy } from "react-icons/fi";

import { useTranslations } from "next-intl";
import { LocaleKeyType } from "@/src/types/locale";

type CopyEmailType = {
  locale: LocaleKeyType;
};

const CopyEmail = ({ locale }: CopyEmailType) => {
  const t = useTranslations("main");

  const notify = () => toast(`${t("copied")}`);

  return (
    <div className="mt-4">
      <CopyToClipboard text="info@meshmell.com">
        <div
          className="flex cursor-pointer text-lg sm:text-xl"
          onClick={notify}
        >
          info@meshmell.com
          <span className="ml-1 mt-[6px] text-blue-600 dark:text-blue-400">
            <FiCopy />
          </span>
        </div>
      </CopyToClipboard>
      <Toaster />
    </div>
  );
};

export default CopyEmail;
