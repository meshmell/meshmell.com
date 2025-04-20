import * as THREE from "three";

import { viewTypes, WindowType } from "@/src/types/views";
import { views } from "@/src/utils/views/index";

const calcPositionOfAModel = (
  index: number,
  currentView: viewTypes,
  windowType: WindowType,
): THREE.Vector3 => {
  const currentViewObj =
    views.find((view) => view.slug === currentView) || views[0];
  const currentViewAndWindowObj = currentViewObj.windowWidths[windowType];
  let x, y, z;
  const stepSize = currentViewAndWindowObj.stepSize;
  const leftColumnX = currentViewAndWindowObj.leftColumnX;
  const rightColumnX = currentViewAndWindowObj.rightColumnX;

  if (currentView === "vertical") {
    x = 0;
    y = Math.floor(index / 2) * -stepSize;
    z = index % 2 === 0 ? rightColumnX : leftColumnX;
  } else if (currentView === "horizontal") {
    x = 0;
    y = index % 2 === 0 ? rightColumnX : leftColumnX;
    z = Math.floor(index / 2) * -stepSize;
  } else if (currentView === "perspective") {
    x = index % 2 === 0 ? leftColumnX : rightColumnX;
    y = 0;
    z = Math.floor(index / 2) * -stepSize;
  }

  return new THREE.Vector3(x, y, z);
};

export default calcPositionOfAModel;
