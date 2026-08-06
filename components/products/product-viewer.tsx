"use client";

import { Component, Suspense, type ReactNode, useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Html, OrbitControls, useGLTF } from "@react-three/drei";
import { Color, Group, Mesh, type Material, Euler, Box3, Vector3, BufferGeometry, Float32BufferAttribute } from "three";
import { motion } from "framer-motion";

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

function LoadedModel({ model, color, printMode }: ProductViewerProps & { printMode?: boolean }) {
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

  const currentColor = useRef(new Color(color));
  const targetColor = useRef(new Color(color));

  useEffect(() => {
    targetColor.current.set(color);
  }, [color]);

  useFrame(() => {
    // smooth interpolation of color
    currentColor.current.lerp(targetColor.current, 0.12);

    clonedScene.traverse((object) => {
      if (object instanceof Mesh) {
        const materials = Array.isArray(object.material) ? object.material : [object.material];

        materials.forEach((material) => {
          const m = material as Material & { color?: Color; wireframe?: boolean; roughness?: number };
          if (m.color) {
            m.color.copy(currentColor.current as Color);
            m.needsUpdate = true;
          }

          if (printMode) {
            m.wireframe = false;
            m.roughness = Math.min(1, (m.roughness ?? 0.5) + 0.4);
          } else {
            m.roughness = Math.max(0, (m.roughness ?? 0.5) - 0.02);
          }
        });
      }
    });
  });

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

function DimensionsOverlay({ targetRef }: { targetRef: RefObject<Group | null> }) {
  const [positions, setPositions] = useState<number[] | null>(null);
  const [labels, setLabels] = useState<Array<{ pos: [number, number, number]; text: string }>>([]);

  const geometryRef = useRef<BufferGeometry | null>(null);

  useEffect(() => {
    const t = targetRef.current;
    if (!t) return;

    const box = new Box3().setFromObject(t);
    const size = new Vector3();
    box.getSize(size);
    const min = box.min;
    const max = box.max;

    // Create three measurement lines: width (X), height (Y), depth (Z)
    const p: number[] = [];

    // Width: from (min.x, min.y, min.z) to (max.x, min.y, min.z)
    p.push(min.x, min.y, min.z);
    p.push(max.x, min.y, min.z);

    // Height: from (min.x, min.y, min.z) to (min.x, max.y, min.z)
    p.push(min.x, min.y, min.z);
    p.push(min.x, max.y, min.z);

    // Depth: from (max.x, min.y, min.z) to (max.x, min.y, max.z)
    p.push(max.x, min.y, min.z);
    p.push(max.x, min.y, max.z);

    setPositions(() => p);

    const mmX = Math.round(size.x * 1000); // approximate mm
    const mmY = Math.round(size.y * 1000);
    const mmZ = Math.round(size.z * 1000);

    setLabels([
      { pos: [(min.x + max.x) / 2, min.y, min.z], text: `${mmX} mm` },
      { pos: [min.x, (min.y + max.y) / 2, min.z], text: `${mmY} mm` },
      { pos: [max.x, min.y, (min.z + max.z) / 2], text: `${mmZ} mm` },
    ]);
  }, [targetRef]);

  useEffect(() => {
    if (!geometryRef.current || !positions) return;

    geometryRef.current.setAttribute("position", new Float32BufferAttribute(positions, 3));
  }, [positions]);

  if (!positions) return null;

  return (
    <>
      <line>
        <bufferGeometry ref={geometryRef as any} />
        <lineBasicMaterial color={0xffffff} linewidth={1} transparent opacity={0.9} />
      </line>
      {labels.map((l, i) => (
        <Html key={i} position={l.pos} center>
          <div className="rounded px-2 py-1 bg-black/70 text-white text-xs">{l.text}</div>
        </Html>
      ))}
    </>
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
  const [autoRotate, setAutoRotate] = useState(true);
  const [printMode, setPrintMode] = useState(false);
  const [showDimensions, setShowDimensions] = useState(false);
  const [galleryView, setGalleryView] = useState<Euler | null>(null);

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

  useEffect(() => {
    if (autoRotate) {
      const t = setTimeout(() => setAutoRotate(false), 3500);
      return () => clearTimeout(t);
    }
  }, [autoRotate]);

  if (model && modelAvailable) {
    useGLTF.preload(model);
  }

  const modelGroupRef = useRef<Group>(null);

  return (
    <div className="w-full">
      <div className="relative rounded-xl border border-[rgb(var(--border))] bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.02),transparent_45%)] p-4 shadow-xl overflow-hidden">
        <div className="rounded-md overflow-hidden bg-transparent aspect-[16/10]">
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
                <group ref={modelGroupRef} position={[0, -0.12, 0] as any}>
                  {model && modelAvailable ? (
                    <LoadedModel model={model} color={color} printMode={printMode} />
                  ) : (
                    <FallbackModel color={color} />
                  )}
                </group>
                {showDimensions && <DimensionsOverlay targetRef={modelGroupRef} />}
              </ProductViewerErrorBoundary>
            </Suspense>
            <ContactShadows opacity={0.32} scale={10} blur={2.4} far={4.5} />
            <Environment preset="city" />
            <OrbitControls enablePan={false} minDistance={3} maxDistance={7} maxPolarAngle={Math.PI / 1.8} />
          </Canvas>
        </div>

        <div className="absolute left-4 top-4 flex gap-2">
          <motion.button
            aria-label="Ver dimensões"
            onClick={() => setShowDimensions((s) => !s)}
            className={`rounded-md px-3 py-2 text-sm backdrop-blur-sm bg-white/6 border border-[rgb(var(--border))] text-ink-300 hover:bg-white/8`}
            whileTap={{ scale: 0.98 }}
          >
            {showDimensions ? "Ocultar dimensões" : "Ver Dimensões"}
          </motion.button>
          <motion.button
            aria-label="Ver impressão 3D"
            onClick={() => setPrintMode((s) => !s)}
            className={`rounded-md px-3 py-2 text-sm ${printMode ? "bg-accent-600 text-white" : "backdrop-blur-sm bg-white/6 text-ink-300"} border border-[rgb(var(--border))]`}
            whileTap={{ scale: 0.98 }}
          >
            {printMode ? "Modo Impressão" : "Ver Impressão 3D"}
          </motion.button>
        </div>

        <div className="absolute right-4 bottom-4 flex items-center gap-3">
          <div className="pointer-events-auto">
            <div className="flex gap-2">
              <button
                aria-label="Vista frontal"
                onClick={() => setGalleryView(new Euler(0, 0, 0))}
                className="rounded-md border px-3 py-2 text-sm bg-white/4 hover:bg-white/6"
              >
                Frontal
              </button>
              <button
                aria-label="Vista lateral"
                onClick={() => setGalleryView(new Euler(0, Math.PI / 2, 0))}
                className="rounded-md border px-3 py-2 text-sm bg-white/4 hover:bg-white/6"
              >
                Lateral
              </button>
              <button
                aria-label="Vista traseira"
                onClick={() => setGalleryView(new Euler(0, Math.PI, 0))}
                className="rounded-md border px-3 py-2 text-sm bg-white/4 hover:bg-white/6"
              >
                Traseira
              </button>
              <button
                aria-label="Vista superior"
                onClick={() => setGalleryView(new Euler(-Math.PI / 2, 0, 0))}
                className="rounded-md border px-3 py-2 text-sm bg-white/4 hover:bg-white/6"
              >
                Superior
              </button>
            </div>
          </div>
        </div>

        <div className="absolute right-4 top-4 text-xs text-ink-400">
          <span className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface))]/85 px-3 py-1 uppercase tracking-[0.14em]">Arraste para girar</span>
        </div>
      </div>
    </div>
  );
}
