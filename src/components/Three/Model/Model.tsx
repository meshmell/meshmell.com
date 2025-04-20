import { useGLTF, OrbitControls, useAnimations } from "@react-three/drei";
import { useTheme } from "next-themes";
import {
  useRef,
  useEffect,
  useState,
  RefObject,
  SetStateAction,
  Dispatch,
} from "react";
import * as THREE from "three";
import { MeshBasicMaterial } from "three";

import GroundForEachModel from "@/src/components/Three/GroundForEachModel";
import { CreatorDetailsType } from "@/src/types/creators";
import { LocaleKeyType } from "@/src/types/locale";
import { ModelDetailsType } from "@/src/types/models";
import { WindowType, viewTypes } from "@/src/types/views";
import calcPositionOfAModel from "@/src/utils/calcPositionOfAModel";
import { defaultCreatorDetails } from "@/src/utils/defaultData/creators";
import { defaultModelDetails } from "@/src/utils/defaultData/models";
import { focusOnMesh } from "@/src/utils/focusOnMesh";

import NamePlate from "../Model/NamePlate";

type ModelType = {
  focusedModelsObj: ModelDetailsType;
  locale: LocaleKeyType;
  index: number;
  activeMesh: THREE.Mesh | null;
  camera: THREE.Camera;
  modelSlug: string;
  handleMeshFocus: (e: any, meshRef: RefObject<THREE.Mesh>) => void;
  setActiveMesh: Dispatch<
    SetStateAction<THREE.Mesh<
      THREE.BufferGeometry<THREE.NormalBufferAttributes>,
      THREE.Material | THREE.Material[],
      THREE.Object3DEventMap
    > | null>
  >;
  currentView: viewTypes;
  windowType: WindowType;
  isWireFrame: boolean;
  currentAction: string;
  setAction: Dispatch<SetStateAction<string>>;
  models: ModelDetailsType[];
  creators: CreatorDetailsType[];
  isFocusedMode: boolean;
};

