import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { uuidv4 } from "@/lib/crypto/crypto";

export type Course = {
  name: string;
  color: string;
};

export async function getCourseList(): Promise<Course[]> {
  const querySnapshot = await getDocs(collection(db, "Course"));
  return querySnapshot.docs.map((doc) => ({
    name: doc.id, // Usamos el ID del documento como el name
    ...doc.data(), // Incluimos los datos del documento
  })) as Course[];
}