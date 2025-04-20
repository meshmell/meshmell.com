import { Plane } from "@react-three/drei";
import { useTheme } from "next-themes";

const GroundWide = () => {
  const { resolvedTheme } = useTheme();

  return (
    <Plane
      args={[150, 1000, 10, 10]}
      rotation-x={-Math.PI / 2}
      position={[0, -0.1, 0]}
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

export default GroundWide;
