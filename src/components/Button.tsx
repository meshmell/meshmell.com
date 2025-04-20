type ButtonProps = {
  handleClick?: () => void;
  isActive?: boolean;
  children: React.ReactNode;
  hasTwoIcons?: boolean;
};

const Button = ({
  handleClick,
  isActive,
  children,
  hasTwoIcons,
}: ButtonProps) => {
  return (
    <button
      onClick={handleClick}
      className={
        "relative flex justify-center rounded-[10px] shadow-md sm:rounded-[18px]"
      }
    >
      <div
        className={`${
          isActive
            ? "custom-bg-gray-active-button"
            : "custom-bg-gray-inactive-button"
        } ${hasTwoIcons ? "px-[4px] sm:px-[8px]" : "w-12 sm:w-14"} flex h-12 items-center justify-center rounded-[10px] sm:h-14 sm:rounded-[18px]`}
      >
        {children}
      </div>
    </button>
  );
};

export default Button;
