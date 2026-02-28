"use client";
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Float, Environment, ContactShadows, Text, Stars } from '@react-three/drei';
import * as THREE from 'three';

function CakeModel() {
    const meshRef = useRef<THREE.Group>(null!);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.005;
            meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
        }
    });

    return (
        <group ref={meshRef} dispose={null} scale={2}>
            {/* Visual representation of a cake since we don't have a GLB path yet */}
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[1, 1, 0.5, 32]} />
                <meshStandardMaterial color="#ff6b9d" roughness={0.3} />
            </mesh>
            <mesh position={[0, 0.4, 0]}>
                <cylinderGeometry args={[0.8, 0.8, 0.4, 32]} />
                <meshStandardMaterial color="#fff" roughness={0.5} />
            </mesh>
            {/* Candles */}
            {[0, 1, 2, 3, 4].map((i) => (
                <mesh key={i} position={[Math.cos(i * 1.2) * 0.5, 0.8, Math.sin(i * 1.2) * 0.5]}>
                    <boxGeometry args={[0.05, 0.3, 0.05]} />
                    <meshStandardMaterial color="#ffd700" />
                    <pointLight intensity={0.5} color="orange" position={[0, 0.2, 0]} />
                </mesh>
            ))}
        </group>
    );
}

export default function BirthdayCake() {
    const [blown, setBlown] = useState(false);

    return (
        <div className="w-full h-[500px] relative cursor-pointer" onClick={() => setBlown(true)}>
            <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} color="purple" intensity={1} />

                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <CakeModel />
                </Float>

                <ContactShadows position={[0, -1, 0]} opacity={0.4} scale={10} blur={2} far={4.5} />
                <Environment preset="city" />

                {blown && (
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                )}
            </Canvas>

            {blown && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <h2 className="text-4xl font-black text-pink-400 animate-bounce drop-shadow-glow">
                        MAKE A WISH! 🎂✨
                    </h2>
                </div>
            )}
        </div>
    );
}
