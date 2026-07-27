"use client";

import { useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 90;
const MAX_CONNECTIONS = 120;
const CONNECTION_DIST = 3.8;

function Network() {
  const pointsRef = useRef<THREE.Points>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);
  const mouse = useRef({ x: 0, y: 0 });

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      positions[i3]     = (Math.random() - 0.5) * 22;
      positions[i3 + 1] = (Math.random() - 0.5) * 13;
      positions[i3 + 2] = (Math.random() - 0.5) * 6;
      velocities[i3]     = (Math.random() - 0.5) * 0.006;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.006;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.003;
    }
    return { positions, velocities };
  }, []);

  const linePositions = useMemo(
    () => new Float32Array(MAX_CONNECTIONS * 6),
    []
  );
  const lineAlphas = useMemo(
    () => new Float32Array(MAX_CONNECTIONS * 2),
    []
  );

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 22;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 13;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(() => {
    if (!pointsRef.current || !linesRef.current) return;

    const pos = pointsRef.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      pos[i3]     += velocities[i3];
      pos[i3 + 1] += velocities[i3 + 1];
      pos[i3 + 2] += velocities[i3 + 2];
      if (Math.abs(pos[i3])     > 12) velocities[i3]     *= -1;
      if (Math.abs(pos[i3 + 1]) > 7)  velocities[i3 + 1] *= -1;
      if (Math.abs(pos[i3 + 2]) > 4)  velocities[i3 + 2] *= -1;

      // Subtle mouse attraction
      const dx = mouse.current.x - pos[i3];
      const dy = mouse.current.y - pos[i3 + 1];
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < 6) {
        pos[i3]     += dx * 0.0005;
        pos[i3 + 1] += dy * 0.0005;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    let lineIdx = 0;
    for (let i = 0; i < PARTICLE_COUNT && lineIdx < MAX_CONNECTIONS; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT && lineIdx < MAX_CONNECTIONS; j++) {
        const i3 = i * 3, j3 = j * 3;
        const dx = pos[i3] - pos[j3];
        const dy = pos[i3 + 1] - pos[j3 + 1];
        const dz = pos[i3 + 2] - pos[j3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < CONNECTION_DIST) {
          const li = lineIdx * 6;
          linePositions[li]     = pos[i3];
          linePositions[li + 1] = pos[i3 + 1];
          linePositions[li + 2] = pos[i3 + 2];
          linePositions[li + 3] = pos[j3];
          linePositions[li + 4] = pos[j3 + 1];
          linePositions[li + 5] = pos[j3 + 2];
          const alpha = (1 - dist / CONNECTION_DIST) * 0.4;
          lineAlphas[lineIdx * 2]     = alpha;
          lineAlphas[lineIdx * 2 + 1] = alpha;
          lineIdx++;
        }
      }
    }

    for (let i = lineIdx * 6; i < MAX_CONNECTIONS * 6; i++) linePositions[i] = 0;
    for (let i = lineIdx * 2; i < MAX_CONNECTIONS * 2; i++) lineAlphas[i] = 0;

    linesRef.current.geometry.attributes.position.needsUpdate = true;
    linesRef.current.geometry.attributes.alpha.needsUpdate = true;
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        {/* Violet nodes over sky-blue links: two hues so the network keeps
            depth on a light ground, where a single accent goes flat. */}
        <pointsMaterial
          color="#7c3aed"
          size={0.075}
          sizeAttenuation
          transparent
          opacity={0.8}
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-alpha"
            args={[lineAlphas, 1]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#0284c7"
          transparent
          opacity={0.32}
        />
      </lineSegments>
    </>
  );
}

export default function ParticleCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 55 }}
        style={{ background: "transparent" }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <Network />
      </Canvas>
    </div>
  );
}
