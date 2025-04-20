import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

type PaginationArrowButtonProps = {
  isVisible: boolean;
  direction: "left" | "right";
  onClick: () => void;
};

const PaginationArrowButton = ({
  isVisible,
  direction,
  onClick,
}: PaginationArrowButtonProps) => {
  return isVisible ? (
    <div className="pagination-button font-bold" onClick={onClick}>
      {direction === "left" ? (
        <MdOutlineKeyboardDoubleArrowLeft />
      ) : (
        <MdOutlineKeyboardDoubleArrowRight />
      )}
    </div>
  ) : (
    <div className="w-[40px]"></div>
  );
};

export default PaginationArrowButton;
