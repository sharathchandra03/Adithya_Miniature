'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Procedural miniature rail track receding into warm fog.
 * Lightweight: no external model downloads. Brass-toned metallic rails,
 * repeating sleepers, subtle drafting particles. Pointer + gentle idle motion.
 */

function Rails() {
  const railGeo = useMemo(() => {
    // Two long thin boxes for rails
    return new THREE.BoxGeometry(0.06, 0.05, 60);
  }, []);
  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#C8962C'),
        metalness: 0.9,
        roughness: 0.28,
      }),
    [],
  );
  return (
    <group>
      <mesh geometry={railGeo} material={mat} position={[-0.35, 0.02, -20]} />
      <mesh geometry={railGeo} material={mat} position={[0.35, 0.02, -20]} />
    </group>
  );
}

function Sleepers() {
  const count = 90;
  const ref = useRef<THREE.InstancedMesh>(null);
  const geo = useMemo(() => new THREE.BoxGeometry(1.0, 0.05, 0.14), []);
  const mat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: new THREE.Color('#3A332B'), roughness: 0.9, metalness: 0.05 }),
    [],
  );

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    const mesh = ref.current;
    if (!mesh) return;
    if ((mesh as any).__init) return;
    for (let i = 0; i < count; i++) {
      dummy.position.set(0, 0, 2 - i * 0.55);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    (mesh as any).__init = true;
  });

  return <instancedMesh ref={ref} args={[geo, mat, count]} />;
}

function Ballast() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, -20]} receiveShadow>
      <planeGeometry args={[3, 60]} />
      <meshStandardMaterial color={'#221D17'} roughness={1} metalness={0} />
    </mesh>
  );
}

function Dust() {
  const ref = useRef<THREE.Points>(null);
  const { positions } = useMemo(() => {
    const n = 140;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 1] = Math.random() * 3;
      arr[i * 3 + 2] = -Math.random() * 40;
    }
    return { positions: arr };
  }, []);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.06;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={'#E7BE6A'} size={0.03} transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

function Rig() {
  const { camera, pointer } = useThree();
  useFrame(() => {
    // gentle parallax toward pointer
    const tx = pointer.x * 0.5;
    const ty = 1.15 + pointer.y * 0.18;
    camera.position.x += (tx - camera.position.x) * 0.04;
    camera.position.y += (ty - camera.position.y) * 0.04;
    camera.lookAt(0, 0.1, -12);
  });
  return null;
}

export default function TrackScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, powerPreference: 'high-performance', alpha: true }}
      camera={{ position: [0, 1.15, 3.4], fov: 42 }}
      onCreated={({ gl }) => {
        gl.setClearColor(new THREE.Color('#14110E'), 0);
      }}
    >
      <fog attach="fog" args={['#14110E', 6, 34]} />
      <ambientLight intensity={0.5} color={'#F4EFE6'} />
      <directionalLight position={[3, 6, 4]} intensity={1.6} color={'#E7BE6A'} />
      <directionalLight position={[-4, 2, -6]} intensity={0.6} color={'#C8962C'} />
      <Ballast />
      <Sleepers />
      <Rails />
      <Dust />
      <Rig />
    </Canvas>
  );
}
