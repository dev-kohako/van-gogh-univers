"use client";

import { useTexture, Text3D, Center } from "@react-three/drei";
import * as THREE from "three";
import {
  FrameBackProps,
  FramedPaintingProps,
  GalleryPlaqueProps,
} from "@/types/paintingDetails.type";

function FrameBack({ frameWidth, frameHeight, frameDepth }: FrameBackProps) {
  return (
    <group rotation={[0, Math.PI, 0]} position-z={-frameDepth / 2.3}>
      <mesh>
        <boxGeometry args={[frameWidth, frameHeight, 0.02]} />
        <meshStandardMaterial color="#4a3c30" roughness={0.8} />
      </mesh>
    </group>
  );
}

function GalleryPlaque({ width, height }: GalleryPlaqueProps) {
  return (
    <group>
      <Center position={[0, 0, 0]}>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.12}
          height={0.03}
          bevelEnabled
          bevelThickness={0.008}
          bevelSize={0.004}
          bevelSegments={4}
        >
          {`${width}cm x ${height}cm`}
          <meshStandardMaterial
            color="#cccccc"
            metalness={0.4}
            roughness={0.5}
          />
        </Text3D>
      </Center>
    </group>
  );
}

export function FramedPainting({
  width,
  height,
  scaledWidth,
  scaledHeight,
  texture,
}: FramedPaintingProps) {
  const [woodTexture, normalMap, roughnessMap] = useTexture([
    "/textures/fine_grained_wood_col_1k.jpg",
    "/textures/fine_grained_wood_nor_gl_1k.jpg",
    "/textures/fine_grained_wood_rough_1k.jpg",
  ]);

  [woodTexture, normalMap, roughnessMap].forEach((texture) => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  });

  const frameThickness = scaledWidth * 0.05;
  const paintingDepth = 0.05;
  const glassThickness = 0.05;
  const frameDepth = 0.25;
  const plaqueYPosition = -scaledHeight / 2 - frameThickness - 0.3;
  const plaqueScale = Math.min(scaledWidth / 3, 0.8);

  return (
    <group>
      <group castShadow>
        <mesh position={[0, 0, paintingDepth / 2 + glassThickness / 2]}>
          <boxGeometry args={[scaledWidth, scaledHeight, glassThickness]} />
          <meshPhysicalMaterial
          transmission={0.96}
          transparent
          thickness={0.15}
          roughness={0.05}
          ior={1.52}
          reflectivity={1}
          clearcoat={1}
          clearcoatRoughness={0.15}
          attenuationColor="#ffeccc"
          attenuationDistance={1.2}
          />
        </mesh>
        <mesh>
          <boxGeometry args={[scaledWidth, scaledHeight, paintingDepth]} />
          <meshStandardMaterial map={texture} side={THREE.FrontSide} />
        </mesh>
        {[
          {
            pos: [-scaledWidth / 2 - frameThickness / 2, 0],
            args: [
              frameThickness,
              scaledHeight + frameThickness * 2,
              frameDepth,
            ],
          },
          {
            pos: [scaledWidth / 2 + frameThickness / 2, 0],
            args: [
              frameThickness,
              scaledHeight + frameThickness * 2,
              frameDepth,
            ],
          },
          {
            pos: [0, scaledHeight / 2 + frameThickness / 2],
            args: [scaledWidth, frameThickness, frameDepth],
          },
          {
            pos: [0, -scaledHeight / 2 - frameThickness / 2],
            args: [scaledWidth, frameThickness, frameDepth],
          },
        ].map((frame, index) => (
          <mesh
            key={index}
            position={[frame.pos[0], frame.pos[1], paintingDepth / 2]}
          >
            <boxGeometry args={frame.args as [number, number, number]} />
            <meshStandardMaterial
              map={woodTexture}
              normalMap={normalMap}
              roughnessMap={roughnessMap}
              roughness={0.5}
              metalness={0.05}
            />
          </mesh>
        ))}
        <FrameBack
          frameWidth={scaledWidth}
          frameHeight={scaledHeight}
          frameDepth={frameDepth}
        />
      </group>
      <group position={[0, plaqueYPosition, 0]} scale={plaqueScale}>
        <GalleryPlaque width={width} height={height} />
      </group>
    </group>
  );
}
