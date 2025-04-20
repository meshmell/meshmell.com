import { Dispatch, SetStateAction, useEffect } from "react";
import { ImCross } from "react-icons/im";
import { RiShareBoxFill } from "react-icons/ri";

import { useTranslations } from "next-intl";
import { LocaleKeyType } from "@/src/types/locale";
import { ModalOpenType } from "@/src/types/modals";

type DownloadErrorModalType = {
  locale: LocaleKeyType;
  setModalOpen: Dispatch<SetStateAction<ModalOpenType>>;
  isFocusedMode: boolean;
};

const DownloadErrorModal = ({
  locale,
  setModalOpen,
  isFocusedMode,
}: DownloadErrorModalType) => {
  const t = useTranslations("main");

  useEffect(() => {
    if (!isFocusedMode) {
      handleClickClose();
    }
  }, [isFocusedMode]);

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      downloadError: false,
    }));
  };

  const handleGoToContact = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      downloadError: false,
      contact: true,
    }));
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black bg-opacity-50">
      <div className="h-96 w-[384px] rounded-lg bg-neutral-100 p-6 dark:bg-neutral-950">
        <div className="flex flex-col gap-2">
          <div className="mb-4 flex justify-start">
            <div
              onClick={handleClickClose}
              className={
                "flex h-12 w-12 items-center justify-center rounded-full border-[2.2px] border-black bg-transparent dark:border-white sm:h-14 sm:w-14 sm:border-[3px]"
              }
            >
              <button className="text-base font-bold sm:text-xl">
                <ImCross />
              </button>
            </div>
          </div>
          <div className="mb-8 text-3xl font-bold">{t("download.sorry")}</div>
          <div className="mb-8">{t("download.couldNotFind")}</div>
          <div
            className="flex gap-1 text-blue-600 dark:text-blue-400"
            onClick={handleGoToContact}
          >
            <div className="cursor-pointer underline">
              {t("download.contactUs")}
            </div>
            <span className="mt-[6px]">
              <RiShareBoxFill />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadErrorModal;
