"use client";

import Link from "next/link";
import { RiTwitterXFill } from "react-icons/ri";

import { useTranslations } from "next-intl";
import { LocaleKeyType } from "@/src/types/locale";

type SnsLinksForMeshmellType = {
  locale: LocaleKeyType;
};

const SnsLinksForMeshmell = ({ locale }: SnsLinksForMeshmellType) => {
  const t = useTranslations("main");

  return (
    <>
      <div className="border-t-2 pt-[4px] text-xl font-semibold sm:pt-[4px]">
        {t("officialSNSAccounts")}
      </div>
      <div className="mt-[4px] flex justify-start gap-4 sm:gap-4">
        <Link
          href={" https://twitter.com/meshmell6174"}
          aria-label="Go to Twitter page for Meshmell"
        >
          <div className="mt-1">
            <RiTwitterXFill size={22} />
          </div>
        </Link>
      </div>
    </>
  );
};

export default SnsLinksForMeshmell;
