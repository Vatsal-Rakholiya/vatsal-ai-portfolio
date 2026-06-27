"use client";

import { Float, OrbitControls, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import type { Group, Points } from "three";
import * as THREE from "three";

function SynapseField() {
  const ref = useRef<Points>(null);
  const positions = useMemo(() => {
    const vertices = [];
    for (let i = 0; i < 420; i += 1) {
      const radius = 1.2 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      vertices.push(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );
    }
    return new Float32Array(vertices);
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.08;
      ref.current.rotation.x += delta * 0.03;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.018} color="#7bdff2" transparent opacity={0.78} />
    </points>
  );
}

function NeuralObject() {
  const group = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (!group.current) {
      return;
    }

    group.current.rotation.y += delta * (hovered ? 0.9 : 0.22);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, hovered ? 0.36 : 0.12, 0.05);
    group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, hovered ? 1.1 : 1, 0.06));
  });

  return (
    <group
      ref={group}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Float speed={2.4} rotationIntensity={0.55} floatIntensity={0.7}>
        <mesh>
          <icosahedronGeometry args={[1.35, 2]} />
          <meshStandardMaterial color="#47f5b4" emissive="#0f8f70" metalness={0.42} roughness={0.18} wireframe />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.52, 48, 48]} />
          <meshPhysicalMaterial
            color="#d9fff2"
            emissive="#47f5b4"
            emissiveIntensity={0.8}
            transmission={0.24}
            roughness={0.08}
            metalness={0.12}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2.8, 0, 0]}>
          <torusGeometry args={[1.72, 0.012, 12, 160]} />
          <meshStandardMaterial color="#f8d16c" emissive="#f8d16c" emissiveIntensity={1.3} />
        </mesh>
        <mesh rotation={[0, Math.PI / 3, Math.PI / 2.2]}>
          <torusGeometry args={[1.95, 0.01, 12, 160]} />
          <meshStandardMaterial color="#ff7b6e" emissive="#ff7b6e" emissiveIntensity={0.9} />
        </mesh>
      </Float>
      <SynapseField />
    </group>
  );
}

export function NeuralCore() {
  return (
    <div className="relative h-[420px] min-h-[360px] w-full overflow-visible md:h-[620px]" data-testid="neural-core">
      <div aria-hidden className="pointer-events-none absolute inset-[-14%] rounded-full bg-[radial-gradient(circle,rgba(71,245,180,0.08),transparent_62%)] blur-2xl" />
      <Canvas camera={{ position: [0, 0, 5.8], fov: 46 }} dpr={[1, 1.6]} gl={{ alpha: true, antialias: true }} className="neural-core-canvas">
        <ambientLight intensity={0.75} />
        <pointLight position={[4, 2, 5]} color="#47f5b4" intensity={24} />
        <pointLight position={[-4, -3, 3]} color="#ff7b6e" intensity={9} />
        <Stars radius={80} depth={42} count={1300} factor={3.4} saturation={0.2} fade speed={0.35} />
        <NeuralObject />
        <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} autoRotate autoRotateSpeed={0.45} />
      </Canvas>
    </div>
  );
}
