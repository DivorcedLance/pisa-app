import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { uuidv4 } from "@/lib/crypto/crypto";

export interface Alumno {
  id: string;
  codigo_alumno: string;
  codigo_tutor: string;
  correo_institucional: string;
  foto: string;
  nombre_alumno: string;
  password: string;
  promedio_ponderado: number;
  puntos: number;
}

export type UserData = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  telephone: string;
  profileImgLink: string;
  documentType: string;
  documentNumber: string;
  birthDate: Date;
  type: string;
  rolData: {
    sectionId: string;
  };
}

// Función para obtener datos de la colección ALUMNO
export const fetchAlumnos = async (): Promise<Alumno[]> => {
  try {
    const alumnosCollection = collection(db, "ALUMNO");
    const snapshot = await getDocs(alumnosCollection);
    const alumnos: Alumno[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Alumno[];
    return alumnos;
  } catch (error) {
    console.error("Error obteniendo los alumnos:", error);
    throw error;
  }
};

export const fetchUsers = async (): Promise<UserData[]> => {
  type UserDataPrevDate = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    telephone: string;
    profileImgLink: string;
    documentType: string;
    documentNumber: string;
    birthDate: {
      nanoseconds: number;
      seconds: number;
    }
    type: string;
    rolData: {
      sectionId: string;
    };
  }

  try {
    const usersCollection = collection(db, "User");
    const snapshot = await getDocs(usersCollection);
    const users: UserDataPrevDate[] = snapshot.docs.map(doc => {
      return ({
      id: doc.id,
      ...doc.data(),
    })}) as UserDataPrevDate[];
    return users.map(user => ({
      ...user,
      birthDate: new Date(user.birthDate.seconds * 1000),
    })) as UserData[];
  } catch (error) {
    console.error("Error obteniendo los usuarios:", error);
    throw error;
  }
}

export async function createStudent({
  email,
  firstName,
  lastName,
  telephone,
  profileImgLink,
  documentType,
  documentNumber,
  birthDate,
}: {
  email: string;
  firstName: string;
  lastName: string;
  telephone: string;
  profileImgLink: string;
  documentType: string;
  documentNumber: string;
  birthDate: Date;
}) {

  // Generar un ID único para el estudiante
  const studentId = await uuidv4();

  const studentData = {
    email,
    firstName,
    lastName,
    telephone,
    profileImgLink,
    documentType,
    documentNumber,
    birthDate,
    type: "student",
    rolData: {
      sectionId: "", // Inicialmente vacío
    },
  };

  try {
    // Guardar en Firestore
    const userRef = doc(db, "User", studentId); // Usa el ID como identificador del documento
    await setDoc(userRef, studentData);

    return studentData; // Devuelve los datos del estudiante creado
  } catch (error) {
    console.error("Error al crear el estudiante:", error);
    throw new Error("Error al crear el estudiante.");
  }
}