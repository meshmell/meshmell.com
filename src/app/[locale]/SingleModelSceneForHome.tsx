"use client";

import { OrbitControls, useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";
import { MeshBasicMaterial } from "three";
import * as THREE from "three";

import DirectionalLightForScene from "@/src/components/Three/DirectionalLightForScene";
import GroundForEachModel from "@/src/components/Three/GroundForEachModel";
import { LightAndDarkThemeType } from "@/src/types/lightAndDarkTheme";
import { ModelDetailsType } from "@/src/types/models";

type Props = {
  isWireFrame: boolean;
  homeDefaultObj: ModelDetailsType;
};

const SingleModelSceneForHome = ({ isWireFrame, homeDefaultObj }: Props) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { theme } = useTheme() as { theme: LightAndDarkThemeType };
  const { camera } = useThree();
  const modelPath = "/models/home/fox_01.glb";
  const GltfModel = useGLTF(modelPath);
  const { resolvedTheme } = useTheme();
  const wireFrameMaterial = new MeshBasicMaterial({
    wireframe: true,
    color: resolvedTheme === "dark" ? "white" : "black",
  });
  const { scene } = useGLTF(modelPath);
  const originalMaterials = useRef<{ [id: number]: any }>({});
  const modelHeight = 100;

  useEffect(() => {
    // Set up camera position and target
    const distance = 5; // Distance from the model
    const angle = Math.PI / 4; // 45 degrees in radians
    camera.position.set(
      distance * Math.sin(angle), // x: right
      2, // y: up
      distance * Math.cos(angle), // z: front
    );
    camera.lookAt(0, modelHeight / 2, 0); // Look at half the model height
  }, [camera]);

  useEffect(() => {
    if (homeDefaultObj.slug !== GltfModel.userData.id) return;
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = isWireFrame
          ? wireFrameMaterial
          : originalMaterials.current[child.id];
      }
    });
  }, [isWireFrame, GltfModel.scene, wireFrameMaterial]);

  return (
    <>
      <OrbitControls camera={camera} maxDistance={50} />
      <DirectionalLightForScene lightAndDarkTheme={theme} />
      <mesh ref={meshRef} castShadow receiveShadow dispose={null}>
        <primitive object={GltfModel.scene} />
        <mesh ref={meshRef} position={[0, 0, 0]} visible={true}>
          <meshBasicMaterial color="skyblue" />
        </mesh>
        <GroundForEachModel position={new THREE.Vector3(0, 0, 0)} />
      </mesh>
    </>
  );
};

export default SingleModelSceneForHome;
