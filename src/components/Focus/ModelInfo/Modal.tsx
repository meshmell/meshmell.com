import Image from "next/image";
import { Dispatch, SetStateAction, useEffect } from "react";
import { MdUpdate } from "react-icons/md";
import { RiShareBoxFill } from "react-icons/ri";

import SourceUrl from "@/src/components/Focus/ModelInfo/ModelSourceUrl";
import CC0 from "@/src/components/ModalComponents/CC0";
import ModalWrapper from "@/src/components/ModalWrapper";
import { CreatorDetailsType } from "@/src/types/creators";
import { LocaleKeyType } from "@/src/types/locale";
import { ModalOpenType } from "@/src/types/modals";
import { dateFormat } from "@/src/utils/dateFormat";

import { ModelDetailsType } from "@/src/types/models";

type ModelInfoModalType = {
  locale: LocaleKeyType;
  modalOpen: ModalOpenType;
  setModalOpen: Dispatch<SetStateAction<ModalOpenType>>;
  focusedModelsObj: ModelDetailsType;
  focusedModelsCreatorsObj: CreatorDetailsType;
  isFocusedMode: boolean;
};

const ModelInfoModal = ({
  locale,
  setModalOpen,
  focusedModelsObj,
  focusedModelsCreatorsObj,
  modalOpen,
  isFocusedMode,
}: ModelInfoModalType) => {
  useEffect(() => {
    if (!isFocusedMode) {
      handleClickClose();
    }
  }, [isFocusedMode]);

  const openCreatorModal = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      creatorInfo: true,
    }));
  };

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      modelInfo: false,
    }));
  };

  const creatorSlug = focusedModelsCreatorsObj.slug
    ? focusedModelsCreatorsObj.slug
    : "PlaceHolder";

  return (
    <ModalWrapper
      isVisible={modalOpen.modelInfo}
      handleClose={handleClickClose}
      leftRight="left"
      widthWhenLargeDevice="384"
      heightWhenSmallDevice="700"
      title={focusedModelsObj.name[locale as LocaleKeyType]}
    >
      <div className="flex flex-col gap-2 text-xl">
        {focusedModelsObj.description[locale as LocaleKeyType] && (
          <div className={"my-2 italic"}>
            {focusedModelsObj.description[locale as LocaleKeyType]}
          </div>
        )}
        <div className="flex">
          <span className="w-8">
            {focusedModelsCreatorsObj.slug !== "" && (
              <Image
                src={`${process.env.NEXT_PUBLIC_GCS_BUCKET_PUBLIC_URL ?? ""}/images/creators/${creatorSlug}/img.webp`}
                width={30}
                height={30}
                alt={focusedModelsCreatorsObj.name[locale as LocaleKeyType]}
                className="rounded-md"
              />
            )}
          </span>
          <span className="ml-1 sm:ml-2">
            {focusedModelsCreatorsObj.name[locale as LocaleKeyType]}
          </span>
          <span
            className="ml-1 mt-[6px] text-blue-600 dark:text-blue-400 sm:ml-2 sm:mt-[5px]"
            onClick={openCreatorModal}
          >
            <RiShareBoxFill />
          </span>
        </div>
        <div className="flex">
          <span className="w-8">
            <MdUpdate className="mt-[5px] text-2xl" />
          </span>
          <span className="ml-1 sm:ml-2">
            {/^\d{4}-\d{2}-\d{2}$/.test(focusedModelsObj.updated)
              ? dateFormat(new Date(focusedModelsObj.updated), lang)
              : "2024-01-01"}
          </span>
        </div>
        <CC0 locale={locale} />
        <SourceUrl locale={locale} sourceUrl={focusedModelsObj.credit} />
      </div>
    </ModalWrapper>
  );
};

export default ModelInfoModal;
