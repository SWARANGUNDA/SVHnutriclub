"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, PresentationControls, Float } from "@react-three/drei";
import * as THREE from "three";

// Stylized procedural Canister model as a fallback when no .glb is available
function ProceduralCanister({ color = "#10b981", name = "Formula 1" }) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <group ref={meshRef} position={[0, -1, 0]}>
      {/* Main Body */}
      <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.8, 0.8, 2.4, 64]} />
        <meshPhysicalMaterial 
          color="#ffffff" 
          roughness={0.1}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Label Area (Colored Band) */}
      <mesh position={[0, 1.2, 0]} receiveShadow>
        <cylinderGeometry args={[0.81, 0.81, 1.6, 64]} />
        <meshPhysicalMaterial 
          color={color} 
          roughness={0.4}
          metalness={0.2}
          clearcoat={0.5}
        />
      </mesh>

      {/* Top Cap */}
      <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.82, 0.82, 0.3, 64]} />
        <meshPhysicalMaterial 
          color="#111111" 
          roughness={0.5}
          metalness={0.8}
        />
      </mesh>
      
      {/* Cap Ridges (Decorative) */}
      <mesh position={[0, 2.5, 0]}>
        <cylinderGeometry args={[0.83, 0.83, 0.25, 32]} />
        <meshStandardMaterial color="#222222" wireframe />
      </mesh>

      {/* Bottom Rim */}
      <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.82, 0.75, 0.2, 64]} />
        <meshPhysicalMaterial 
          color="#eeeeee" 
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
}

interface ThreeProductViewerProps {
  modelUrl?: string;
  fallbackColor?: string;
  name?: string;
}

export function ThreeProductViewer({ modelUrl, fallbackColor, name }: ThreeProductViewerProps) {
  return (
    <div className="h-full w-full min-h-[400px] cursor-grab active:cursor-grabbing relative bg-gradient-to-br from-background via-muted/30 to-muted/50 rounded-3xl overflow-hidden shadow-inner">
      <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-background/50 backdrop-blur-md text-xs font-semibold text-muted-foreground border border-border flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        Interactive 3D Viewer
      </div>
      
      <Canvas shadows camera={{ position: [0, 0, 6], fov: 45 }}>
        <color attach="background" args={["transparent"]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <PresentationControls 
          global 
          config={{ mass: 2, tension: 500 }} 
          snap={{ mass: 4, tension: 1500 }} 
          rotation={[0, 0.3, 0]} 
          polar={[-Math.PI / 3, Math.PI / 3]} 
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        >
          <Float speed={2} rotationIntensity={0.2} floatIntensity={1} floatingRange={[-0.1, 0.1]}>
            <ProceduralCanister color={fallbackColor} name={name} />
          </Float>
        </PresentationControls>

        <ContactShadows position={[0, -1.4, 0]} opacity={0.4} scale={10} blur={2} far={4} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
