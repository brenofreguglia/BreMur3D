"use client";

import { Component, Suspense, type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Html, OrbitControls, useGLTF } from "@react-three/drei";
import { Color, Group, Mesh, type Material } from "three";

interface ProductViewerProps {
  model: string;
  color: string;
}

class ProductViewerErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

function cloneMaterials(material: Material | Material[]) {
  return Array.isArray(material) ? material.map((entry) => entry.clone()) : material.clone();
}

function applyColorToMaterial(material: Material, color: string) {
  const target = material as Material & { color?: Color };

  if (target.color) {
    target.color.set(color);
  }

  target.needsUpdate = true;
}

function LoadedModel({ model, color }: ProductViewerProps) {
  const { scene } = useGLTF(model);

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);

    clone.traverse((object) => {
      if (object instanceof Mesh) {
        object.material = cloneMaterials(object.material);
      }
    });

    return clone;
  }, [scene]);

  useEffect(() => {
    clonedScene.traverse((object) => {
      if (object instanceof Mesh) {
        const materials = Array.isArray(object.material) ? object.material : [object.material];

        materials.forEach((material) => applyColorToMaterial(material, color));
      }
    });
  }, [clonedScene, color]);

  return <primitive object={clonedScene} dispose={null} />;
}

function FallbackModel({ color }: { color: string }) {
  const group = useRef<Group>(null);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.45;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
    }
  });

  return (
    <group ref={group}>
      <mesh castShadow receiveShadow position={[0, -0.24, 0]}>
        <cylinderGeometry args={[1.15, 1.15, 0.34, 32]} />
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.08} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.38, 0]}>
        <boxGeometry args={[1.65, 1.2, 0.9]} />
        <meshStandardMaterial color={color} roughness={0.42} metalness={0.06} />
      </mesh>
    </group>
  );
}

function ViewerLoading() {
  return (
    <Html center>
      <div className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface))]/90 px-4 py-2 text-sm text-ink-400 shadow-lg backdrop-blur-sm">
        Carregando modelo 3D...
      </div>
    </Html>
  );
}

export function ProductViewer({ model, color }: ProductViewerProps) {
  const [modelAvailable, setModelAvailable] = useState(false);

  useEffect(() => {
    let active = true;

    if (!model) {
      setModelAvailable(false);
      return;
    }

    const controller = new AbortController();

    (async () => {
      try {
        const res = await fetch(model, { method: "HEAD", signal: controller.signal });
        if (active) setModelAvailable(res.ok);
      } catch (err) {
        if (active) setModelAvailable(false);
      }
    })();

    return () => {
      active = false;
      controller.abort();
    };
  }, [model]);

  if (model && modelAvailable) {
    useGLTF.preload(model);
  }

  return (
    <div className="min-h-[420px] w-full bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.08),transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0))]">
      <Canvas
        shadows
        camera={{ position: [0, 0.65, 4.5], fov: 40 }}
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[3, 5, 4]} intensity={2.1} castShadow />
        <directionalLight position={[-3, 2, 2]} intensity={0.8} />
        <Suspense fallback={<ViewerLoading />}>
          <ProductViewerErrorBoundary fallback={<FallbackModel color={color} />}>
            <group position={[0, -0.12, 0]}>
              {model && modelAvailable ? <LoadedModel model={model} color={color} /> : <FallbackModel color={color} />}
            </group>
          </ProductViewerErrorBoundary>
        </Suspense>
        <ContactShadows opacity={0.32} scale={10} blur={2.4} far={4.5} />
        <Environment preset="city" />
        <OrbitControls enablePan={false} minDistance={3} maxDistance={7} maxPolarAngle={Math.PI / 1.8} />
      </Canvas>
      <div className="pointer-events-none -mt-11 flex justify-center px-4 pb-4">
        <span className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface))]/85 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-ink-400 backdrop-blur-sm">
          Arraste para girar
        </span>
      </div>
    </div>
  );
}
