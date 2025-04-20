import { useTranslations } from "next-intl";
import { MdOutlineSource } from "react-icons/md";

type ModelSourceUrlType = {
  locale: LocaleKeyType;
  sourceUrl: string;
};

const ModelSourceUrl = ({ locale, sourceUrl }: ModelSourceUrlType) => {
  const t = useTranslations("main");

  const sourceWebsite = sourceUrl
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .split("/")[0];

  return (
    <div className="flex cursor-pointer text-xl">
      <span className="w-8">
        <MdOutlineSource className="mt-[3px] pl-1 text-2xl" />
      </span>
      <span className="ml-1 sm:ml-2">
        {t("modelSourceUrl.source1")}
        <a href={sourceUrl} className="text-blue-600 dark:text-blue-400">
          {sourceWebsite}
        </a>
        {t("modelSourceUrl.source2")}
      </span>
    </div>
  );
};

export default ModelSourceUrl;
