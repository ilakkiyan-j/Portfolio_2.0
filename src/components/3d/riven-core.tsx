"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Torus, MeshDistortMaterial, PointMaterial } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

export function RivenCore() {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Generate random particles
  const particlesCount = 200;
  const positions = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      const radius = 2 + Math.random() * 2;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, [particlesCount]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Rotate the entire group slowly
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.2) * 0.3;
      groupRef.current.rotation.x = Math.cos(time * 0.2) * 0.3;
    }

    // Rotate individual rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.5;
      ring1Ref.current.rotation.y = time * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = time * 0.3;
      ring2Ref.current.rotation.z = time * 0.4;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = -time * 0.4;
      ring3Ref.current.rotation.z = time * 0.1;
    }

    // Rotate particles
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.1;
      particlesRef.current.rotation.z = time * 0.05;
    }
  });

  const coreColor = isDark ? "#3B82F6" : "#2563EB"; // Blue-500 or Blue-600
  const ringColor = isDark ? "#60A5FA" : "#3B82F6"; // Blue-400 or Blue-500
  const particleColor = isDark ? "#93C5FD" : "#60A5FA";

  return (
    <group ref={groupRef}>
      {/* Central Solid Energy Core */}
      <Sphere args={[0.5, 32, 32]}>
        <meshStandardMaterial 
          color={coreColor} 
          emissive={coreColor}
          emissiveIntensity={1.5}
        />
      </Sphere>

      {/* Distorted Energy Field (Volatile outer layer) */}
      <Sphere args={[0.7, 64, 64]}>
        <MeshDistortMaterial
          color={coreColor}
          emissive={coreColor}
          emissiveIntensity={0.5}
          attach="material"
          distort={0.4}
          speed={3}
          transparent
          opacity={0.3}
          wireframe={isDark}
        />
      </Sphere>

      {/* Gyroscope Rings */}
      <Torus ref={ring1Ref} args={[1.2, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color={ringColor} emissive={ringColor} emissiveIntensity={0.8} />
      </Torus>
      
      <Torus ref={ring2Ref} args={[1.5, 0.01, 16, 100]} rotation={[0, Math.PI / 3, 0]}>
        <meshStandardMaterial color={ringColor} transparent opacity={0.6} wireframe />
      </Torus>

      <Torus ref={ring3Ref} args={[1.8, 0.03, 16, 4]} rotation={[0, 0, Math.PI / 4]}>
        {/* A thicker, low-poly ring for contrast */}
        <meshStandardMaterial color={ringColor} emissive={ringColor} emissiveIntensity={0.5} transparent opacity={0.8} />
      </Torus>

      {/* Floating Data Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <PointMaterial
          transparent
          color={particleColor}
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Core light sources to illuminate the rings and particles */}
      <pointLight color={coreColor} intensity={2} distance={5} />
    </group>
  );
}
