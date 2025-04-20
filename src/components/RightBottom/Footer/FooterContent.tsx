import { useTranslations } from "next-intl";

import Logo from "../../Logo";
import SnsLinksForMeshmell from "../../ModalComponents/SnsLinksForMeshmell";

const FooterContent = () => {
  const t = useTranslations("main");

  return (
    <div className="flex h-full flex-col justify-around">
      <div className="flex justify-start">
        <Logo isInFooter canBeClicked={false} />
      </div>
      <div className="flex flex-col gap-8">
        <div className="text-base font-semibold">
          <div
            className="w-36 cursor-pointer appearance-none bg-transparent outline-current hover:underline"
            onClick={setAboutModalOpen}
          >
            <div>{t("about.footer")}</div>
          </div>
          <div
            className="w-36 cursor-pointer appearance-none bg-transparent outline-current hover:underline"
            onClick={setContactModalOpen}
          >
            <div>{t("contact.footer")}</div>
          </div>
          <div
            className="w-36 cursor-pointer appearance-none bg-transparent outline-current hover:underline"
            onClick={setWhoModalOpen}
          >
            <div>{t("who.footer")}</div>
          </div>
        </div>
        <ul>
          <li className="cursor-pointer" onClick={setTermsModalOpen}>
            <div className="hover:underline">{t("terms.footer")}</div>
          </li>
          <li className="cursor-pointer" onClick={setPrivacyModalOpen}>
            <div className="hover:underline">{t("privacyPolicy.footer")}</div>
          </li>
          <li className="cursor-pointer" onClick={setCopyRightModalOpen}>
            <div className="hover:underline">{t("copyRight.footer")}</div>
          </li>
          <li className="cursor-pointer" onClick={setForDevelopersModalOpen}>
            <div className="hover:underline">{t("forDevelopers.footer")}</div>
          </li>
          <li className="cursor-pointer" onClick={setForSponsorsModalOpen}>
            <div className="hover:underline">{t("forSponsors.footer")}</div>
          </li>
        </ul>
        <SnsLinksForMeshmell locale={locale} />
        <div className="text-xs">
          <div>© Meshmell 2023. All rights reserved</div>
        </div>
      </div>
    </div>
  );
};

export default FooterContent;
