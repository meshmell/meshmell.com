"use client";

import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction } from "react";

import { useQueryUsers } from "@/src/app/hooks/user/queries";
import ModalWrapper from "@/src/components/ModalWrapper";
import { useTranslations } from "next-intl";
import { LocaleKeyType } from "@/src/types/locale";
import { ModalOpenType } from "@/src/types/modals";
import { UserBasicWithID } from "@/src/types/user";

import LoadingCover from "../../LoadingCover";

import EachSponsor from "./EachSponsor";

type SponsorsType<T> = {
  locale: LocaleKeyType;
  modalOpen: T;
  setModalOpen: Dispatch<SetStateAction<ModalOpenType>>;
  setHoverOnModal?: Dispatch<SetStateAction<boolean>>;
};

const Sponsors = <T extends ModalOpenType | ModalOpenType | ModalOpenType>({
  locale,
  setModalOpen,
  setHoverOnModal,
  modalOpen,
}: SponsorsType<T>) => {
  const { data: session, status: sessionStatus } = useSession();
  const t = useTranslations("main");
  const { data: sponsors } = useQueryUsers({
    id: Number(session?.user?.id),
    role: "sponsor",
    inSession: true,
  });

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      sponsors: false,
    }));
  };

  return (
    <ModalWrapper
      isVisible={modalOpen.sponsors}
      handleClose={handleClickClose}
      leftRight="right"
      widthWhenLargeDevice="600"
      heightWhenSmallDevice="700"
      setHoverOnModal={setHoverOnModal}
    >
      <div className="text-white">
        <h2
          className={`font-bold ${locale === "en" ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"} mb-8 text-center text-black dark:text-white`}
        >
          {t("sponsors.thankTo_1")}
          <br />
          {t("sponsors.thankTo_2")}
        </h2>
        <div className="flex flex-wrap justify-center gap-x-[12px] gap-y-0">
          {sponsors ? (
            sponsors.users.map((sponsor: UserBasicWithID) => (
              <EachSponsor key={sponsor.id} sponsor={sponsor} locale={locale} />
            ))
          ) : (
            <div className="text-center text-gray-500">
              {t("sponsors.noSponsors")}
            </div>
          )}
        </div>
      </div>
      {sessionStatus === "loading" && <LoadingCover />}
    </ModalWrapper>
  );
};

export default Sponsors;
