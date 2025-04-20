import { useThree } from "@react-three/fiber";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Mesh,
  Object3DEventMap,
  BufferGeometry,
  NormalBufferAttributes,
  Material,
} from "three";

import { setCameraToOriginalPosition } from "@/src//utils/setCameraToOriginalPosition";
import CameraControllerHorizontal from "@/src/components/Three/CameraController/CameraControllerHorizontal";
import CameraControllerPerspective from "@/src/components/Three/CameraController/CameraControllerPerspective";
import CameraControllerVertical from "@/src/components/Three/CameraController/CameraControllerVertical";
import DirectionalDirectionalLightForScene from "@/src/components/Three/DirectionalLightForScene";
import GroundWide from "@/src/components/Three/GroundWide";
import Model from "@/src/components/Three/Model/Model";
import NoResultPlate from "@/src/components/Three/NoResultPlate";
import { CameraStatusType } from "@/src/types/camera";
import { CategoryDetailsType } from "@/src/types/categories";
import { CreatorDetailsType } from "@/src/types/creators";
import { LightAndDarkThemeType } from "@/src/types/lightAndDarkTheme";
import { LocaleKeyType } from "@/src/types/locale";
import { ModalOpenType } from "@/src/types/modals";
import { ModelDetailsType } from "@/src/types/models";
import { viewTypes, EachViewObjType, WindowType } from "@/src/types/views";
import { focusOnMesh } from "@/src/utils/focusOnMesh";
import { getFilteredModels } from "@/src/utils/getFilteredModels";
import { resetCameraPosition } from "@/src/utils/resetCameraPosition";
import { views } from "@/src/utils/views";

type SceneType = {
  locale: LocaleKeyType;
  modalOpen: ModalOpenType;
  footerOpen: boolean;
  focusedModelsObj: ModelDetailsType;
  filteredCreatorsObj: CreatorDetailsType;
  filteredCategoriesObj: CategoryDetailsType;
  lightAndDarkTheme: LightAndDarkThemeType;
  searchWord: string;
  hoverOnModal: boolean;
  currentView: viewTypes;
  windowType: WindowType;
  isWireFrame: boolean;
  action: string;
  setAction: Dispatch<SetStateAction<string>>;
  currentPage: number;
  models: ModelDetailsType[];
  creators: CreatorDetailsType[];
  isFocusedMode: boolean;
};

