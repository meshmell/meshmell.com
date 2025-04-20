import { Plane } from "@react-three/drei";
import { useTheme } from "next-themes";

type GroundForEachModelType = {
  position: THREE.Vector3;
};

const GroundForEachModel = ({ position }: GroundForEachModelType) => {
  const { resolvedTheme } = useTheme();

  return (
    <Plane
      args={[150, 150, 10, 10]}
      rotation-x={-Math.PI / 2}
      position={position}
      receiveShadow
    >
      <meshStandardMaterial
        color={resolvedTheme === "light" ? "white" : "#444444"}
        roughness={0.5}
        metalness={0.5}
      />
    </Plane>
  );
};

export default GroundForEachModel;
