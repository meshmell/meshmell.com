import { useTranslations } from "next-intl";

type ContactUsParagraphContent = {
  en: string;
  ja: string;
};

type ContactUsParagraphType = {
  locale: LocaleKeyType;
  content: ContactUsParagraphContent;
  handleGoToContact: () => void;
  num: number;
};
const ContactUsParagraph = ({
  locale,
  content,
  handleGoToContact,
  num,
}: ContactUsParagraphType) => {
  const t = useTranslations("main");

  return (
    <section className="mb-6">
      <h2 className="mb-1 text-xl font-semibold">
        {num}
        {t("contact.contactUs")}
      </h2>
      <p>
        {locale === "en" ? (
          <>
            If you have any questions about this {content.en}, please{" "}
            <span
              onClick={handleGoToContact}
              className="cursor-pointer text-blue-500 underline"
            >
              contact us
            </span>
            .
          </>
        ) : (
          <>
            この{content.ja}についてのご質問がある場合は、
            <span
              onClick={handleGoToContact}
              className="cursor-pointer text-blue-500 underline"
            >
              こちらから
            </span>
            お問い合わせください。
          </>
        )}
      </p>
    </section>
  );
};

export default ContactUsParagraph;
