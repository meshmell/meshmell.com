import ConsoleMessage from "@/src/components/Console/Message";
import { LocaleKeyType } from "@/src/types/locale";

import Home from "./Home";

const App = async ({
  params,
}: {
  params: Promise<{ locale: LocaleKeyType }>;
}) => {
  const { locale } = await params;

  return (
    <>
      <ConsoleMessage />
      <Home locale={locale} />
    </>
  );
};

export default App;
