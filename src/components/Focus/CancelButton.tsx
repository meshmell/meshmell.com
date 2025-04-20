import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RxCross2 } from "react-icons/rx";

const CancelButton = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const handleUnFocus = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("focusedMode", "off");
    newParams.set("action", "none");
    newParams.set("wireFrame", "off");
    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <button
      className="custom-bg-gray-normal-button mt-4 cursor-pointer rounded-full p-3 text-3xl font-bold shadow-lg sm:p-4 sm:text-5xl"
      onClick={handleUnFocus}
    >
      <RxCross2 />
    </button>
  );
};

export default CancelButton;