const Model = ({
  index,
  focusedModelsObj,
  locale,
  activeMesh,
  camera,
  modelSlug,
  handleMeshFocus,
  setActiveMesh,
  currentView,
  windowType,
  isWireFrame,
  currentAction,
  setAction,
  models,
  creators,
  isFocusedMode,
}: ModelType) => {
  const { resolvedTheme } = useTheme();
  const thisModelsObj: ModelDetailsType =
    models.find((model) => model.slug === modelSlug) || defaultModelDetails;
  const thisModelsCreatorObj: CreatorDetailsType =
    creators.find((creator) => creator.slug === thisModelsObj.creator) ||
    defaultCreatorDetails;
  const mesh1Ref = useRef<THREE.Mesh>(null);
  const position = calcPositionOfAModel(index, currentView, windowType);
  const resolution =
    thisModelsObj.resolutions && thisModelsObj.resolutions.length > 0
      ? "_1k"
      : "";
  const modelPath = `${process.env.NEXT_PUBLIC_GCS_BUCKET_PUBLIC_URL ?? ""}/models/distribution/${thisModelsObj.slug}/${thisModelsObj.slug}${resolution}.${thisModelsObj.usedFormat}`;
  const [isAnimating, setIsAnimating] = useState(false);
  const GltfModel = useGLTF(modelPath);
  const originalMaterials = useRef<{ [id: number]: any }>({});
  const wireFrameMaterial = new MeshBasicMaterial({
    wireframe: true,
    color: resolvedTheme === "dark" ? "white" : "black",
  });

  useEffect(() => {
    GltfModel.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        originalMaterials.current[child.id] = (child as THREE.Mesh).material;
      }
    });
  }, [GltfModel.scene]);

  useEffect(() => {
    if (focusedModelsObj.slug !== GltfModel.userData.id) return;

    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = isWireFrame
          ? wireFrameMaterial
          : originalMaterials.current[child.id];
      }
    });
  }, [isWireFrame, GltfModel.scene, wireFrameMaterial]);

  // const AllActionsOfThisModel = thisModelsObj.actions.map(action => action)

  const { actions } = useAnimations(GltfModel.animations, GltfModel.scene);

  useEffect(() => {
    let isAnyActionPlaying = false;

    if (focusedModelsObj.slug !== GltfModel.userData.id) return;

    if (actions[currentAction]) {
      Object.values(actions).forEach((action) => {
        if (action !== actions[currentAction]) {
          action?.fadeOut(0.1);
        } else {
          action?.reset().fadeIn(0.5).play();
          isAnyActionPlaying = true;
        }
      });
    }

    setIsAnimating(isAnyActionPlaying);
  }, [actions, currentAction]);

  useEffect(() => {
    if (!isAnimating) {
      Object.values(actions).forEach((action) => {
        action?.stop();
      });
    }
  }, [isAnimating, actions]);

  useEffect(() => {
    if (!isFocusedMode) {
      setAction("none");
      Object.values(actions).forEach((action) => {
        action?.fadeOut(0.1);
      });
    }
  }, [isFocusedMode]);

  useEffect(() => {
    if (currentAction === "none") {
      Object.values(actions).forEach((action) => {
        action?.fadeOut(0.1);
      });
    }
  }, [currentAction]);

  GltfModel.userData.id = modelSlug;

  useGLTF.preload(modelPath);

  useEffect(() => {
    if (
      isFocusedMode &&
      focusedModelsObj.slug === GltfModel.userData.id &&
      mesh1Ref.current &&
      activeMesh !== mesh1Ref.current
    ) {
      focusOnMesh(mesh1Ref, setActiveMesh, camera, currentView, windowType);
    }
  }, [
    focusedModelsObj.slug,
    isFocusedMode,
    activeMesh,
    camera,
    GltfModel.userData.id,
    setActiveMesh,
  ]);

  const { scene } = useGLTF(modelPath);

  const getModelDimensions = () => {
    if (!thisModelsObj.rotationDegree) {
      thisModelsObj.rotationDegree = { x: 0, y: 0, z: 0 };
    }

    const boundingBox = new THREE.Box3().setFromObject(scene);

    // Apply the rotation to the model
    scene.rotation.set(
      thisModelsObj.rotationDegree.x,
      thisModelsObj.rotationDegree.y,
      thisModelsObj.rotationDegree.z,
    );

    // Update the bounding box with the new rotation
    boundingBox.setFromObject(scene);

    // Calculate dimensions based on the rotated bounding box
    let width = Math.abs(boundingBox.max.x - boundingBox.min.x);
    let height = Math.abs(boundingBox.max.y - boundingBox.min.y);
    const realHeight = Math.abs(boundingBox.max.y - boundingBox.min.y);
    let depth = Math.abs(boundingBox.max.z - boundingBox.min.z);

    // Apply minimum thresholds
    width = width < 2 ? 2 : width;
    height = height < 2 ? 2 : height;
    depth = depth < 2 ? 2 : depth;

    return {
      width,
      height,
      depth,
      realHeight,
    };
  };

  const thisModelsObjDimensions = getModelDimensions();
  let modelRotationY;

  if (currentView === "perspective") {
    modelRotationY = thisModelsObj.rotationDegree.y - Math.PI / 12;
  } else if (currentView === "vertical") {
    modelRotationY = thisModelsObj.rotationDegree.y + Math.PI / 3;
  } else if (currentView === "horizontal") {
    modelRotationY = thisModelsObj.rotationDegree.y + Math.PI / 3;
  } else {
    modelRotationY = 0;
  }

  return (
    <>
      <OrbitControls
        camera={camera}
        enabled={
          isFocusedMode && focusedModelsObj.slug === GltfModel.userData.id
        }
        maxDistance={50}
        target={
          activeMesh
            ? [
                position.x,
                position.y + thisModelsObjDimensions.realHeight / 2,
                position.z,
              ]
            : [0, 0, 0]
        }
      />
      <group
        onClick={(e) => handleMeshFocus(e, mesh1Ref)}
        receiveShadow
        castShadow
        position={position}
      >
        {/* Transparent Box */}
        <mesh
          ref={mesh1Ref}
          position={[0, +thisModelsObjDimensions.height / 2, 0]}
          visible={
            !isFocusedMode || GltfModel.userData.id === focusedModelsObj.slug
          }
        >
          <boxGeometry
            args={[
              thisModelsObjDimensions.width,
              thisModelsObjDimensions.height,
              thisModelsObjDimensions.depth,
            ]}
          />
          {/* <meshBasicMaterial color="skyblue" /> */}
          <meshBasicMaterial color="skyblue" transparent opacity={0} />
        </mesh>

        {/* Model */}
        <mesh
          ref={mesh1Ref}
          userData={{ id: modelSlug }}
          castShadow
          receiveShadow
          scale={thisModelsObj.scale}
          rotation={[
            thisModelsObj.rotationDegree.x,
            thisModelsObj.rotationDegree.y + modelRotationY,
            thisModelsObj.rotationDegree.z,
          ]}
          dispose={null}
        >
          <primitive
            object={GltfModel.scene}
            key={focusedModelsObj.slug}
            visible={
              !isFocusedMode || GltfModel.userData.id === focusedModelsObj.slug
            }
          />
        </mesh>
        <>
          {!isFocusedMode && (
            <>
              {currentView === "perspective" ? (
                <group rotation={[-Math.PI / 6, 0, 0]} position={[0, -4, -6]}>
                  <NamePlate
                    locale={locale}
                    thisModelsObj={thisModelsObj}
                    thisModelsCreatorObj={thisModelsCreatorObj}
                  />
                </group>
              ) : currentView === "horizontal" ? (
                <group rotation={[0, Math.PI / 2, 0]} position={[-8, -1, 0]}>
                  <NamePlate
                    locale={locale}
                    thisModelsObj={thisModelsObj}
                    thisModelsCreatorObj={thisModelsCreatorObj}
                  />
                </group>
              ) : (
                currentView === "vertical" && (
                  <group
                    rotation={[0, Math.PI / 2, 0]}
                    position={[-7.8, -1, 0]}
                  >
                    <NamePlate
                      locale={locale}
                      thisModelsObj={thisModelsObj}
                      thisModelsCreatorObj={thisModelsCreatorObj}
                    />
                  </group>
                )
              )}
            </>
          )}
        </>
      </group>
      {(currentView === "vertical" || currentView === "horizontal") &&
        thisModelsObj.slug === focusedModelsObj.slug &&
        isFocusedMode && <GroundForEachModel position={position} />}
    </>
  );
};

export default Model;
