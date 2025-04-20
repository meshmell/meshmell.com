import { Dispatch, MouseEvent, ReactNode, SetStateAction } from "react";
import { RxCross2 } from "react-icons/rx";

type ModalWrapperProps = {
  isVisible: boolean;
  handleClose: () => void;
  children: ReactNode;
  leftRight: "left" | "right";
  widthWhenLargeDevice: "208" | "384" | "450" | "600";
  heightWhenSmallDevice: "700" | "500";
  title?: string;
  setHoverOnModal?: Dispatch<SetStateAction<boolean>>;
};

const ModalWrapper = ({
  isVisible,
  handleClose,
  children,
  leftRight,
  widthWhenLargeDevice,
  heightWhenSmallDevice,
  title,
  setHoverOnModal,
}: ModalWrapperProps) => {
  const handleClickInside = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const leftRightClass = leftRight === "left" ? "left-0" : "right-0";
  const isVisibleClass =
    leftRight === "left"
      ? isVisible
        ? "sm:translate-x-0"
        : "sm:-translate-x-full"
      : isVisible
        ? "sm:translate-x-0"
        : "sm:translate-x-full";

  let widthWhenLargeDeviceClass = "";
  let heightWhenSmallDeviceClass = "";

  switch (widthWhenLargeDevice) {
    case "208":
      widthWhenLargeDeviceClass = "sm:w-[208px]";
      break;
    case "384":
      widthWhenLargeDeviceClass = "sm:w-[384px]";
      break;
    case "450":
      widthWhenLargeDeviceClass = "sm:w-[450px]";
      break;
    case "600":
      widthWhenLargeDeviceClass = "sm:w-[600px]";
      break;
    default:
      widthWhenLargeDeviceClass = ""; // Default class or handle case if needed
  }

  switch (heightWhenSmallDevice) {
    case "700":
      heightWhenSmallDeviceClass = "h-[700px]";
      break;
    case "500":
      heightWhenSmallDeviceClass = "h-[500px]";
      break;
    default:
      heightWhenSmallDeviceClass = ""; // Default class or handle case if needed
  }

  const crossMarkContainerClass =
    leftRight === "left" ? "justify-start" : "justify-end";

  const handleClickClose = () => {
    handleClose();
  };

  return (
    <>
      {isVisible && (
        <div
          className="fixed inset-0 z-[60] flex h-screen justify-end bg-black bg-opacity-0"
          onClick={handleClickClose}
        ></div>
      )}
      <div
        className={`fixed bottom-[0px] z-[100] flex w-full flex-col gap-4 rounded-lg bg-neutral-100 p-6 transition-transform duration-150 dark:bg-neutral-950 sm:top-[0px] sm:h-screen ${isVisible ? "visible translate-x-0 translate-y-0 ease-in sm:translate-y-0" : "invisible translate-y-full sm:translate-y-[0px]"} ${leftRightClass} ${isVisibleClass} ${widthWhenLargeDeviceClass} ${heightWhenSmallDeviceClass}`}
        onClick={handleClickInside}
        onMouseEnter={setHoverOnModal ? () => setHoverOnModal(true) : undefined}
        onMouseLeave={
          setHoverOnModal ? () => setHoverOnModal(false) : undefined
        }
        onTouchStart={setHoverOnModal ? () => setHoverOnModal(true) : undefined}
        onTouchEnd={setHoverOnModal ? () => setHoverOnModal(false) : undefined}
      >
        <div className={`mb-4 flex ${crossMarkContainerClass}`}>
          <div
            onClick={handleClickClose}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-transparent sm:h-14 sm:w-14"
          >
            <button className="text-2xl font-bold sm:text-4xl">
              <RxCross2 />
            </button>
          </div>
        </div>

        <h2 className="mb-4 text-2xl font-bold">{title}</h2>
        {children}
      </div>
    </>
  );
};

export default ModalWrapper;
