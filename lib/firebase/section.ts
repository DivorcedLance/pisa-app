import { addDoc, collection, doc, getDoc, getDocs, query, Timestamp, updateDoc, where } from "firebase/firestore";
import { db } from "@/lib/firebase/firebaseConfig";
import { Section } from "@/types/section";

export async function getSectionStudents(sectionId: string) {
  const sectionRef = doc(db, "Section", sectionId);
  const sectionSnap = await getDoc(sectionRef);

  if (!sectionSnap.exists()) {
    throw new Error("Sección no encontrada");
  }

  const studentIds = sectionSnap.data().studentIds || [];

  // Obtener datos completos de los estudiantes
  const studentPromises = studentIds.map((id: string) =>
    getDoc(doc(db, "User", id)).then(snap => ({
      id: snap.id,
      ...snap.data()
    }))
  );

  return Promise.all(studentPromises);
}

export async function getSectionsByTeacherId(teacherId: string) {
  const sectionsRef = collection(db, "Section");
  const q = query(sectionsRef, where("teacherId", "==", teacherId));
  const querySnapshot = await getDocs(q);

  const sections = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  return sections as Section[];
}