const Scene = ({
  footerOpen,
  modalOpen,
  locale,
  focusedModelsObj,
  filteredCreatorsObj,
  filteredCategoriesObj,
  lightAndDarkTheme,
  searchWord,
  hoverOnModal,
  currentView,
  windowType,
  isWireFrame,
  action,
  setAction,
  currentPage,
  models,
  creators,
  isFocusedMode,
}: SceneType) => {
  const searchParams = useSearchParams();

  function getPaginateModels(
    models: ModelDetailsType[],
    modelsPerPage: number,
  ) {
    const pages = [];
    for (let i = 0; i < models.length; i += modelsPerPage) {
      const page = models.slice(i, i + modelsPerPage);
      pages.push(page);
    }

    return pages;
  }

  function getCurrentPageObjectCount(
    models: ModelDetailsType[],
    modelsPerPage: number,
    currentPage: number,
  ) {
    const totalModels = models.length;
    const totalFullPages = Math.floor(totalModels / modelsPerPage);
    const totalModelsOnLastPage = totalModels % modelsPerPage;

    if (currentPage > totalFullPages + 1) {
      return 0;
    }

    return currentPage <= totalFullPages
      ? modelsPerPage
      : totalModelsOnLastPage;
  }

  const numOfModel = process.env.NEXT_PUBLIC_NUM_OF_MODEL_BY_PAGE || "5";
  const modelsPerPage = parseInt(numOfModel);
  const newParams = new URLSearchParams(searchParams.toString());
  const currentViewObj: EachViewObjType =
    views.find((view) => view.slug === currentView) || views[0];
  const cameraStatus =
    currentViewObj.windowWidths[windowType].cameraStatusForList;
  const router = useRouter();
  const { scene, camera } = useThree();
  camera.far = 60;
  camera.updateProjectionMatrix();
  const [activeMesh, setActiveMesh] = useState<Mesh<
    BufferGeometry<NormalBufferAttributes>,
    Material | Material[],
    Object3DEventMap
  > | null>(null);
  const [savedCameraStatus, setSavedCameraStatus] =
    useState<CameraStatusType>(cameraStatus);
  const [theNumberOfFilteredModel, setTheNumberOfFilteredModel] =
    useState<number>(6);
  const [
    theNumberOfFilteredPaginatedModel,
    setTheNumberOfFilteredPaginatedModel,
  ] = useState<number>(6);
  const [filteredModels, setFilteredModels] =
    useState<ModelDetailsType[]>(models);

  const findMeshById = (id: string) => {
    let target = null;
    scene.traverse((object) => {
      if (object && object.userData.id === id) {
        target = object;
      }
    });

    return target;
  };

  const pathname = usePathname();
  const handleResetCamera = () => {
    resetCameraPosition(camera, savedCameraStatus);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  useEffect(() => {
    if (!isFocusedMode) {
      handleResetCamera();
    } else {
      const meshToFocus = findMeshById(focusedModelsObj.slug);

      if (meshToFocus) {
        const e = undefined;
        handleMeshFocus(e, { current: meshToFocus });
      }
    }
  }, [focusedModelsObj.slug, isFocusedMode]);

  useEffect(() => {
    setTheNumberOfFilteredModel(models.length);
    setCameraToOriginalPosition(camera, cameraStatus, false);
  }, [filteredModels, models]);

  useEffect(() => {
    setCameraToOriginalPosition(camera, cameraStatus, false);
  }, [currentView]);

  useEffect(() => {
    const filteredModelsInUseEffect = getFilteredModels(
      models,
      filteredCategoriesObj,
      filteredCreatorsObj,
      searchWord,
    );
    const paginatedModels = getPaginateModels(
      filteredModelsInUseEffect,
      modelsPerPage,
    );

    const currentPageObjectCount = getCurrentPageObjectCount(
      filteredModelsInUseEffect,
      modelsPerPage,
      currentPage,
    );
    setTheNumberOfFilteredPaginatedModel(currentPageObjectCount);

    const filteredModelsOfCurrentPage = paginatedModels[currentPage - 1] || [];
    setFilteredModels(filteredModelsOfCurrentPage);
  }, [
    filteredCategoriesObj.slug,
    filteredCreatorsObj.slug,
    searchWord,
    currentPage,
    models,
    creators,
  ]);

  const handleMeshFocus = (e: any, meshRef: React.RefObject<THREE.Mesh>) => {
    if (e) e.stopPropagation();

    if (isFocusedMode || !meshRef.current) return;
    focusOnMesh(meshRef, setActiveMesh, camera, currentView, windowType);
    setActiveMesh(meshRef.current);
    const focusedModelsSlugValue =
      meshRef && meshRef.current ? meshRef.current.userData.id : undefined;
    newParams.set("focusedModelsSlug", focusedModelsSlugValue);
    newParams.set("focusedMode", "on");
    router.push(`${pathname}?${newParams.toString()}`);
  };

  useEffect(() => {
    setSavedCameraStatus({
      position: camera.position.toArray() as [number, number, number],
      rotation: camera.rotation.toArray() as [number, number, number],
    });
  }, [currentView]);

  return (
    <>
      {currentView === "perspective" && (
        <CameraControllerPerspective
          camera={camera}
          enabled={
            !isFocusedMode &&
            !modalOpen.about &&
            !modalOpen.who &&
            !modalOpen.contact &&
            !modalOpen.language &&
            !modalOpen.search &&
            !modalOpen.terms &&
            !modalOpen.privacy &&
            !footerOpen &&
            !hoverOnModal
          }
          theNumberOfModel={theNumberOfFilteredPaginatedModel}
          setSavedCameraStatus={setSavedCameraStatus}
          windowType={windowType}
          isFocusedMode={isFocusedMode}
        />
      )}
      {currentView === "horizontal" && (
        <CameraControllerHorizontal
          camera={camera}
          enabled={
            !isFocusedMode &&
            !modalOpen.about &&
            !modalOpen.who &&
            !modalOpen.contact &&
            !modalOpen.language &&
            !modalOpen.search &&
            !modalOpen.terms &&
            !modalOpen.privacy &&
            !footerOpen &&
            !hoverOnModal
          }
          theNumberOfModel={theNumberOfFilteredPaginatedModel}
          setSavedCameraStatus={setSavedCameraStatus}
          windowType={windowType}
          focusedModelsSlug={focusedModelsObj.slug}
          isFocusedMode={isFocusedMode}
        />
      )}
      {currentView === "vertical" && (
        <CameraControllerVertical
          camera={camera}
          enabled={
            !isFocusedMode &&
            !modalOpen.about &&
            !modalOpen.who &&
            !modalOpen.contact &&
            !modalOpen.language &&
            !modalOpen.search &&
            !modalOpen.terms &&
            !modalOpen.privacy &&
            !footerOpen &&
            !hoverOnModal
          }
          theNumberOfModel={theNumberOfFilteredPaginatedModel}
          setSavedCameraStatus={setSavedCameraStatus}
          windowType={windowType}
          isFocusedMode={isFocusedMode}
        />
      )}

      {filteredModels.map((model, index) => (
        <group key={model.slug} receiveShadow castShadow>
          <Model
            handleMeshFocus={handleMeshFocus}
            index={index}
            modelSlug={model.slug}
            focusedModelsObj={focusedModelsObj}
            locale={locale}
            activeMesh={activeMesh}
            camera={camera}
            setActiveMesh={setActiveMesh}
            currentView={currentView}
            windowType={windowType}
            isWireFrame={isWireFrame}
            currentAction={action}
            setAction={setAction}
            models={models}
            creators={creators}
            isFocusedMode={isFocusedMode}
          />
        </group>
      ))}
      {theNumberOfFilteredModel === 0 && <NoResultPlate locale={locale} />}
      {currentView === "perspective" && <GroundWide />}
      <DirectionalDirectionalLightForScene
        lightAndDarkTheme={lightAndDarkTheme}
      />
    </>
  );
};

export default Scene;
