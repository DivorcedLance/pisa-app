import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/firebaseConfig";

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
  type: "student" | "teacher";
  rolData: {
    sectionId: string;
  } | {
    sectionIds: string[];
  };
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