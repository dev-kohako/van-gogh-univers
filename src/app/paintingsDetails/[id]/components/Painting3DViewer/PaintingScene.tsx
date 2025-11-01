"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import { useMemo, useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { Vector3 } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useSpring } from "@react-spring/three";
import {
  PaintingSceneProps,
  SceneSetupAndAnimationProps,
} from "@/types/paintingDetails.type";
import { FramedPainting } from "./FramedPainting";

function SceneSetupAndAnimation({
  controlsRef,
  targetPosition,
  isAnimating,
  setIsAnimating,
}: SceneSetupAndAnimationProps) {
  const { camera, scene } = useThree();

  const startPos = useMemo(() => new Vector3(3, 6, 14), []);
  const endPos = useMemo(
    () => new Vector3(targetPosition.x, targetPosition.y + 0.5, 6.5),
    [targetPosition]
  );

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;
    const handleInteraction = () => setIsAnimating(false);
    controls.addEventListener("start", handleInteraction);
    return () => controls.removeEventListener("start", handleInteraction);
  }, [controlsRef, setIsAnimating]);

  useEffect(() => {
    if (isAnimating) {
      camera.position.copy(startPos);
      scene.fog = new THREE.Fog("#0a0a10", 8, 25);
    }
  }, [isAnimating, camera, scene, startPos]);


  useEffect(() => {
    if (isAnimating) {
      camera.position.copy(startPos);
    }
  }, [isAnimating, camera, startPos]);

  useSpring({
    from: { pos: startPos.toArray() },
    to: { pos: isAnimating ? endPos.toArray() : camera.position.toArray() },
    config: { mass: 1, tension: 120, friction: 18 },
    onChange: ({ value }) => {
      camera.position.fromArray(value.pos);
      camera.lookAt(targetPosition);
    },
    onRest: () => {
      setIsAnimating(false);
    },
  });

  return null;
}

export function PaintingScene({ imageUrl, width, height }: PaintingSceneProps) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const { viewport, scene } = useThree();
  const [isAnimating, setIsAnimating] = useState(true);
  const aspectRatio = useMemo(() => width / height, [width, height]);

  const paintingTexture = useTexture(imageUrl);

  const scale = Math.min(viewport.width * 0.4, viewport.height * 0.4);
  const scaledWidth = aspectRatio >= 1 ? scale : scale * aspectRatio;
  const scaledHeight = aspectRatio >= 1 ? scale / aspectRatio : scale;

  const groupYPosition = scaledHeight * 0.5 + 0.5;
  const targetPosition = useMemo(
    () => new Vector3(0, groupYPosition, 0),
    [groupYPosition]
  );

  useEffect(() => {
    paintingTexture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = paintingTexture;
  }, [paintingTexture, scene]);

    useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const light = scene.getObjectByName("warmLight") as THREE.PointLight | null;
    if (light) light.intensity = 1.6 + Math.sin(t * 0.8) * 0.2;
  });

  return (
    <>
      <fog attach="fog" args={["#101015", 15, 40]} />
      <ambientLight intensity={0.8} />
      <hemisphereLight intensity={0.5} color="#ffffff" groundColor="#444444" />
      <spotLight
        position={[0, 10, 15]}
        angle={0.3}
        penumbra={1}
        intensity={2.5}
        castShadow
        shadow-mapSize={1024}
      />

      <group position={targetPosition}>
        <FramedPainting
          width={width}
          height={height}
          scaledWidth={scaledWidth}
          scaledHeight={scaledHeight}
          texture={paintingTexture}
        />
      </group>


        <meshStandardMaterial
          color="#1a1a1a"
          roughness={0.9}
          metalness={0.1}
        />
      

      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        minDistance={2}
        maxDistance={16}
        target={targetPosition}
        enabled={!isAnimating}
      />
      <SceneSetupAndAnimation
        controlsRef={controlsRef}
        targetPosition={targetPosition}
        isAnimating={isAnimating}
        setIsAnimating={setIsAnimating}
      />
    </>
  );
}
