import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "@/lib/firebase/firebaseConfig";

export async function createAchievement({
    courseId,
    topicId,
    name,
    description,
    totalProgress,
    achievementTypeId,
  }: {
    courseId: string;
    topicId: string;
    name: string;
    description: string;
    totalProgress: number;
    achievementTypeId: string;
  }) {
    // Validación básica
    if (!name || !description || !totalProgress || !achievementTypeId) {
      throw new Error("Los campos name, description, totalProgress, y achievementTypeId son obligatorios.");
    }
  
    const achievementData = {
      courseId: courseId || null,  // Optional field
      topicId: topicId || null,    // Optional field
      name,
      description,
      totalProgress,
      achievementTypeId,
    };
  
    try {
      // Guardar el logro en Firestore
      const achievementRef = doc(db, "Achievement"); // Usa el ID generado como identificador del logro
      await setDoc(achievementRef, achievementData);

      const achievementSnap = await getDoc(achievementRef);
      if (!achievementSnap.exists()) {
        throw new Error("Error al crear el logro.");
      }
      return { id: achievementSnap.id, ...achievementSnap.data() };

    } catch (error) {
      console.error("Error al crear el logro:", error);
      throw new Error("Error al crear el logro.");
    }
  }
  