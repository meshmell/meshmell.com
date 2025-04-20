import { Dispatch, SetStateAction, useEffect } from "react";
import { ImCross } from "react-icons/im";

import CreatorInfo from "@/src/components/Focus/CreatorInfo/Contents";
import { useTranslations } from "next-intl";
import { CreatorDetailsType } from "@/src/types/creators";
import { LocaleKeyType } from "@/src/types/locale";
import { ModalOpenType } from "@/src/types/modals";

type DownloadCreditModalType = {
  locale: LocaleKeyType;
  setModalOpen: Dispatch<SetStateAction<ModalOpenType>>;
  focusedModelsCreatorsObj: CreatorDetailsType;
  isFocusedMode: boolean;
};

const DownloadCreditModal = ({
  locale,
  setModalOpen,
  focusedModelsCreatorsObj,
  isFocusedMode,
}: DownloadCreditModalType) => {
  const t = useTranslations("main");

  useEffect(() => {
    if (!isFocusedMode) {
      handleClickClose();
    }
  }, [isFocusedMode]);

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      downloadCredit: false,
    }));
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black bg-opacity-50 dark:bg-gray-500 dark:bg-opacity-50">
      <div className="w-96 rounded-lg bg-neutral-100 p-6 dark:bg-neutral-900">
        <div className="flex flex-col gap-4">
          <div className="mb-4 flex justify-start">
            <div
              onClick={handleClickClose}
              className={
                "flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-transparent dark:border-white sm:h-14 sm:w-14 sm:border-4"
              }
            >
              <button className="text-base font-bold sm:text-xl">
                <ImCross />
              </button>
            </div>
          </div>
          <div className="text-xl font-bold sm:text-2xl">
            {t("download.thankTo")}
          </div>
          <CreatorInfo
            creatorsObj={focusedModelsCreatorsObj}
            locale={locale}
            isFocusedMode={isFocusedMode}
          />
        </div>
      </div>
    </div>
  );
};

export default DownloadCreditModal;
