import { useMemo } from "react";
import * as THREE from "three";

type RoundedRectangleGeometryType = {
  width: number;
  height: number;
  radiusCorner: number;
  smoothness: number;
  color: string;
};

export const RoundedRectangleGeometry = ({
  width,
  height,
  radiusCorner,
  smoothness,
  color,
}: RoundedRectangleGeometryType) => {
  const geometry = useMemo(() => {
    const pi2 = Math.PI * 2;
    const n = (smoothness + 1) * 4; // number of segments
    const indices = [];
    const positions = [];
    const uvs = [];
    let qu, sgx, sgy, x, y;

    const contour = (j: any) => {
      qu = Math.trunc((4 * j) / n) + 1; // quadrant  qu: 1..4
      sgx = qu === 1 || qu === 4 ? 1 : -1; // signum left/right
      sgy = qu < 3 ? 1 : -1; // signum top / bottom
      x =
        sgx * (width / 2 - radiusCorner) +
        radiusCorner * Math.cos((pi2 * (j - qu + 1)) / (n - 4));
      y =
        sgy * (height / 2 - radiusCorner) +
        radiusCorner * Math.sin((pi2 * (j - qu + 1)) / (n - 4));

      positions.push(x, y, 0);
      uvs.push(0.5 + x / width, 0.5 + y / height);
    };

    for (let j = 1; j < n + 1; j++) indices.push(0, j, j + 1); // 0 is center
    indices.push(0, n, 1);
    positions.push(0, 0, 0); // rectangle center
    uvs.push(0.5, 0.5);
    for (let j = 0; j < n; j++) contour(j);

    const roundedGeometry = new THREE.BufferGeometry();
    roundedGeometry.setIndex(
      new THREE.BufferAttribute(new Uint32Array(indices), 1),
    );
    roundedGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(positions), 3),
    );
    roundedGeometry.setAttribute(
      "uv",
      new THREE.BufferAttribute(new Float32Array(uvs), 2),
    );

    return roundedGeometry;
  }, [width, height, radiusCorner, smoothness]); // Dependencies

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color={color} />
    </mesh>
  );
};
