import { Dispatch, SetStateAction } from "react";

import { useTranslations } from "next-intl";
import { LocaleKeyType } from "@/src/types/locale";
import {
  ModalOpenType,
  ModalOpenType,
  ModalOpenType,
} from "@/src/types/modals";

import ModalWrapper from "../../ModalWrapper";

type ForSponsorsType<T> = {
  locale: LocaleKeyType;
  setModalOpen: Dispatch<SetStateAction<ModalOpenType>>;
  modalOpen: T;
  setHoverOnModal?: Dispatch<SetStateAction<boolean>>;
};

const ForSponsors = <T extends ModalOpenType | ModalOpenType | ModalOpenType>({
  locale,
  setModalOpen,
  modalOpen,
  setHoverOnModal,
}: ForSponsorsType<T>) => {
  const t = useTranslations("main");

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      forSponsors: false,
    }));
  };

  return (
    <ModalWrapper
      isVisible={modalOpen.forSponsors}
      handleClose={handleClickClose}
      leftRight="right"
      widthWhenLargeDevice="450"
      heightWhenSmallDevice="700"
      setHoverOnModal={setHoverOnModal}
    >
      <div className="z-100 mx-6">
        <h1 className="mb-6 text-2xl font-bold">{t("forSponsors.title")}</h1>
        <div className="mx-auto mt-6 flex max-w-xl flex-col gap-2 text-base">
          <p>{t("forSponsors.description")}</p>
          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-800">
            <h3 className="mb-2 text-2xl font-bold">
              {t("forSponsors.donation.oneThousand.title")}
            </h3>
            <ul>
              <li>
                {t("forSponsors.donation.textSize")}:{" "}
                {t("forSponsors.donation.oneThousand.textSize")}
              </li>
              <li>
                {t("forSponsors.donation.contrast")}:{" "}
                {t("forSponsors.donation.oneThousand.contrast")}
              </li>
              <li>
                {t("forSponsors.donation.link")}:{" "}
                {t("forSponsors.donation.oneThousand.link")}
              </li>
            </ul>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-800">
            <h3 className="mb-2 text-2xl font-bold">
              {t("forSponsors.donation.fiveHundred.title")}
            </h3>
            <ul>
              <li>
                {t("forSponsors.donation.textSize")}:{" "}
                {t("forSponsors.donation.fiveHundred.textSize")}
              </li>
              <li>
                {t("forSponsors.donation.contrast")}:{" "}
                {t("forSponsors.donation.fiveHundred.contrast")}
              </li>
              <li>
                {t("forSponsors.donation.link")}:{" "}
                {t("forSponsors.donation.fiveHundred.link")}
              </li>
            </ul>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-800">
            <h3 className="mb-2 text-2xl font-bold">
              {t("forSponsors.donation.oneHundred.title")}
            </h3>
            <ul>
              <li>
                {t("forSponsors.donation.textSize")}:{" "}
                {t("forSponsors.donation.oneHundred.textSize")}{" "}
              </li>
              <li>
                {t("forSponsors.donation.contrast")}:{" "}
                {t("forSponsors.donation.oneHundred.contrast")}
              </li>
              <li>
                {t("forSponsors.donation.link")}:{" "}
                {t("forSponsors.donation.oneHundred.link")}{" "}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ForSponsors;
