import { Dispatch, SetStateAction } from "react";

import { useTranslations } from "next-intl";
import { LocaleKeyType } from "@/src/types/locale";
import {
  ModalOpenType,
  ModalOpenType,
  ModalOpenType,
} from "@/src/types/modals";

import ModalWrapper from "../../ModalWrapper";

type ForDevelopersType<T> = {
  locale: LocaleKeyType;
  setModalOpen: Dispatch<SetStateAction<ModalOpenType>>;
  modalOpen: T;
  setHoverOnModal?: Dispatch<SetStateAction<boolean>>;
};

const ForDevelopers = <
  T extends ModalOpenType | ModalOpenType | ModalOpenType,
>({
  locale,
  setModalOpen,
  modalOpen,
  setHoverOnModal,
}: ForDevelopersType<T>) => {
  const t = useTranslations("main");

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      forDevelopers: false,
    }));
  };

  return (
    <ModalWrapper
      isVisible={modalOpen.forDevelopers}
      handleClose={handleClickClose}
      leftRight="right"
      widthWhenLargeDevice="450"
      heightWhenSmallDevice="700"
      setHoverOnModal={setHoverOnModal}
    >
      <div className="z-100 mx-6">
        <h1 className="mb-6 text-2xl font-bold">{t("forDevelopers.title")}</h1>
        <div className="mx-auto mt-6 flex max-w-xl flex-col gap-2 text-base">
          <p>
            {t("forDevelopers.sourceCode")}
            <a
              href={` ${process.env.NEXT_PUBLIC_MESHMELL_GITHUB_REPOSITORY}`}
              className="text-blue-500 hover:underline"
            >
              {process.env.NEXT_PUBLIC_MESHMELL_GITHUB_REPOSITORY}
            </a>
          </p>
          <p>{t("forDevelopers.recruit")}</p>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ForDevelopers;
