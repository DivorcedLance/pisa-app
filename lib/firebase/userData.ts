import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { uuidv4 } from "@/lib/crypto/crypto";

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

export async function getUserDataByEmail(email: string) {
  const querySnapshot = await getDocs(collection(db, "User"));
  const userData = querySnapshot.docs.find((doc) => doc.data().email === email)?.data();
  return {
    ...userData,
    birthDate: new Date(userData!.birthDate.seconds * 1000),
  } as UserData;
}