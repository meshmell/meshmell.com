import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";

import { LocaleKeyType } from "@/src/types/locale";
import { ModalOpenType } from "@/src/types/modals";

import ModalWrapper from "../../ModalWrapper";

type AboutType<T> = {
  locale: LocaleKeyType;
  setModalOpen: Dispatch<SetStateAction<ModalOpenType>>;
  modalOpen: T;
  setHoverOnModal?: Dispatch<SetStateAction<boolean>>;
};

const About = <T extends ModalOpenType>({
  locale,
  setModalOpen,
  modalOpen,
  setHoverOnModal,
}: AboutType<T>) => {
  const t = useTranslations("main");

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      about: false,
    }));
  };

  return (
    <ModalWrapper
      isVisible={modalOpen.about}
      handleClose={handleClickClose}
      leftRight="right"
      widthWhenLargeDevice="450"
      heightWhenSmallDevice="700"
      setHoverOnModal={setHoverOnModal}
    >
      <div className="z-100 mx-6 flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold">{t("about.title")}</h1>
          <div className="mt-2 text-base">
            <p>{t("about.description")}</p>
          </div>
        </div>
        <div>
          <h2 className="mb-1 text-xl font-semibold">
            {t("about.articleAboutMeshmell")}
          </h2>
          <a
            href={`https://yurimell.com/${locale}/diary/detail/3`}
            className="text-blue-500 hover:underline"
          >
            {`https://yurimell.com/${locale}/diary/detail/3`}
          </a>
        </div>
        <div>
          <h2 className="mb-1 text-xl font-semibold">
            {t("about.articleAboutMeshmellTechnology")}
          </h2>
          <a
            href={`https://yurimell.com/${locale}/diary/detail/4`}
            className="text-blue-500 hover:underline"
          >
            {`https://yurimell.com/${locale}/diary/detail/4`}
          </a>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default About;
