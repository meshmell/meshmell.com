import { useTranslations } from "next-intl";

import { useRouter } from "@/src/i18n/navigation";

type LogoType = {
  isInFooter?: boolean;
  canBeClicked?: boolean;
  withDescription?: boolean;
};

const Logo = ({
  isInFooter,
  canBeClicked,
  withDescription = true,
}: LogoType) => {
  const router = useRouter();
  const handleResetCamera = () => {
    router.push("/exhibition");
  };

  const t = useTranslations("main");

  let baseClass = "font-bold text-black dark:text-white";
  baseClass += " ";

  if (isInFooter) {
    baseClass += "text-[0.75rem] ml-[2px] -mt-[19px]";
  } else {
    baseClass += "text-[0.875rem] ml-[1px] -mt-[17px]";
  }

  return (
    <div
      className={`${canBeClicked ? "cursor-pointer" : ""} mb-1 sm:mb-0`}
      onClick={canBeClicked ? handleResetCamera : undefined}
    >
      <div
        className={`mt-[-10px] bg-gradient-to-l from-[#ffaa00] to-[#b300ff] bg-clip-text font-sans font-bold leading-[1.4] -tracking-[.04em] text-transparent sm:leading-[1.4] ${!isInFooter && "select-none"} text-[3rem]`}
      >
        Meshmell
      </div>
      {withDescription && (
        <div className={baseClass}>{t("logo.description")}</div>
      )}
    </div>
  );
};

export default Logo;
