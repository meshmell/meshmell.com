"use client";

import { useState, useEffect } from "react";

import { LocaleKeyType } from "@/src/types/locale";
import { SponsorInfoType } from "@/src/types/sponsors";

type EachSponsorType = {
  sponsor: SponsorInfoType;
  locale: LocaleKeyType;
};

const EachSponsor = ({ sponsor, lang }: EachSponsorType) => {
  const [sponsorsRank, setSponsorsRank] = useState<
    "platinum" | "gold" | "silver"
  >("silver");

  useEffect(() => {
    if (sponsor.amount > 10000) {
      setSponsorsRank("platinum");
    } else if (sponsor.amount > 5000) {
      setSponsorsRank("gold");
    } else if (sponsor.amount > 1000) {
      setSponsorsRank("silver");
    }
  }, []);

  return (
    <div key={sponsor.id} className="flex gap-2">
      <a href={sponsor.url}>
        <div
          className={` ${
            sponsorsRank === "platinum"
              ? "text-black dark:text-white"
              : sponsorsRank === "gold"
                ? "text-gray-500 dark:text-gray-600"
                : "text-gray-600 dark:text-gray-500"
          } text-[16px] font-bold leading-[20px] tracking-tighter`}
        >
          {sponsor.name[locale as LocaleKeyType]}
        </div>
      </a>
    </div>
  );
};

export default EachSponsor;
