"use client";

import { OrbitControls, useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { onValue, ref } from "firebase/database";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

import DirectionalLightForScene from "@/src/components/Three/DirectionalLightForScene";
import { LightAndDarkThemeType } from "@/src/types/lightAndDarkTheme";
import { ShareModelType, UserType } from "@/src/types/users";
import { database } from "@/src/utils/firebase/firebase.config";

type ModelPageType = {
  userId: string;
  modelId: string;
};

const SingleModelScene = ({ userId, modelId }: ModelPageType) => {
  useEffect(() => {
    const usersRef = ref(database, "share/users");

    const getModelByUserIdAndModelId = async (
      userId: string,
      modelId: string,
    ) => {
      onValue(
        usersRef,
        (snapshot) => {
          const users = snapshot.val();
          // Find the user
          const user = users.find((u: UserType) => u.user_id === userId);

          if (user) {
            // Find the model
            const model = user.models.find(
              (m: ShareModelType) => m.model_id === modelId,
            );

            if (model) {
              console.log("Model Data:", model);
            } else {
              console.log("Model not found");
            }
          } else {
            console.log("User not found");
          }
        },
        {
          onlyOnce: true, // Set to true if you only need to fetch the data once
        },
      );
    };

    getModelByUserIdAndModelId(userId, modelId);
  }, [userId, modelId]);

  const meshRef = useRef<THREE.Mesh>(null);
  const { theme } = useTheme() as { theme: LightAndDarkThemeType };
  const { camera } = useThree();
  const modelPath = `/models/users/${userId}/${modelId}/model.glb`;
  const GltfModel = useGLTF(modelPath);

  return (
    <>
      <OrbitControls camera={camera} maxDistance={50} />
      <DirectionalLightForScene lightAndDarkTheme={theme} />
      <mesh ref={meshRef} castShadow receiveShadow dispose={null}>
        <primitive object={GltfModel.scene} />
        <mesh ref={meshRef} position={[0, 0, 0]} visible={true}>
          <boxGeometry args={[10, 10, 10]} />
          <meshBasicMaterial color="skyblue" />
        </mesh>
      </mesh>
    </>
  );
};

export default SingleModelScene;
