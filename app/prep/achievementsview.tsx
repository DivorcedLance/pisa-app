import { Canvas} from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import React from 'react';


type Course = {
  courseId: string;
  color: string;
  i?: number;
  d?: number;
};

type Logro = {
  achievementTypeId: string;
  courseId: string;
  description: string;
  name: string;
  totalProgress: number;
  currentProgress: number;
};

const courses: Course[] = [
  {
    courseId: "Matemáticas",
    color: "#D83131",
    i: 2,
    d: -2 * Math.sqrt(3) / 3
  },
  {
    courseId: "Ciencias",
    color: "#0077A1",
    i: 0,
    d: 4 * Math.sqrt(3) / 3
  },
  {
    courseId: "Lectura",
    color: "#BBC548",
    i: -2,
    d: -2 * Math.sqrt(3) / 3
  }
]
//platinables
const logros : Logro[] = [
  {
    achievementTypeId: "1",
    courseId: "Matemáticas",
    description: "Completa el topico Algebra para obtener este logro",
    name: "Logro de Algebra",
    totalProgress: 3,
    currentProgress: 1
  },
  {
    achievementTypeId: "2",
    courseId: "Ciencias",
    description: "Completa el topico Dinamica para obtener este logro",
    name: "Logro de Dinamica",
    totalProgress: 3,
    currentProgress: 2
  },
  {
    achievementTypeId: "3",
    courseId: "Lectura",
    description: "Completa el topico Parrafos para obtener este logro",
    name: "Logro de Parrafos",
    totalProgress: 3,
    currentProgress: 2
  },
  {
    achievementTypeId: "4",
    courseId: "Ciencias",
    description: "Completa el topico Estatica para obtener este logro",
    name: "Logro de Estatica",
    totalProgress: 3,
    currentProgress: 1
  },
  {
    achievementTypeId: "5",
    courseId: "Matemáticas",
    description: "Completa el topico Geometria para obtener este logro",
    name: "Logro de Geometria",
    totalProgress: 3,
    currentProgress: 3
  },
  {
    achievementTypeId: "6",
    courseId: "Matemáticas",
    description: "Completa el topico Aritmetica para obtener este logro",
    name: "Logro de Aritmetica",
    totalProgress: 3,
    currentProgress: 2
  },
  {
    achievementTypeId: "7",
    courseId: "Matemáticas",
    description: "Completa el topico Geometria para obtener este logro",
    name: "Logro de Geometria",
    totalProgress: 3,
    currentProgress: 3
  },
]

const tier = [
  {
    name: "Bronze",
    spriteImgLink: require('../../assets/bronce.png')
  },
  {
    name: "Gold",
    spriteImgLink: require('../../assets/oro.png')
  },
  {
    name: "Diamond",
    spriteImgLink: require('../../assets/diamante.png')
  }
]

const textureLoader1 = new THREE.TextureLoader();
const textureLoader2= new THREE.TextureLoader();
const textureLoader3 = new THREE.TextureLoader();

const textureBronce = textureLoader1.load(tier[0].spriteImgLink);
const textureOro = textureLoader2.load(tier[1].spriteImgLink);
const textureDiamante = textureLoader3.load(tier[2].spriteImgLink);
function BaseCircles({ course }: { course: Course }) {
  return (
    <>

      <StackedCubes position={[course.i ?? 0, -3.4, course.d ?? 0]} count={5} courseId={course.courseId} />
      <mesh position={[course.i ?? 0, -4, course.d ?? 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.2, 32]} />
        <meshStandardMaterial color={course.color} />
      </mesh>
    </>
  );
}

