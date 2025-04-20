import { Dispatch, SetStateAction } from "react";

import ModalWrapper from "@/src/components/ModalWrapper";
import SNSLinksForYuri from "@/src/components/RightBottom/Footer/Who/SnsLinks/YuriNakansihi";
import { useTranslations } from "next-intl";
import { CreatorDetailsType } from "@/src/types/creators";
import { LocaleKeyType } from "@/src/types/locale";
import {
  ModalOpenType,
  ModalOpenType,
  ModalOpenType,
} from "@/src/types/modals";

type WhoType<T> = {
  locale: LocaleKeyType;
  setModalOpen: Dispatch<SetStateAction<ModalOpenType>>;
  modalOpen: T;
  setHoverOnModal?: Dispatch<SetStateAction<boolean>>;
  creators: CreatorDetailsType[];
};

const Who = <T extends ModalOpenType | ModalOpenType | ModalOpenType>({
  locale,
  setModalOpen,
  modalOpen,
  setHoverOnModal,
  creators,
}: WhoType<T>) => {
  const t = useTranslations("main");

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      who: false,
    }));
  };

  const developersInfo = creators.filter((creator) =>
    creator.roles.includes("developer"),
  );

  return (
    <ModalWrapper
      isVisible={modalOpen.who}
      handleClose={handleClickClose}
      leftRight="right"
      widthWhenLargeDevice="450"
      heightWhenSmallDevice="700"
      setHoverOnModal={setHoverOnModal}
    >
      <div className="mx-4">
        <section className="mb-8 flex min-h-screen w-full flex-col">
          <h1 className={"mb-6 text-2xl font-bold"}>{t("who.developers")}</h1>
          {developersInfo.map((developer: CreatorDetailsType) => (
            <div key={developer.slug} className="mb-4">
              <div className="text-xl">
                {developer.name[locale as LocaleKeyType]}
              </div>
              <div className="mb-2 text-base">
                {developer.description[locale as LocaleKeyType]}
              </div>
              <SNSLinksForYuri />
            </div>
          ))}
        </section>
        <div>{t("who.contributorWanted")}</div>
      </div>
    </ModalWrapper>
  );
};

export default Who;
