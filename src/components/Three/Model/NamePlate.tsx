import { Text, Image as ImageThree } from "@react-three/drei";
import { useTheme } from "next-themes";
import React from "react";

import { RoundedRectangleGeometry } from "@/src/components/Three/RoundedRectangleGeometry";
import { CreatorDetailsType } from "@/src/types/creators";
import { LocaleKeyType } from "@/src/types/locale";
import { measureLetterWidths } from "@/src/utils/measureLetterWidths";

import { ModelDetailsType } from "@/src/types/models";

type NamePlateType = {
  locale: LocaleKeyType;
  thisModelsObj: ModelDetailsType;
  thisModelsCreatorObj: CreatorDetailsType;
};

const NamePlate = ({
  thisModelsObj,
  thisModelsCreatorObj,
  locale,
}: NamePlateType) => {
  const font =
    locale === "en"
      ? "/fonts/Roboto/Roboto-Bold.ttf"
      : "/fonts/Noto_Sans_JP/NotoSansJP-Bold.ttf";
  const { resolvedTheme } = useTheme();
  const fontSizeForModelName = 0.5;
  const fontSizeForModelNameForCalc = 0.6;
  const fontSizeForCreatorName = 0.3;
  const fontSizeForCreatorNameForCalc = 0.4;
  const padding = 0.2;
  const modelNameWidth =
    measureLetterWidths(
      font,
      fontSizeForModelNameForCalc,
      thisModelsObj.name,
      locale,
    ) + padding;
  const imageScale = 0.5;
  const imageWidth = 1 * imageScale;
  const creatorNameWidth = measureLetterWidths(
    font,
    fontSizeForCreatorNameForCalc,
    thisModelsCreatorObj.name,
    locale,
  );
  const sourceCreatorNameWidth = thisModelsObj.source
    ? measureLetterWidths(
        font,
        fontSizeForCreatorNameForCalc,
        { en: thisModelsObj.source.creator, ja: thisModelsObj.source.creator },
        locale,
      )
    : 0;
  const creatorNameAndImageWidth = creatorNameWidth + imageWidth + 1;
  const perspectiveModelPositionPlusZ = 10;
  const ModelNamePositionPlusY = thisModelsObj.source ? 0.5 : 0.2;
  const perspectiveModelPositionPlusY = thisModelsObj.source ? -0.025 : -0.3;
  const perspectiveModelSourceCreatorImageAndTextPositionPlusY = -0.625;
  const creatorsPath = thisModelsObj.creator
    ? thisModelsObj.creator
    : "PlaceHolder";
  const sourceCreatorPath = thisModelsObj.source
    ? thisModelsObj.source.creator
    : "PlaceHolder";
  const plateWidth =
    modelNameWidth > creatorNameAndImageWidth &&
    modelNameWidth > sourceCreatorNameWidth
      ? modelNameWidth
      : creatorNameAndImageWidth > sourceCreatorNameWidth
        ? creatorNameAndImageWidth
        : sourceCreatorNameWidth;
  // console.log(thisModelsObj.name[locale], modelNameWidth, creatorNameAndImageWidth, plateWidth);

  return (
    <>
      {/* Model Name */}
      <Text
        position={[0, ModelNamePositionPlusY, perspectiveModelPositionPlusZ]}
        color={resolvedTheme === "dark" ? "#ffffff" : "#000000"}
        fontSize={fontSizeForModelName}
        font={font}
      >
        {thisModelsObj.name[locale]}
      </Text>

      <group
        position={[
          0,
          perspectiveModelPositionPlusY,
          perspectiveModelPositionPlusZ,
        ]}
      >
        {/* Creator Image */}
        <ImageThree
          url={`${process.env.NEXT_PUBLIC_GCS_BUCKET_PUBLIC_URL ?? ""}/images/creators/${creatorsPath}/img.webp`}
          position={[-creatorNameWidth / 2, 0, 0]}
          scale={imageScale}
        />

        {/* Creator Name */}
        <Text
          position={[(imageWidth + padding) / 2, 0, 0]}
          color={resolvedTheme === "dark" ? "#575757" : "#575757"}
          fontSize={fontSizeForCreatorName}
          font={font}
        >
          {thisModelsCreatorObj.name[locale]}
        </Text>
      </group>

      {thisModelsObj.source ? (
        <group
          position={[
            0,
            perspectiveModelSourceCreatorImageAndTextPositionPlusY,
            perspectiveModelPositionPlusZ,
          ]}
        >
          {/* Source creator Image */}
          <ImageThree
            url={`${process.env.NEXT_PUBLIC_GCS_BUCKET_PUBLIC_URL ?? ""}/images/creators/${sourceCreatorPath}/img.webp`}
            position={[-creatorNameWidth / 2, 0, 0]}
            scale={imageScale}
          />

          {/* Source Creator Name */}
          <>
            <Text
              position={[(imageWidth + padding) / 2, 0, 0]}
              color={resolvedTheme === "dark" ? "#575757" : "#575757"}
              fontSize={fontSizeForCreatorName}
              font={font}
            >
              {thisModelsObj.source.creator}
            </Text>
          </>
        </group>
      ) : null}
      {/* White Plate with custom rounded corners */}
      <mesh position={[0, 0, perspectiveModelPositionPlusZ - 0.01]}>
        <RoundedRectangleGeometry
          width={plateWidth}
          height={thisModelsObj.source ? 1.8 : 1.2}
          radiusCorner={0.2}
          smoothness={5}
          color={resolvedTheme === "light" ? "#aaaaaa" : "#101010"}
        />
      </mesh>
    </>
  );
};

export default NamePlate;
