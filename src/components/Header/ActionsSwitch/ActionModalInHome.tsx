import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";

import { ActionDetailsType } from "@/src/types/actions";
import { ModalOpenType } from "@/src/types/modals";

import { defaultActionsDetails } from "@/src/utils/defaultData/actions";

type ActionsSwitchModalType = {
  setModalOpen: Dispatch<SetStateAction<ModalOpenType>>;
};

const ActionsSwitchModal = ({ setModalOpen }: ActionsSwitchModalType) => {
  const t = useTranslations("main");

  const searchParams = useSearchParams();

  const router = useRouter();
  const pathname = usePathname();
  const 

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
    <ActionContent
      currentAction={currentAction}
      actions={actions}
      handleClick={handleClick}
    />
  );
};

export default ActionsSwitchModal;
