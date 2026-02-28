"use client";
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, PerspectiveCamera, MeshDistortMaterial, Float as FloatDrei } from '@react-three/drei';
import * as THREE from 'three';

function RotatingCrystal({ position, scale, color }: { position: [number, number, number], scale: number, color: string }) {
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        meshRef.current.rotation.x += 0.01;
        meshRef.current.rotation.y += 0.01;
        meshRef.current.position.y += Math.sin(state.clock.elapsedTime + position[0]) * 0.002;
    });

    return (
        <FloatDrei speed={2} rotationIntensity={1} floatIntensity={1}>
            <mesh ref={meshRef} position={position} scale={scale}>
                <icosahedronGeometry args={[1, 0]} />
                <MeshDistortMaterial
                    color={color}
                    speed={3}
                    distort={0.4}
                    radius={1}
                    metalness={0.9}
                    roughness={0.1}
                    emissive={color}
                    emissiveIntensity={0.5}
                    transparent
                    opacity={0.4}
                />
            </mesh>
        </FloatDrei>
    );
}

function Scene() {
    const crystals = useMemo(() => {
        const arr = [];
        const colors = ['#ff6b9d', '#c06cf3', '#ffd700', '#6bc5ff'];
        for (let i = 0; i < 40; i++) {
            const pos: [number, number, number] = [
                (Math.sin(i * 0.8) * 30),
                (Math.cos(i * 1.2) * 30),
                (Math.sin(i * 1.5) * 20)
            ];
            arr.push({ pos, scale: Math.abs(Math.sin(i)) * 0.5 + 0.3, color: colors[i % colors.length] });
        }
        return arr;
    }, []);

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 30]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={2} color="#ff6b9d" />
            <pointLight position={[-10, -10, 10]} intensity={2} color="#c06cf3" />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            {crystals.map((c, i) => (
                <RotatingCrystal key={i} position={c.pos} scale={c.scale} color={c.color} />
            ))}
        </>
    );
}

export default function ThreeBackground() {
    return (
        <div className="fixed inset-0 -z-10 bg-[#030014]">
            <Canvas shadows>
                <Scene />
            </Canvas>
        </div>
    );
}
