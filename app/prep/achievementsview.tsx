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
      // Asegurar que la posición esté definida y sea un arreglo válido
      const pos = Array.isArray(position) ? position : [0, 0, 0];
  
      // Asegurar que las dimensiones del cubo sean números positivos
      const width = 1;  // Puedes modificar esto para pasar un valor válido
      const height = 1;  // Modificar también según el caso
      const depth = 1;   // Lo mismo aquí
  
      // Verificación de que los valores son válidos
      const validWidth = width > 0 ? width : 1;
      const validHeight = height > 0 ? height : 1;
      const validDepth = depth > 0 ? depth : 1;
  
      cubes.push(
        <mesh position={[pos[0], pos[1], pos[2]]} key={i}>
          <boxGeometry args={[validWidth, validHeight, validDepth]} />
          <meshStandardMaterial color={new THREE.Color(`hsl(${(i * 40) % 360}, 100%, 50%)`)} />

        </mesh>
      );
    }
    return <>{cubes}</>;
  }
  

export default function AchievementsView() {
  return (
    <Canvas style={{ height: '100vh', background: '#282c34' }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* Bases */}
      <BaseCircles />

      {/* Cubos apilados encima de cada base */}
      <StackedCubes position={[-3, 0.5, 0]} count={5} />
      <StackedCubes position={[0, 0.5, 0]} count={8} />
      <StackedCubes position={[3, 0.5, 0]} count={3} />

      {/* Permite rotar la cámara */}
      <OrbitControls />
    </Canvas>
  );
}
