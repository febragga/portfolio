"use client";
import { useRef } from "react";
import { useFrame, useThree, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import vertexShader from "@/app/components/shaders/blackHoleVertex.glsl";
import fragmentShader from "@/app/components/shaders/blackHoleFragment.glsl";

const BlackHoleMaterial = shaderMaterial(
  { u_time: 0, u_mouse: [0.5, 0.5], u_strength: 0.6 },
  vertexShader,
  fragmentShader
);
extend({ BlackHoleMaterial });

export default function BlackHole() {
  const mat = useRef();
  const mouse = useRef([0.5, 0.5]);
  const { size } = useThree();
  const aspect = size.width / size.height;

  useFrame(({ clock }) => {
    if (!mat.current) return;
    mat.current.u_time = clock.getElapsedTime();
    mat.current.u_mouse = mouse.current;
  });

  return (
    <mesh
      scale={[aspect * 2.0, 2.0, 1.0]}
      onPointerMove={(e) => {
        if (e.uv) mouse.current = [e.uv.x, 1 - e.uv.y];
      }}
    >
      <planeGeometry args={[1, 1]} />
      <blackHoleMaterial ref={mat} />
    </mesh>
  );
}
