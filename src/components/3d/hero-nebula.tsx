"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

const PARTICLE_COUNT = 600;
const ORBIT_RING_COUNT = 3;

function ParticleGalaxy({ color, count }: { color: string; count: number }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, velocities, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const sz = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Spiral arm distribution
      const arm = (i % 3) * ((Math.PI * 2) / 3);
      const radius = 0.5 + Math.random() * 3.5;
      const spin = radius * 0.4;
      const angle = arm + spin + (Math.random() - 0.5) * 0.8;

      // Vertical scatter — thinner at edges
      const verticalSpread = (1 - radius / 4) * 0.6;

      pos[i3] = Math.cos(angle) * radius;
      pos[i3 + 1] = (Math.random() - 0.5) * verticalSpread;
      pos[i3 + 2] = Math.sin(angle) * radius;

      // Orbital velocity (tangential)
      vel[i3] = -Math.sin(angle) * 0.02;
      vel[i3 + 1] = (Math.random() - 0.5) * 0.005;
      vel[i3 + 2] = Math.cos(angle) * 0.02;

      sz[i] = 0.5 + Math.random() * 1.5;
    }
    return { positions: pos, velocities: vel, sizes: sz };
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const geo = ref.current.geometry;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    const t = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = posAttr.array[i3];
      const z = posAttr.array[i3 + 2];
      const angle = Math.atan2(z, x);
      const radius = Math.sqrt(x * x + z * z);

      // Orbital rotation — faster near center
      const speed = 0.08 / (radius + 0.5);
      posAttr.array[i3] = Math.cos(angle + speed) * radius;
      posAttr.array[i3 + 2] = Math.sin(angle + speed) * radius;

      // Gentle breathing
      posAttr.array[i3 + 1] += Math.sin(t * 0.3 + i * 0.01) * 0.0003;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color={color}
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function WireframeCore({ color, accentColor }: { color: string; accentColor: string }) {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (outerRef.current) {
      outerRef.current.rotation.x = t * 0.12;
      outerRef.current.rotation.y = t * 0.18;
      outerRef.current.scale.setScalar(1 + Math.sin(t * 0.6) * 0.06);
      outerRef.current.position.y = Math.sin(t * 0.8) * 0.15;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = t * 0.25;
      innerRef.current.rotation.y = t * 0.15;
      innerRef.current.rotation.z = t * 0.1;
      innerRef.current.scale.setScalar(1 - Math.sin(t * 0.6) * 0.04);
      innerRef.current.position.y = Math.sin(t * 0.8 + 0.5) * 0.1;
    }
  });

  return (
    <group>
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      <mesh ref={innerRef}>
        <dodecahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={1.5}
          transparent
          opacity={0.85}
        />
      </mesh>
    </group>
  );
}

function OrbitalRings({ color }: { color: string }) {
  const rings = useMemo(
    () =>
      Array.from({ length: ORBIT_RING_COUNT }, (_, i) => ({
        rotation: [
          (Math.PI / 6) * (i + 1),
          (Math.PI / 4) * i,
          0,
        ] as [number, number, number],
        radius: 1.8 + i * 0.4,
        speed: 0.15 + i * 0.08,
        opacity: 0.15 - i * 0.03,
      })),
    []
  );

  return (
    <group>
      {rings.map((ring, i) => (
        <OrbitalRing
          key={i}
          radius={ring.radius}
          color={color}
          rotation={ring.rotation}
          speed={ring.speed}
          opacity={ring.opacity}
        />
      ))}
    </group>
  );
}

function OrbitalRing({
  radius,
  color,
  rotation,
  speed,
  opacity,
}: {
  radius: number;
  color: string;
  rotation: [number, number, number];
  speed: number;
  opacity: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.getElapsedTime() * speed;
    }
  });

  return (
    <mesh ref={ref} rotation={rotation}>
      <torusGeometry args={[radius, 0.008, 8, 80]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1}
        transparent
        opacity={opacity}
      />
    </mesh>
  );
}

function CursorReactiveParticles({
  color,
  count,
}: {
  color: string;
  count: number;
}) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.5 + Math.random() * 2;
      pos[i3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.01) * 0.1;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color={color}
        transparent
        opacity={0.3}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function HeroNebula() {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? (systemTheme ?? "dark") : theme;
  const isDark = currentTheme === "dark";

  const coreColor = isDark ? "#3B82F6" : "#2563EB";
  const accentColor = isDark ? "#8B5CF6" : "#7C3AED";
  const galaxyColor = isDark ? "#93C5FD" : "#60A5FA";
  const glowColor = isDark ? "#60A5FA" : "#3B82F6";

  return (
    <group>
      <ambientLight intensity={0.2} />
      <pointLight color={coreColor} intensity={4} distance={10} />
      <pointLight color={accentColor} intensity={2} distance={8} position={[3, 2, 3]} />
      <pointLight color="#ec4899" intensity={1} distance={6} position={[-2, -1, 2]} />

      {/* Particle galaxy — orbital spiral arms */}
      <ParticleGalaxy color={galaxyColor} count={PARTICLE_COUNT} />

      {/* Geometric wireframe core */}
      <WireframeCore color={coreColor} accentColor={accentColor} />

      {/* Orbital torus rings around core */}
      <OrbitalRings color={glowColor} />

      {/* Outer field particles — react to scroll later */}
      <CursorReactiveParticles color={accentColor} count={150} />

      {/* Sparkle highlights near the core */}
      <Sparkles
        count={40}
        scale={3}
        size={1.5}
        speed={0.3}
        color={galaxyColor}
        opacity={0.4}
      />
    </group>
  );
}
