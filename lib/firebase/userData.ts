import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, Timestamp, where } from "firebase/firestore";
import { db } from "@/lib/firebase/firebaseConfig";
import { differenceInCalendarDays } from "date-fns";

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
  type: "student" | "teacher" | "admin";
  rolData: {
    sectionId: string;
  } | {
    sectionIds: string[];
  };
  lastVisit?: string;
  streak?: number;
};

export async function getUserDataByEmail(email: string): Promise<UserData | null> {
  const querySnapshot = await getDocs(collection(db, "User"));

  // Buscar el documento que coincida con el email
  const matchingDoc = querySnapshot.docs.find((doc) => doc.data().email === email);

  // Si no se encuentra, retorna null
  if (!matchingDoc) {
    return null;
  }

  // Extraer datos del usuario
  const userData = matchingDoc.data();

  // Retornar el objeto con el ID incluido
  return {
    id: matchingDoc.id, // Extraer el ID del documento
    ...userData,
    birthDate: new Date(userData.birthDate.seconds * 1000), // Convertir timestamp a Date
  } as UserData;
}

export async function getUserDataById(id: string): Promise<UserData | null> {
  const docRef = doc(db, "User", id);
  const docSnap = await getDoc(docRef);

  // Verificar si existe el documento
  if (!docSnap.exists()) {
    return null;
  }

  // Extraer datos del usuario
  const userData = docSnap.data();

  return {
    id: docRef.id,
    ...userData,
    birthDate: new Date(userData.birthDate.seconds * 1000),
  } as UserData;
}


export async function createStudent({
  email,
  firstName,
  lastName,
  telephone,
  profileImgLink,
  documentType,
  documentNumber,
  birthDate, // El birthDate es un objeto Date de JavaScript
}: {
  email: string;
  firstName: string;
  lastName: string;
  telephone: string;
  profileImgLink: string;
  documentType: string;
  documentNumber: string;
  birthDate: Date; // Asegúrate de que sea un Date de JS
}) {
  // Validación básica
  if (
    !email ||
    !firstName ||
    !lastName ||
    !telephone ||
    !documentType ||
    !documentNumber ||
    !birthDate
  ) {
    throw new Error("Todos los campos son obligatorios.");
  }

  // Convertir el birthDate (Date de JS) a un Timestamp de Firestore
  const birthDateTimestamp = Timestamp.fromDate(new Date(birthDate)); // Aquí se convierte el Date de JS a Timestamp

  const studentData = {
    email,
    firstName,
    lastName,
    telephone,
    profileImgLink,
    documentType,
    documentNumber,
    birthDate: birthDateTimestamp, // Pasa el Timestamp a Firestore
    type: "student",
    rolData: {
      sectionId: "", // Inicialmente vacío
    },
    lastVisit: "",
    streak: 0,
  };

  try {
    // Guardar en Firestore
    
    const userRef = await addDoc(collection(db, "User"), studentData); // Usa el ID como identificador del documento
    return { id: userRef.id, ...studentData };
  } catch (error) {
    console.error("Error al crear el estudiante:", error);
    throw new Error("Error al crear el estudiante.");
  }
}


export async function createTeacher({
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
  birthDate: Date; // ISO 8601 date string
}) {
  // Validación básica
  if (
    !email ||
    !firstName ||
    !lastName ||
    !telephone ||
    !documentType ||
    !documentNumber ||
    !birthDate
  ) {
    throw new Error("Todos los campos son obligatorios.");
  }

  const birthDateTimestamp = Timestamp.fromDate(new Date(birthDate));

  const teacherData = {
    email,
    firstName,
    lastName,
    telephone,
    profileImgLink,
    documentType,
    documentNumber,
    birthDate: birthDateTimestamp,
    type: "teacher",
    rolData: {
      sectionIds: [] as string[],
    },
  };

  try {
    // Guardar en Firestore
    const userRef = await addDoc(collection(db, "User"), teacherData); // Usa el ID como identificador del documento
    return { id: userRef.id, ...teacherData };
  } catch (error) {
    console.error("Error al crear el profesor:", error);
    throw new Error("Error al crear el profesor.");
  }
}


const getToday = () => new Date().toISOString().split("T")[0];

export const updateStreak = async (email: string): Promise<number> => {
  const today = getToday();
  //buscar el usuario por email en la base de datos
  const userQuery = query(collection(db, "User"), where("email", "==", email));
  const userRef = await getDocs(userQuery);
  const userSnap = userRef.docs[0];

  let newStreak = 1;

  if (userSnap.exists()) {
    const data = userSnap.data();
    const lastVisit = data.lastVisit;
    const streak = data.streak || 0;

    const diff = differenceInCalendarDays(new Date(today), new Date(lastVisit));

    if (diff === 1) {
      console.log("Streak continued.");
      newStreak = streak + 1;
    } else if (diff === 0) {
      console.log("Streak already counted today.");
      newStreak = streak;
    } else {
      console.log("Streak reset due to inactivity.");
      newStreak = 1;
    }
  }

  await setDoc(userSnap.ref, {
    lastVisit: today,
    streak: newStreak
  }, { merge: true });

  return newStreak;
};