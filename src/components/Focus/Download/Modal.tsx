import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BiSolidDownload } from "react-icons/bi";

import LoadingForButton from "@/src/components/ModalComponents/LoadingForButton";
import ModalWrapper from "@/src/components/ModalWrapper";
import { useTranslations } from "next-intl";
import { LocaleKeyType } from "@/src/types/locale";
import { ModalOpenType } from "@/src/types/modals";
import { WindowType } from "@/src/types/views";
import { handleDownloadFileFromGCS } from "@/src/utils/downloadFileFromGCS";
import { fileFormats } from "@/src/utils/fileFormats";

import DownloadGraph from "./Graph";

import { DateItem } from "@/src/types/downloadCountData";
import { ModelDetailsType } from "@/src/types/models";
import handleIncrementDownloadToFirebase from "@/src/utils/handleIncrementDownloadToFirebase";

type DownloadModalType = {
  locale: LocaleKeyType;
  modalOpen: ModalOpenType;
  setModalOpen: Dispatch<SetStateAction<ModalOpenType>>;
  focusedModelsObj: ModelDetailsType;
  setFocusedModelsDownloadData: Dispatch<
    SetStateAction<Record<string, DateItem>>
  >;
  focusedModelsDownloadData: Record<string, DateItem>;
  windowType: WindowType;
  setGetFirebaseDataLoading: Dispatch<SetStateAction<boolean>>;
  isFocusedMode: boolean;
};

const DownloadModal = ({
  locale,
  setModalOpen,
  focusedModelsObj,
  setFocusedModelsDownloadData,
  focusedModelsDownloadData,
  modalOpen,
  windowType,
  setGetFirebaseDataLoading,
  isFocusedMode,
}: DownloadModalType) => {
  const t = useTranslations("main");

  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [selectedFormats, setSelectedFormats] = useState<string[]>(["glb"]);
  const [currentResolution, setCurrentResolution] = useState<string>("");
  const isZipped = true;

  const handleFormatChange = (format: string) => {
    setSelectedFormats((prevFormats) => {
      if (prevFormats.includes(format)) {
        return prevFormats.filter((f) => f !== format);
      } else {
        return [...prevFormats, format];
      }
    });
  };

  useEffect(() => {
    if (!isFocusedMode) {
      handleClickClose();
    }
  }, [isFocusedMode]);

  useEffect(() => {
    if (!focusedModelsObj.resolutions) return;

    if (focusedModelsObj.resolutions.length > 0) {
      setCurrentResolution(focusedModelsObj.resolutions[0]);
    }
  }, [focusedModelsObj.resolutions]);

  const handleDownloadClick = () => {
    setIsDownloading(true);
    const resolution = currentResolution ? `${currentResolution}` : "";

    handleDownloadFileFromGCS(focusedModelsObj, resolution, isZipped)
      .then(() => {
        setModalOpen((prevState: ModalOpenType) => ({
          ...prevState,
          downloadCredit: true,
        }));
        handleIncrementDownloadToFirebase(
          setFocusedModelsDownloadData,
          focusedModelsObj,
          setGetFirebaseDataLoading,
        );
        setIsDownloading(false);
      })
      .catch((error) => {
        setIsDownloading(false);
        setModalOpen((prevState: ModalOpenType) => ({
          ...prevState,
          downloadError: true,
        }));
        console.error("Download failed", error);
      });
  };

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      download: false,
    }));
  };

  return (
    <ModalWrapper
      isVisible={modalOpen.download}
      handleClose={handleClickClose}
      leftRight="left"
      widthWhenLargeDevice="384"
      heightWhenSmallDevice="700"
      title={t("download.download")}
    >
      <div className="flex flex-col gap-8">
        {focusedModelsObj.isDownloadable ? (
          <>
            <div className="flex flex-row items-center justify-evenly gap-1">
              {focusedModelsObj.resolutions &&
                focusedModelsObj.resolutions.length > 0 && (
                  <div className="flex flex-col items-center">
                    {focusedModelsObj.resolutions.map((resolution, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrentResolution(resolution);
                        }}
                        className={`my-1 rounded border px-2 py-1 ${
                          currentResolution === resolution
                            ? "bg-blue-500 text-white"
                            : "border-gray-300 bg-neutral-100 dark:bg-neutral-950"
                        }`}
                      >
                        {resolution}
                      </button>
                    ))}
                  </div>
                )}

              <div className="rounded p-2">
                {fileFormats
                  .filter((format) =>
                    focusedModelsObj.formats.includes(format.extension),
                  )
                  .map((format, index) => (
                    <div key={index} className="mb-2 flex items-center">
                      <input
                        type="checkbox"
                        id={`format-${format.extension}`}
                        checked={selectedFormats.includes(format.extension)}
                        onChange={() => handleFormatChange(format.extension)}
                        className="mr-2"
                      />
                      <label
                        htmlFor={`format-${format.extension}`}
                        className="cursor-pointer"
                      >
                        {format.name} (.{format.extension})
                      </label>
                    </div>
                  ))}
              </div>
              {/* Download Button */}
              <div
                className={`${!isDownloading && "border-2 border-black dark:border-white"} flex h-12 w-12 cursor-pointer items-center justify-center rounded-full p-1 sm:h-14 sm:w-14`}
              >
                {isDownloading ? (
                  windowType === "windowWidth_tablet" ||
                  windowType === "windowWidth_pc" ? (
                    <LoadingForButton height="56" width="56" />
                  ) : (
                    <LoadingForButton height="25" width="25" />
                  )
                ) : (
                  <BiSolidDownload
                    className="text-3xl sm:text-4xl"
                    onClick={handleDownloadClick}
                  />
                )}
              </div>
            </div>
            <DownloadGraph
              locale={locale}
              focusedModelsDownloadData={focusedModelsDownloadData}
            />
          </>
        ) : (
          <div className="text-center text-lg">
            {t("download.canDownloadFromOriginalSite")}
            <div className="mt-[15px] text-center text-lg">
              <a
                href={focusedModelsObj.source?.downloadSite}
                className="font-bold text-blue-500 dark:text-blue-400"
              >
                {focusedModelsObj.source?.downloadSite}
              </a>
            </div>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
};

export default DownloadModal;
