import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";

import ModalWrapper from "@/src/components/ModalWrapper";
import { ActionDetailsType } from "@/src/types/actions";
import { LocaleKeyType } from "@/src/types/locale";
import { ModalOpenType } from "@/src/types/modals";
import { ModelDetailsType } from "@/src/types/models";

import { defaultActionsDetails } from "@/src/utils/defaultData/actions";

type ActionsSwitchModalType = {
  setModalOpen: Dispatch<SetStateAction<ModalOpenType>>;
  locale: LocaleKeyType;
  modalOpen: ModalOpenType;
  focusedModelsObj: ModelDetailsType;
  setHoverOnModal: Dispatch<SetStateAction<boolean>>;
  currentAction: string;
  actions: ActionDetailsType[];
};

const ActionsSwitchModal = ({
  setModalOpen,
  locale,
  modalOpen,
  focusedModelsObj,
  setHoverOnModal,
  currentAction,
  actions,
}: ActionsSwitchModalType) => {
  const t = useTranslations("main");

  const searchParams = useSearchParams();

  const router = useRouter();
  const pathname = usePathname();
  const focusedModelsActionsList = focusedModelsObj.actions?.map(
    (action: string) =>
      actions.find(
        (actionData: ActionDetailsType) => actionData.slug === action,
      ) || defaultActionsDetails,
  );

  const handleClick = (paramValue: string) => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      actionsSwitch: false,
    }));
    const newParams = new URLSearchParams(searchParams.toString());

    newParams.set("action", paramValue);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      actionsSwitch: false,
    }));
  };

  return (
    <ModalWrapper
      isVisible={modalOpen.actionsSwitch}
      handleClose={handleClickClose}
      leftRight="right"
      widthWhenLargeDevice="384"
      heightWhenSmallDevice="700"
      title={t("actionsSwitch.title")}
      setHoverOnModal={setHoverOnModal}
    >
      <ActionsSwitchContent
        currentAction={currentAction}
        actions={actions}
        handleClick={handleClick}
      />
    </ModalWrapper>
  );
};

export default ActionsSwitchModal;
