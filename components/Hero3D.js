'use client';

import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Lightformer, AdaptiveDpr } from '@react-three/drei';

/**
 * A single low-poly icosahedron with a physically based glass material.
 * Lighting/reflections come from in-scene Lightformers (no HDR download),
 * which keeps the asset weight effectively zero and the frame budget low.
 */
function Crystal() {
  const group = useRef();
  const mesh = useRef();

  useFrame((state, delta) => {
    // Gentle constant spin.
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.25;
      mesh.current.rotation.x += delta * 0.08;
    }
    // Mouse parallax — eased toward the pointer, kept subtle.
    if (group.current) {
      const { x, y } = state.pointer;
      group.current.rotation.y += (x * 0.4 - group.current.rotation.y) * 0.04;
      group.current.rotation.x += (-y * 0.3 - group.current.rotation.x) * 0.04;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.9}>
        <mesh ref={mesh} scale={1.55}>
          {/* detail=0 => 20 faces. Faceted, crystalline, cheap to render. */}
          <icosahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial
            transmission={0.92}
            thickness={1.4}
            roughness={0.08}
            ior={1.45}
            metalness={0}
            clearcoat={1}
            clearcoatRoughness={0.1}
            color="#c9b8ff"
            attenuationColor="#7c3aed"
            attenuationDistance={2.4}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function Hero3D() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ touchAction: 'pan-y' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 2]} intensity={1.1} />

        <Crystal />

        {/* Studio-style reflections without loading any external HDR file. */}
        <Environment resolution={256}>
          <Lightformer
            form="rect"
            intensity={2.2}
            position={[3, 3, 2]}
            scale={[6, 6, 1]}
            color="#a78bfa"
          />
          <Lightformer
            form="rect"
            intensity={1.4}
            position={[-4, -1, 1]}
            scale={[5, 5, 1]}
            color="#4f46e5"
          />
          <Lightformer
            form="ring"
            intensity={1.6}
            position={[0, 2, -3]}
            scale={4}
            color="#ffffff"
          />
        </Environment>

        <AdaptiveDpr pixelated />
      </Suspense>
    </Canvas>
  );
}
