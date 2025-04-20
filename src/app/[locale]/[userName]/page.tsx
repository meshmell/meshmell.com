"use client";

import { LocaleKeyType } from "@/src/types/locale";

import UserPage from "./UserPage";

const App = ({
  params,
}: {
  params: { locale: LocaleKeyType; userId: string };
}) => {
  return (
    <>
      <UserPage userId={params.userId} />
    </>
  );
};

export default App;
