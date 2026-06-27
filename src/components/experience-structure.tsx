"use client";

import { Float, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

function TimelineStructure() {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!group.current) {
      return;
    }

    group.current.rotation.y += delta * 0.18;
    group.current.rotation.x = Math.sin(Date.now() * 0.0004) * 0.08;
  });

  return (
    <group ref={group}>
      <Float speed={2.1} rotationIntensity={0.18} floatIntensity={0.42}>
        {[-1.6, -0.55, 0.55, 1.6].map((x, index) => (
          <group key={x} position={[x, 0, 0]}>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.18, 1 + index * 0.22, 0.18]} />
              <meshStandardMaterial color={index % 2 === 0 ? "#47f5b4" : "#7bdff2"} emissive="#47f5b4" emissiveIntensity={0.35} metalness={0.46} roughness={0.24} />
            </mesh>
            <mesh position={[0, 0.7 + index * 0.11, 0]}>
              <octahedronGeometry args={[0.26, 0]} />
              <meshStandardMaterial color={index % 2 === 0 ? "#f8d16c" : "#ff7b6e"} emissive={index % 2 === 0 ? "#f8d16c" : "#ff7b6e"} emissiveIntensity={1.1} metalness={0.35} roughness={0.28} />
            </mesh>
          </group>
        ))}

        <mesh rotation={[0, 0, Math.PI / 2]} position={[0, -0.12, 0]}>
          <cylinderGeometry args={[0.018, 0.018, 3.55, 18]} />
          <meshStandardMaterial color="#47f5b4" emissive="#47f5b4" emissiveIntensity={0.8} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0.7, 0]}>
          <torusGeometry args={[1.55, 0.012, 12, 120]} />
          <meshStandardMaterial color="#f8d16c" emissive="#f8d16c" emissiveIntensity={1} />
        </mesh>
        <mesh rotation={[1.2, 0, Math.PI / 3]}>
          <torusGeometry args={[1.98, 0.01, 12, 140]} />
          <meshStandardMaterial color="#ff7b6e" emissive="#ff7b6e" emissiveIntensity={0.75} />
        </mesh>
      </Float>
    </group>
  );
}

export function ExperienceStructure() {
  return (
    <div className="pointer-events-auto h-72 w-full overflow-visible sm:h-80" data-testid="experience-structure">
      <Canvas camera={{ position: [0, 0.25, 5.1], fov: 43 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.78} />
        <pointLight position={[4, 3, 4]} color="#47f5b4" intensity={18} />
        <pointLight position={[-3, -2, 4]} color="#ff7b6e" intensity={8} />
        <Stars radius={38} depth={18} count={500} factor={2.2} saturation={0.2} fade speed={0.25} />
        <TimelineStructure />
      </Canvas>
    </div>
  );
}
