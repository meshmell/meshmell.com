import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";

import ActionModalInHome from "@/src/components/Header/ActionsSwitch/ActionModalInHome";
import ActionsSwitchButton from "@/src/components/Header/ActionsSwitch/Button";
import WireFrameSwitchButton from "@/src/components/Header/WireFrameSwitch/Button";

const HomeSingleModelWindow = () => {
  const [modalOpen, setModalOpen] = useState<>({
    actionsSwitch: false,
  });

  return (
    <>
      <div className="relative mx-auto mb-8 h-[70vh] w-[90vw] overflow-hidden rounded-lg border-2 bg-sky-100 shadow-lg dark:bg-sky-950">
        <div className="absolute right-0 top-0 mr-2 mt-2 flex gap-2 md:mr-4 md:mt-4">
          <ActionsSwitchButton
            setModalOpen={setModalOpen}
            modalOpen={modalOpen}
          />
          <WireFrameSwitchButton
            locale={locale}
            setIsWireFrame={setIsWireFrame}
            isWireFrame={isWireFrame}
          />
          {modalOpen.actionsSwitch && <ActionModalInHome />}
        </div>
        <Canvas shadows>
          <Suspense fallback={null}>
            <SingleModelSceneForHome
              isWireFrame={isWireFrame}
              homeDefaultObj={homeDefaultObj}
            />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
};

export default HomeSingleModelWindow;
