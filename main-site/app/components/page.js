"use client";

import { Canvas } from "@react-three/fiber";
import BlackHole from "./3d/blackhole";

export default function Home() {
  return (
    <Canvas style={{ width: "100vw", height: "100vh" }} camera={{ position: [0, 0, 1] }}>
      <ambientLight />
      <BlackHole />
    </Canvas>
  );
}
