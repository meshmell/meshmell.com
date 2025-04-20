import { Html } from "@react-three/drei";

import { useTranslations } from "next-intl";
import { LocaleKeyType } from "@/src/types/locale";

type NamePlateType = {
  locale: LocaleKeyType;
};

const NoResultPlate = ({ locale }: NamePlateType) => {
  const t = useTranslations("main");

  return (
    <Html fullscreen zIndexRange={[0, 0]}>
      <div className="absolute left-1/2 top-1/2 flex h-20 w-56 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-lg bg-neutral-100 px-4 py-2 dark:bg-neutral-950">
        <div className="text-center text-3xl font-bold">
          {t("namePlate.noResult")}
        </div>
      </div>
    </Html>
  );
};

export default NoResultPlate;
