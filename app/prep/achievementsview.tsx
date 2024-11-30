import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function BaseCircles() {
  return (
    <>
      {/* Tres bases circulares */}
      <mesh position={[-3, 0, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.2, 32]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.2, 32]} />
        <meshStandardMaterial color="blue" />
      </mesh>
      <mesh position={[3, 0, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.2, 32]} />
        <meshStandardMaterial color="green" />
      </mesh>
    </>
  );
}

function StackedCubes({ position, count } : { position: number[], count: number }) {
  const cubes = [];
  for (let i = 0; i < count; i++) {
    cubes.push(
      <mesh position={[position[0], position[1] + i * 1.1, position[2]]} key={i}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={new THREE.Color(`hsl(${i * 40}, 100%, 70%)`)} />

      </mesh>
    );
  }
  return <>{cubes}</>;
}

export default function AchievementsView() {
  return (
    <Canvas 
      style={{ height: '100vh', background: '#282c34' }} 
      camera={{ position: [0, 5, 10], fov: 50 }}
    >
      {/* Luz ambiental con mayor intensidad */}
      <ambientLight intensity={0.8} />

      {/* Luz puntual */}
      <pointLight position={[10, 10, 10]} intensity={1} />

      {/* Luz direccional */}
      <directionalLight position={[0, 5, 5]} intensity={1} />

      {/* Bases dispuestas equidistantemente */}
      <mesh position={[-2, 0, -2]}>
        <cylinderGeometry args={[1.5, 1.5, 0.2, 32]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh position={[2, 0, -2]}>
        <cylinderGeometry args={[1.5, 1.5, 0.2, 32]} />
        <meshStandardMaterial color="blue" />
      </mesh>
      <mesh position={[0, 0, 2]}>
        <cylinderGeometry args={[1.5, 1.5, 0.2, 32]} />
        <meshStandardMaterial color="green" />
      </mesh>

      {/* Cubos apilados encima de cada base */}
      <StackedCubes position={[-2, 0.5, -2]} count={5} />
      <StackedCubes position={[2, 0.5, -2]} count={8} />
      <StackedCubes position={[0, 0.5, 2]} count={3} />

      {/* Permite rotar la cámara */}
      <OrbitControls />
    </Canvas>
  );
}
