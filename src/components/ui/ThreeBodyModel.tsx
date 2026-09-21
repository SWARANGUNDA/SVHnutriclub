"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

interface BodyMetrics {
  weight?: number;
  height?: number;
  bodyFat?: number;
  visceralFat?: number;
  muscleMass?: number;
  score?: number;
}

// A stylized abstract humanoid made of geometric primitives
function AbstractHumanoid({ metrics }: { metrics: BodyMetrics }) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  // Defaults
  const bodyFat = metrics.bodyFat || 20;
  const visceralFat = metrics.visceralFat || 8;
  const muscleMass = metrics.muscleMass || 40;
  const score = metrics.score || 85;

  // Visual calculations based on metrics
  // Body fat expands the torso width and thickness
  const torsoWidth = 0.7 + Math.max(0, (bodyFat - 15) * 0.015);
  // Visceral fat increases the size and intensity of the internal core
  const coreSize = 0.3 + Math.max(0, (visceralFat - 5) * 0.02);
  
  // Determine core color based on visceral fat
  const coreColor = visceralFat >= 13 ? "#ef4444" : visceralFat >= 9 ? "#f59e0b" : "#10b981";
  // Determine overall body color tint based on health score
  const bodyColor = score >= 80 ? "#ffffff" : score >= 60 ? "#f1f5f9" : "#e2e8f0";

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
    if (coreRef.current) {
      // Pulsing effect based on visceral fat/score
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      coreRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Head */}
      <mesh position={[0, 2.8, 0]} castShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshPhysicalMaterial color={bodyColor} roughness={0.2} metalness={0.1} clearcoat={1} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 2.1, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.5, 16]} />
        <meshPhysicalMaterial color={bodyColor} roughness={0.3} />
      </mesh>

      {/* Torso/Chest - Scaled by Body Fat */}
      <mesh position={[0, 1.1, 0]} castShadow scale={[torsoWidth, 1, torsoWidth * 0.8]}>
        <capsuleGeometry args={[1, 1.2, 4, 16]} />
        <meshPhysicalMaterial color={bodyColor} roughness={0.2} metalness={0.1} clearcoat={1} transparent opacity={0.6} />
      </mesh>

      {/* Inner Glowing Core - Represents Visceral Fat */}
      <mesh ref={coreRef} position={[0, 1.2, 0]}>
        <sphereGeometry args={[coreSize, 32, 32]} />
        <MeshDistortMaterial 
          color={coreColor} 
          envMapIntensity={1} 
          clearcoat={1} 
          clearcoatRoughness={0} 
          metalness={0.8} 
          roughness={0}
          distort={0.4}
          speed={3}
          emissive={coreColor}
          emissiveIntensity={visceralFat > 10 ? 0.8 : 0.4}
        />
      </mesh>

      {/* Shoulders & Arms - Scaled slightly by muscle mass */}
      <mesh position={[-1.1 - (torsoWidth - 0.7), 1.6, 0]} rotation={[0, 0, 0.2]} castShadow scale={[1 + (muscleMass - 40) * 0.01, 1, 1 + (muscleMass - 40) * 0.01]}>
        <capsuleGeometry args={[0.25, 1.5, 4, 16]} />
        <meshPhysicalMaterial color={bodyColor} roughness={0.2} />
      </mesh>
      <mesh position={[1.1 + (torsoWidth - 0.7), 1.6, 0]} rotation={[0, 0, -0.2]} castShadow scale={[1 + (muscleMass - 40) * 0.01, 1, 1 + (muscleMass - 40) * 0.01]}>
        <capsuleGeometry args={[0.25, 1.5, 4, 16]} />
        <meshPhysicalMaterial color={bodyColor} roughness={0.2} />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.4 - (torsoWidth - 0.7)*0.5, -0.6, 0]} castShadow>
        <capsuleGeometry args={[0.3, 1.8, 4, 16]} />
        <meshPhysicalMaterial color={bodyColor} roughness={0.2} />
      </mesh>
      <mesh position={[0.4 + (torsoWidth - 0.7)*0.5, -0.6, 0]} castShadow>
        <capsuleGeometry args={[0.3, 1.8, 4, 16]} />
        <meshPhysicalMaterial color={bodyColor} roughness={0.2} />
      </mesh>

      {/* Orbiting data rings */}
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[1.8 + torsoWidth, 0.02, 16, 100]} />
        <meshBasicMaterial color={coreColor} transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[-Math.PI / 3, -Math.PI / 4, 0]}>
        <torusGeometry args={[2.0 + torsoWidth, 0.01, 16, 100]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

export function ThreeBodyModel({ metrics, score }: { metrics?: BodyMetrics, score?: number }) {
  // Use client-side only mounting to avoid hydration mismatch with Canvas
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const safeMetrics = metrics || { score: score || 85 };

  return (
    <div className="h-[400px] w-full cursor-grab active:cursor-grabbing relative overflow-hidden rounded-3xl bg-gradient-to-br from-background to-muted shadow-inner border border-white/5">
      <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-background/50 backdrop-blur-md text-[10px] font-semibold text-muted-foreground border border-border flex flex-col gap-1 uppercase tracking-wider">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          AI Body Map
        </div>
        <div className="text-[9px] opacity-70">
          Visceral Fat: {safeMetrics.visceralFat || 8} | Body Fat: {safeMetrics.bodyFat || 20}%
        </div>
      </div>
      
      {mounted && (
        <Canvas camera={{ position: [0, 1, 7], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          
          <OrbitControls 
            enablePan={false} 
            enableZoom={true}
            minDistance={4}
            maxDistance={10}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.5}
          />

          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
            <AbstractHumanoid metrics={safeMetrics} />
          </Float>

          <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={10} blur={2.5} far={4} />
          <Environment preset="city" />
        </Canvas>
      )}
    </div>
  );
}
