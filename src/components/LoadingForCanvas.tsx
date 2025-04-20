import { useProgress } from "@react-three/drei";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Puff } from "react-loader-spinner";

import { useTranslations } from "next-intl";
import { LocaleKeyType } from "@/src/types/locale";

type LoadingForCanvasType = {
  locale: LocaleKeyType;
  started: boolean;
  setStarted: Dispatch<SetStateAction<boolean>>;
};

const LoadingForCanvas = ({
  locale,
  started,
  setStarted,
}: LoadingForCanvasType) => {
  const t = useTranslations("main");

  const { progress } = useProgress();
  const [showStartButton, setShowStartButton] = useState(false);
  const [maxProgress, setMaxProgress] = useState(0);

  useEffect(() => {
    if (progress > maxProgress) {
      setMaxProgress(progress);
    }

    if (maxProgress === 100) {
      setShowStartButton(true);
    }
  }, [progress, maxProgress]);

  const handleStartClick = () => {
    setStarted(true);
  };

  return (
    <>
      <div
        className={`fixed right-0 top-0 z-[1000] flex h-screen w-screen flex-col items-center justify-center border bg-gradient-to-r from-purple-600 to-orange-500 ${started ? "hidden" : "flex"}`}
      >
        <h1 className="mb-4 text-5xl font-bold text-white">
          {t("loadingForCanvas.name")}
        </h1>
        <div className="mt-4 py-2">
          {showStartButton ? (
            <button
              className="my-[50px] h-[100px] rounded bg-[#ffffff] px-6 text-3xl font-extrabold text-violet-800 transition duration-300"
              onClick={handleStartClick}
            >
              {t("loadingForCanvas.start")}
            </button>
          ) : (
            <Puff
              height="200"
              width="200"
              radius={1}
              color="white"
              ariaLabel="puff-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          )}
        </div>
        <div className="text-white">
          {maxProgress === 100 ? (
            <div className="mt-2 text-2xl">{t("loadingForCanvas.loaded")}</div>
          ) : (
            <div className="mt-2 text-2xl">{t("loadingForCanvas.loading")}</div>
          )}
          <div className="text-center text-2xl">
            {Math.floor(maxProgress)} %
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingForCanvas;
