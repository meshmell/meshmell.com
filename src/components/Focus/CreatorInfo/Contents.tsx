import Image from "next/image";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { RiShareBoxFill } from "react-icons/ri";

import CopyCredit from "@/src/components/ModalComponents/CopyCredit";
import { CreatorDetailsType } from "@/src/types/creators";
import { LocaleKeyType } from "@/src/types/locale";

import CreatorInfoSNS from "./SNS";

type CreatorInfoType = {
  creatorsObj: CreatorDetailsType;
  locale: LocaleKeyType;
  isFocusedMode: boolean;
};

const CreatorInfo = ({
  creatorsObj,
  locale,
  isFocusedMode,
}: CreatorInfoType) => {
  const t = useTranslations("main");

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const creatorSlug = creatorsObj.slug ? creatorsObj.slug : "PlaceHolder";
  const handleGotoFilter = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("creator", creatorsObj.slug);
    newParams.set("focusedMode", "off");
    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <h2 className="flex gap-2 text-3xl font-bold">
          {creatorsObj.slug !== "" && (
            <div className="h-[30px] w-[30px]">
              <Image
                src={`${process.env.NEXT_PUBLIC_GCS_BUCKET_PUBLIC_URL ?? ""}/images/creators/${creatorSlug}/img.webp`}
                width={30}
                height={30}
                alt={creatorsObj.name[locale as LocaleKeyType]}
                className="rounded-md"
              />
            </div>
          )}
          <span>{creatorsObj.name[locale as LocaleKeyType]}</span>
        </h2>
        <CopyCredit locale={locale} creatorsObj={creatorsObj} />
      </div>
      <div className="text-xl">
        {creatorsObj.description[locale as LocaleKeyType]}
      </div>
      <CreatorInfoSNS creatorsObj={creatorsObj} />
      {isFocusedMode && (
        <div
          className="mt-4 flex select-none items-center gap-2 sm:mt-8"
          onClick={handleGotoFilter}
        >
          <div className="cursor-pointer text-base">
            {t("creatorInfo.seeMoreModels")}
          </div>
          <RiShareBoxFill className="text-xl text-blue-600 dark:text-blue-400 sm:text-2xl" />
        </div>
      )}
    </div>
  );
};

export default CreatorInfo;
