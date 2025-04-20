"use client";

import Image from "next/image";
import Link from "next/link";

import { useTranslations } from "next-intl";
import { LocaleKeyType } from "@/src/types/locale";

type BuyMeACoffeeType = {
  locale: LocaleKeyType;
};

const BuyMeACoffee = ({ locale }: BuyMeACoffeeType) => {
  const t = useTranslations("main");

  return (
    <>
      <div className="mx-0 my-0 mb-2 text-xs md:text-xs lg:text-xs">
        {t("buyMeACoffee")}
      </div>
      <div className="">
        <Link href="https://www.buymeacoffee.com/yurinakanishi">
          <div className="sm:36 relative w-36 md:w-36 lg:w-36 xl:w-36">
            <Image
              src={`${process.env.NEXT_PUBLIC_GCS_BUCKET_PUBLIC_URL ?? ""}/images/general/bmc-button.webp`}
              width={272.5}
              height={76.5}
              alt="Buy me a coffee logo"
            />
          </div>
        </Link>
        <Link href="https://ko-fi.com/R5R7PXETX">
          <div className="relative flex w-36 justify-center sm:w-36 lg:w-36 xl:w-36">
            <Image
              width={145}
              height={306}
              className="my-auto"
              src="https://storage.ko-fi.com/cdn/brandasset/kofi_bg_tag_white.png?_gl=1*1n7esak*_ga*MTc4OTc4MTE2OC4xNjk5NDg4Njcx*_ga_M13FZ7VQ2C*MTY5OTQ4ODY3MS4xLjEuMTY5OTQ4ODg3NS41Mi4wLjA."
              alt="Buy Me a Coffee at ko-fi.com"
            />
          </div>
        </Link>
      </div>
    </>
  );
};

export default BuyMeACoffee;