function StackedCubes({ position, count, courseId }: { position: number[]; count: number, courseId: string }) {
  const cubes: React.JSX.Element[] = [];

  

  let ctdCiencias = 0;
  let ctdMatematicas = 0;
  let ctdLectura = 0;

  let intervaloC = 0;
  let intervaloM = 0;
  let intervaloL = 0;


  if (courseId === "Ciencias") {
    logros.forEach((element, i) => {
      if (courseId === element.courseId) {
        ctdCiencias++;
      }
    });

    for (let i = 0; i < ctdCiencias; i++) {
      let list = logros.filter((element) => element.courseId === courseId);
      intervaloC = list[i].currentProgress / list[i].totalProgress;
      if (intervaloC >= 0 && intervaloC < 0.4) {
        cubes.push(
          <mesh position={[position[0], position[1] + i, position[2]]} key={i}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial map={textureBronce} />

          </mesh>
        );
      } else if (intervaloC >= 0.4 && intervaloC <= 0.8) {
        cubes.push(
          <mesh position={[position[0], position[1] + i, position[2]]} key={i}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial map={textureOro} />

          </mesh>
        );
      } else if (intervaloC>0.8 &&  intervaloC <= 1) {
        cubes.push(
          <mesh position={[position[0], position[1] + i, position[2]]} key={i}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial map={textureDiamante} />

          </mesh>
        );
      }

    }
  }
  if (courseId === "Matemáticas") {
    logros.forEach((element, i) => {
      if (courseId === element.courseId) {
        ctdMatematicas++;
      }
      intervaloM = element.currentProgress / element.totalProgress;
    });

    for (let i = 0; i < ctdMatematicas; i++) {
      let list = logros.filter((element) => element.courseId === courseId);
      intervaloM = list[i].currentProgress / list[i].totalProgress;
      if (intervaloM >= 0 && intervaloM < 0.4) {
        cubes.push(
          <mesh position={[position[0], position[1] + i, position[2]]} key={i}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial map={textureBronce} />

          </mesh>
        );
      } else if (intervaloM >= 0.4 && intervaloM <= 0.7) {
        cubes.push(
          <mesh position={[position[0], position[1] + i, position[2]]} key={i}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial map={textureOro} />

          </mesh>
        );
      } else if (intervaloM > 0.7 && intervaloM <= 1) {
        cubes.push(
          <mesh position={[position[0], position[1] + i, position[2]]} key={i}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial map={textureDiamante} />

          </mesh>
        );
      }

    }
  }
  if (courseId === "Lectura") {
    logros.forEach((element, i) => {
      if (courseId === element.courseId) {
        ctdLectura++;
      }
      intervaloL = element.currentProgress / element.totalProgress;
    });

    for (let i = 0; i < ctdLectura; i++) {
      let list = logros.filter((element) => element.courseId === courseId);
      intervaloL = list[i].currentProgress / list[i].totalProgress;
      if (intervaloL >= 0 && intervaloL < 0.4) {
        cubes.push(
          <mesh position={[position[0], position[1] + i, position[2]]} key={i}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial map={textureBronce} />

          </mesh>
        );
      } else if (intervaloL >= 0.4 && intervaloL <= 0.7) {
        cubes.push(
          <mesh position={[position[0], position[1] + i, position[2]]} key={i}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial map={textureOro} />

          </mesh>
        );
      } else if (intervaloL > 0.7 && intervaloL <= 1) {
        cubes.push(
          <mesh position={[position[0], position[1] + i, position[2]]} key={i}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial map={textureDiamante} />

          </mesh>
        );
      }

    }
  }

  return <>{cubes}</>;
}

export default function AchievementsView() {
  return (
    <Canvas
      style={{ height: '100vh', background: '#282c34' }}
    >
      <PerspectiveCamera makeDefault
        position={[0, 10, 10]}
        fov={50}
      />
      {/* Luz ambiental con mayor intensidad */}
      <ambientLight intensity={0.8} />

      {/* Luz puntual */}
      <pointLight position={[10, 10, 10]} intensity={1} />

      {/* Luz direccional */}
      <directionalLight position={[0, 5, 5]} intensity={1} />

      {courses.map((course, index) => (
        <BaseCircles key={index} course={course} />
      ))
      }

      {/* centro */}
      <mesh position={[0, -4, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.2, 32]} />
        <meshStandardMaterial color="#0077A1" />
      </mesh>

      {/* OrbitControls limitado para solo scrollear horizontalmente */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2} // Limita el movimiento vertical (abajo)
        maxPolarAngle={Math.PI / 2} // Limita el movimiento vertical (arriba)
        target={[0, 0, 0]} // Enfoca en el centro de la escena
      />
    </Canvas>
  );
}
