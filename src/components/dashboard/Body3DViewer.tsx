"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

interface Body3DViewerProps {
  bodyFat: number;
  muscleMass: number;
  visceralFat: number;
  showVisceral: boolean;
}

// A highly stylized abstract "Hologram" representation of the body metrics.
// When a real human .glb is acquired, replace this component's contents with useGLTF('/model.glb')
function AbstractBodyHologram({ bodyFat, muscleMass, visceralFat, showVisceral }: Body3DViewerProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Calculate relative scaling based on metrics
  // Normal body fat ~ 15-20%. Higher fat = wider scale.
  const fatScale = Math.max(1, bodyFat / 15);
  // Higher muscle = wider shoulders/chest area.
  const muscleScale = Math.max(1, muscleMass / 50);
  
  // Slowly rotate the hologram for a premium feel
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1.5, 0]}>
      {/* Outer Body (Subcutaneous Fat / General Mass) */}
      <mesh position={[0, 1.5, 0]} scale={[fatScale * 0.8 + muscleScale * 0.2, 1, fatScale * 0.8]}>
        <capsuleGeometry args={[1, 2, 32, 32]} />
        <meshPhysicalMaterial
          color="#059669" // Emerald 600
          transmission={showVisceral ? 0.9 : 0.2}
          opacity={showVisceral ? 1 : 0.8}
          transparent
          roughness={0.1}
          metalness={0.5}
          thickness={2}
          ior={1.5}
          emissive="#059669"
          emissiveIntensity={showVisceral ? 0.1 : 0.4}
          wireframe={showVisceral}
        />
      </mesh>

      {/* Internal Core (Visceral Fat Representation) */}
      {showVisceral && (
        <mesh position={[0, 1.2, 0]} scale={[visceralFat / 5, visceralFat / 5, visceralFat / 5]}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial 
            color="#ef4444" // Red for visceral fat warning
            emissive="#ef4444"
            emissiveIntensity={1}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      )}

      {/* Base ring */}
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.5, 1.6, 64]} />
        <meshBasicMaterial color="#059669" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export function Body3DViewer(props: Body3DViewerProps) {
  return (
    <div className="relative h-full w-full rounded-2xl overflow-hidden bg-background">
      {/* Subtle background glow for the 3D scene */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
      
      <Canvas camera={{ position: [0, 1, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <AbstractBodyHologram {...props} />
        
        <ContactShadows position={[0, -1.5, 0]} opacity={0.5} scale={10} blur={2} far={4} />
        
        <Environment preset="city" />
        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          minDistance={3} 
          maxDistance={8}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>

      <div className="absolute bottom-4 left-4 right-4 text-center pointer-events-none">
        <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">
          Interactive Hologram Rendering
        </p>
      </div>
    </div>
  );
}
