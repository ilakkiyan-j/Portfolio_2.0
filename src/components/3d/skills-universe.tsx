"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Line, Sphere } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

const SKILLS = [
  // FRONTEND
  { name: "React.js", category: "FRONTEND", position: [3, 2, 0] },
  { name: "TypeScript", category: "FRONTEND", position: [2.5, 3, 1] },
  { name: "JavaScript", category: "FRONTEND", position: [4, 1, 0.5] },
  { name: "HTML5", category: "FRONTEND", position: [3.5, 2.5, -1] },
  { name: "CSS3", category: "FRONTEND", position: [2, 1.5, -1.5] },
  { name: "Bootstrap", category: "FRONTEND", position: [4, -0.5, 1] },
  { name: "Vite", category: "FRONTEND", position: [4.5, 1.5, -0.5] },

  // BACKEND
  { name: "FastAPI", category: "BACKEND", position: [-3, 2, 0] },
  { name: "Node.js", category: "BACKEND", position: [-2.5, 3, 1] },
  { name: "Express.js", category: "BACKEND", position: [-4, 1, 0.5] },
  { name: "REST APIs", category: "BACKEND", position: [-3.5, 2.5, -1] },
  { name: "Prisma ORM", category: "BACKEND", position: [-2, 1.5, -1.5] },

  // AI
  { name: "Ollama", category: "AI", position: [0, -3, 2] },
  { name: "RASA", category: "AI", position: [1.5, -2.5, 2.5] },
  { name: "ChromaDB", category: "AI", position: [-1.5, -3.5, 1.5] },
  { name: "Vosk", category: "AI", position: [2, -3.5, 1] },
  { name: "Coqui-TTS", category: "AI", position: [-2, -2.5, 2.5] },
  { name: "Prompt Engineering", category: "AI", position: [0, -4, 0.5] },

  // DATABASE & TOOLS
  { name: "PostgreSQL", category: "TOOLS", position: [0, 3, -2.5] },
  { name: "MySQL", category: "TOOLS", position: [1.5, 3.5, -1.5] },
  { name: "Git", category: "TOOLS", position: [-1.5, 2.5, -3] },
  { name: "GitHub", category: "TOOLS", position: [2, 2.5, -3.5] },
  { name: "Docker", category: "TOOLS", position: [-2, 3.5, -2] },
  { name: "Postman", category: "TOOLS", position: [0, 4, -1] },
  { name: "Figma", category: "TOOLS", position: [0, 2.5, -4] },
];

export function SkillsUniverse() {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  const groupRef = useRef<THREE.Group>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  const nodeColor = isDark ? "#60A5FA" : "#1D4ED8";
  const lineColor = isDark ? "rgba(96, 165, 250, 0.2)" : "rgba(37, 99, 235, 0.2)";
  const highlightColor = isDark ? "#8B5CF6" : "#7C3AED";

  return (
    <group ref={groupRef}>
      {/* Central Core */}
      <Sphere args={[0.5, 32, 32]}>
        <meshStandardMaterial 
          color={isDark ? "#3B82F6" : "#2563EB"} 
          emissive={isDark ? "#3B82F6" : "#2563EB"} 
          emissiveIntensity={0.5} 
          wireframe
        />
      </Sphere>

      {/* Skills Nodes and Connections */}
      {SKILLS.map((skill, i) => {
        const isHovered = hoveredSkill === skill.name;
        
        return (
          <group key={i}>
            {/* Line connecting to core */}
            <Line
              points={[[0, 0, 0], skill.position as [number, number, number]]}
              color={isHovered ? highlightColor : lineColor}
              lineWidth={isHovered ? 2 : 1}
              transparent
              opacity={isHovered ? 0.8 : 0.3}
            />
            
            {/* Skill Node */}
            <mesh 
              position={skill.position as [number, number, number]}
              onPointerOver={(e) => { e.stopPropagation(); setHoveredSkill(skill.name); }}
              onPointerOut={(e) => { e.stopPropagation(); setHoveredSkill(null); }}
            >
              <sphereGeometry args={[isHovered ? 0.15 : 0.1, 16, 16]} />
              <meshStandardMaterial 
                color={isHovered ? highlightColor : nodeColor} 
                emissive={isHovered ? highlightColor : nodeColor}
                emissiveIntensity={isHovered ? 1 : 0.5}
              />
              
              <Html distanceFactor={10} center className="pointer-events-none">
                <div 
                  className={`px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-all duration-300
                    ${isHovered 
                      ? "bg-primary text-primary-foreground scale-110 shadow-lg shadow-primary/20" 
                      : "bg-surface/80 text-foreground backdrop-blur-sm border border-border"
                    }
                  `}
                >
                  {skill.name}
                </div>
              </Html>
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
