import { Dispatch, SetStateAction } from "react";

import CancelButton from "@/src/components/Focus/CancelButton";
import CreatorInfoButton from "@/src/components/Focus/CreatorInfo/Button";
import DownloadButton from "@/src/components/Focus/Download/Button";
import ModelInfoButton from "@/src/components/Focus/ModelInfo/Button";
import { CreatorDetailsType } from "@/src/types/creators";
import { ModalOpenType } from "@/src/types/modals";

import { DateItem } from "@/src/types/downloadCountData";
import { ModelDetailsType } from "@/src/types/models";

type InfoButtonType = {
  locale: LocaleKeyType;
  setModalOpen: Dispatch<SetStateAction<ModalOpenType>>;
  focusedModelsObj: ModelDetailsType;
  modalOpen: ModalOpenType;
  focusedModelsDownloadData: Record<string, DateItem>;
  getFirebaseDataLoading: boolean;
  models: ModelDetailsType[];
  creators: CreatorDetailsType[];
  isFocusedMode: boolean;
};

const Focus = ({
  locale,
  setModalOpen,
  focusedModelsObj,
  modalOpen,
  focusedModelsDownloadData,
  getFirebaseDataLoading,
  models,
  creators,
  isFocusedMode,
}: InfoButtonType) => {
  return (
    <div
      className={`fixed bottom-[10px] left-[10px] z-[70] rounded-xl p-1 ${isFocusedMode ? "block" : "hidden"}`}
    >
      <div className="vertical-buttons-container">
        <ModelInfoButton setModalOpen={setModalOpen} modalOpen={modalOpen} />
        <CreatorInfoButton
          locale={locale}
          setModalOpen={setModalOpen}
          modalOpen={modalOpen}
          focusedModelsSlug={focusedModelsObj.slug}
          models={models}
          creators={creators}
        />
        <DownloadButton
          setModalOpen={setModalOpen}
          modalOpen={modalOpen}
          getFirebaseDataLoading={getFirebaseDataLoading}
          focusedModelsDownloadData={focusedModelsDownloadData}
        />
        <CancelButton locale={locale} />
      </div>
    </div>
  );
};

export default Focus;
