import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";
import { Dispatch, SetStateAction } from "react";

import HorizontalViewIcon from "@/src/components/Svg/Views/HorizontalViewIcon";
import PerspectiveViewIcon from "@/src/components/Svg/Views/PerspectiveViewIcon";
import VerticalViewIcon from "@/src/components/Svg/Views/VerticalViewIcon";
import { useTranslations } from "next-intl";
import { LocaleKeyType } from "@/src/types/locale";
import { ModalOpenType } from "@/src/types/modals";
import { viewTypes } from "@/src/types/views";
import { views } from "@/src/utils/views";

import ModalWrapper from "../../ModalWrapper";

type ViewsSwitchModalType = {
  lang: string;
  modalOpen: ModalOpenType;
  setModalOpen: Dispatch<SetStateAction<ModalOpenType>>;
  setHoverOnModal: Dispatch<SetStateAction<boolean>>;
  view: viewTypes;
};

const ViewsSwitchModal = ({
  locale,
  setModalOpen,
  setHoverOnModal,
  view,
  modalOpen,
}: ViewsSwitchModalType) => {
  const { theme } = useTheme();

  const t = useTranslations("main");
  const router = useRouter();

  const searchParams = useSearchParams();
  const newParams = new URLSearchParams(searchParams.toString());
  const pathname = usePathname();
  const handleClick = (paramValue: string) => {
    setHoverOnModal(false);
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      viewsSwitch: false,
    }));
    newParams.set("view", paramValue);
    newParams.set("focusedMode", "off");
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const handleClickClose = () => {
    setHoverOnModal(false);
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      viewsSwitch: false,
    }));
  };

  return (
    <ModalWrapper
      isVisible={modalOpen.viewsSwitch}
      handleClose={handleClickClose}
      leftRight="right"
      widthWhenLargeDevice="384"
      heightWhenSmallDevice="700"
      setHoverOnModal={setHoverOnModal}
    >
      <div className="flex w-[180px] flex-col gap-8">
        <h2 className="text-2xl font-bold">{t("viewsSwitch.switchView")}</h2>
        {views.map(
          ({
            slug,
            name,
          }: {
            slug: string;
            name: { en: string; ja: string };
          }) => {
            const borderColor =
              slug === view
                ? theme === "light"
                  ? "border-white"
                  : "border-black"
                : theme === "light"
                  ? "border-black group-hover:border-blue-700"
                  : "border-white group-hover:border-blue-300";

            return (
              <div
                key={slug}
                className={`group select-none rounded-md p-2 ${slug === view ? "bg-emerald-500 fill-white text-white dark:fill-black dark:text-black" : "fill-black hover:fill-blue-700 hover:text-blue-700 dark:fill-white dark:hover:fill-blue-300 dark:hover:text-blue-300"} ${slug === "horizontal" ? "hidden sm:block" : "block md:block"}`}
                onClick={() => handleClick(slug)}
              >
                <div className="flex flex-col">
                  <div className="mb-[6px] text-xl font-semibold">
                    {name[locale as LocaleKeyType]}
                  </div>
                  <div
                    className={`relative h-[100px] w-[100px] border-[4px] p-[4px] ${borderColor} rounded-lg`}
                  >
                    {slug === "perspective" ? (
                      <PerspectiveViewIcon />
                    ) : slug === "vertical" ? (
                      <VerticalViewIcon />
                    ) : (
                      <HorizontalViewIcon />
                    )}
                  </div>
                </div>
              </div>
            );
          },
        )}
      </div>
    </ModalWrapper>
  );
};

export default ViewsSwitchModal;
