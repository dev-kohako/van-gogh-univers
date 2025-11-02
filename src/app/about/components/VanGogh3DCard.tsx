"use client";

import { motion } from "framer-motion";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, useGLTF, Loader } from "@react-three/drei";
import { BackSide, Mesh, RepeatWrapping, TextureLoader } from "three";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Suspense, useMemo, useState, memo } from "react";
import VanGoghDetails from "./VanGoghDetails";
import { RotationMenuItems } from "./RotationMenuItems";
import { Badge } from "@/components/ui/badge";

const VanGoghModel = memo(function VanGoghModel() {
  const { scene } = useGLTF("/models/victorian+gentleman+3d+model.glb");

  const memoizedScene = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if (child instanceof Mesh) child.castShadow = true;
    });
    return clone;
  }, [scene]);

  return (
    <primitive
      object={memoizedScene}
      scale={3.5}
      position={[0, -0.2, 0]}
      rotation={[0, Math.PI * 1.5, 0]}
    />
  );
});

const StarrySkySphere = memo(function StarrySkySphere() {
  const texture = useLoader(
    TextureLoader,
    "/textures/noite-estrelada-texture.jpg"
  );
  return (
    <mesh>
      <sphereGeometry args={[50, 64, 64]} />
      <meshBasicMaterial map={texture} side={BackSide} />
    </mesh>
  );
});

const RoundedBase = memo(function RoundedBase() {
  const texture = useLoader(
    TextureLoader,
    "/textures/brick_villa_floor_diff_1k.jpg"
  );
  texture.wrapS = texture.wrapT = RepeatWrapping;
  texture.repeat.set(1, 1);

  return (
    <mesh rotation={[-Math.PI, 0, 0]} position={[0, -2, 0]} receiveShadow>
      <cylinderGeometry args={[1.2, 1.2, 0.1, 64]} />
      <meshStandardMaterial map={texture} roughness={0.5} metalness={0.3} />
    </mesh>
  );
});

export function VanGogh3DCard() {
  const [autoRotate, setAutoRotate] = useState(true);
  const [velocity, setVelocity] = useState(0.5);

  return (
    <motion.section
      className="w-full max-w-7xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      aria-label="Seção 3D de Van Gogh"
    >
      <Card
        className="bg-background/60 backdrop-blur-md !py-0 border-border overflow-hidden shadow-xl rounded-2xl"
        role="region"
        aria-labelledby="vangogh-card-title"
      >
        <CardContent className="!p-0 flex flex-col lg:flex-row">
          <div
            className="w-full lg:w-1/2 min-h-[450px] h-[60vh] lg:h-auto relative border-r border-border"
            aria-label="Visualização tridimensional interativa"
          >
            <Loader />

            <div className="absolute top-2 left-2 z-50 flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className="pt-1 text-zinc-50 border-zinc-300/80"
                aria-live="polite"
                aria-label={`Rotação automática ${
                  autoRotate ? "ativada" : "desativada"
                }`}
              >
                Rotação automática: {autoRotate ? "Ativada" : "Desativada"}
              </Badge>
              <Badge
                variant="outline"
                className="pt-1 text-zinc-50 border-zinc-300/80"
                aria-live="polite"
                aria-label={`Velocidade atual de rotação: ${velocity.toFixed(
                  1
                )}`}
              >
                Velocidade: {velocity.toFixed(1)}
              </Badge>
            </div>

            <Canvas
              camera={{ position: [0, 0, 5], fov: 50 }}
              shadows
              aria-label="Cena 3D de Van Gogh"
            >
              <ambientLight intensity={0.4} />
              <directionalLight
                position={[5, 8, 5]}
                intensity={2.2}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
              />
              <pointLight
                position={[-4, 3, -3]}
                intensity={0.7}
                color="#ffd27f"
              />
              <pointLight
                position={[4, 2, 3]}
                intensity={0.7}
                color="#aaccff"
              />

              <Suspense fallback={null}>
                <VanGoghModel />
                <StarrySkySphere />
                <RoundedBase />

                <mesh
                  rotation={[-Math.PI / 2, 0, 0]}
                  position={[0, -1.8, 0]}
                  receiveShadow
                >
                  <planeGeometry args={[1, 1]} />
                  <shadowMaterial opacity={0.1} />
                </mesh>
              </Suspense>

              <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 2}
                maxPolarAngle={Math.PI / 2}
                autoRotate={autoRotate}
                autoRotateSpeed={velocity}
              />
            </Canvas>

            <div className="absolute bottom-4 right-4">
              <RotationMenuItems
                autoRotate={autoRotate}
                setAutoRotate={setAutoRotate}
                velocity={velocity}
                setVelocity={setVelocity}
              />
            </div>
          </div>

          <Separator
            orientation="vertical"
            className="hidden lg:block h-auto"
          />
          <Separator className="block lg:hidden" />

          <article
            className="w-full lg:w-1/2 p-6 text-muted-foreground space-y-3 text-base leading-relaxed"
            aria-labelledby="vangogh-card-title"
          >
            <VanGoghDetails />

            <Separator className="my-4" />

            <p className="text-justify">
              Van Gogh foi um dos artistas mais influentes da história da arte
              ocidental. Sua paleta vibrante e pinceladas intensas expressavam
              emoções profundas, tornando visível a beleza e o sofrimento
              humanos.
            </p>

            <blockquote
              className="italic text-center pt-4 text-foreground"
              aria-label="Citação de Van Gogh"
            >
              “Eu sonho minha pintura e depois pinto meu sonho.”
            </blockquote>
          </article>
        </CardContent>
      </Card>
    </motion.section>
  );
}
