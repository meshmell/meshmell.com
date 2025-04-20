import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";

import ModalWrapper from "@/src/components/ModalWrapper";
import { ActionDetailsType } from "@/src/types/actions";
import { LocaleKeyType } from "@/src/types/locale";
import { ModalOpenType } from "@/src/types/modals";
import { ModelDetailsType } from "@/src/types/models";

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
      ) as ActionDetailsType,
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
      <div className="flex flex-col gap-8">
        <div className="flex max-h-[80%] flex-col gap-2 overflow-y-auto">
          <div
            onClick={() => handleClick("none")}
            className={`${currentAction === "none" ? "bg-emerald-500 text-white dark:text-black" : "border-2 hover:text-blue-700 dark:hover:text-blue-300"} flex cursor-pointer items-center justify-between rounded-md px-2 py-1`}
          >
            {t("actionsSwitch.stopAction")}
          </div>
          {focusedModelsActionsList.map(
            ({ name, icon, slug }: ActionDetailsType) => (
              <div
                onClick={() => handleClick(slug)}
                key={slug}
                className={`${currentAction === slug ? "bg-emerald-500 text-white dark:text-black" : "border-2 hover:text-blue-700 dark:hover:text-blue-300"} flex cursor-pointer items-center justify-between rounded-md px-2 py-1`}
              >
                <div>{name[locale as LocaleKeyType]}</div>
                <div className="mb-2 mr-2 w-20 rounded-md">{icon}</div>
              </div>
            ),
          )}
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ActionsSwitchModal;
