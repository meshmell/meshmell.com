import GbFlagSvg from "@/src/components/Svg/Language/GbFlagSvg";
import JpFlagSvg from "@/src/components/Svg/Language/JpFlagSvg";
import { LocaleKeyType } from "@/src/types/locale";

interface FlagComponentProps {
  locale: LocaleKeyType;
  className?: string;
}

const FlagComponent = ({ locale, className }: FlagComponentProps) => {
  switch (locale) {
    case "en":
      return (
        <div className={className}>
          <GbFlagSvg style={{ width: "100%", height: "100%" }} />
        </div>
      );
    case "ja":
      return (
        <div className={className}>
          <JpFlagSvg style={{ width: "100%", height: "100%" }} />
        </div>
      );
    default:
      return <div>No flag available</div>;
  }
};

export default FlagComponent;
