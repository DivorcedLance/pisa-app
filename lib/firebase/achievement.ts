import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, Timestamp, updateDoc, where } from "firebase/firestore";
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
    const achievementRef = await addDoc(collection(db, "Achievement"), achievementData);
    
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


// Función para obtener un logro por ID
export async function getAchievementById(achievementId: string) {
  console.log("Entrando a getAchievementById")
  const achievementRef = doc(db, "Achievement", achievementId);
  const achievementSnap = await getDoc(achievementRef);
  
  if (!achievementSnap.exists()) {
    throw new Error(`Achievement with ID ${achievementId} does not exist.`);
  }
  // Obtener los datos del logro con su id
  
  const achievementData = achievementSnap.data();
  const course = achievementData?.courseId
  ? (async () => {
    const courseSnap = await getDoc(doc(db, "Course", achievementData.courseId));
    const courseData = courseSnap.data();
    return {
      name: courseData?.name || "Course Name",
      color: courseData?.color || "Course Color",
    };
  })()
  : null;
  
  const topic = achievementData?.topicId
  ? (async () => {
    const topicSnap = await getDoc(doc(db, "Topic", achievementData.topicId));
    const topicData = topicSnap.data();
    return {
      id: achievementData.topicId,
      name: topicData?.name || "Topic Name",
      index: topicData?.index ?? 0,
    };
  })()
  : null;
  
  return {
    id: achievementId,
    description: achievementData?.description,
    name: achievementData?.name,
    achievementTypeId: achievementData?.achievementTypeId,
    totalProgress: achievementData?.totalProgress,
    courseId: achievementData?.courseId,
    topicId: achievementData?.topicId,
    course: course,
    topic: topic,
  };
}

export async function getAchievementByTopicId(topicId:string) {
  console.log("Entrando a getAchievementByTopicId")
  const achievementRef = collection(db, "Achievement");
  const q = query(
    achievementRef,
    where("topicId", "==", topicId)
  );
  const querySnap = await getDocs(q);

  if (querySnap.empty) {
    return null;
  }

  const docSnap = querySnap.docs[0];
  const course = docSnap.data()?.courseId
  ? (async () => {
    const courseSnap = await getDoc(doc(db, "Course", docSnap.data().courseId));
    const courseData = courseSnap.data();
    return {
      name: courseData?.name || "Course Name",
      color: courseData?.color || "Course Color",
    };
  })()
  : null;
  
  const topic = docSnap.data()?.topicId
  ? (async () => {
    const topicSnap = await getDoc(doc(db, "Topic", docSnap.data().topicId));
    const topicData = topicSnap.data();
    return {
      id: docSnap.data().topicId,
      name: topicData?.name || "Topic Name",
      index: topicData?.index ?? 0,
    };
  })()
  : null;

  return { 
    id: docSnap.id,
    description: docSnap.data().description,
    name: docSnap.data().name,
    achievementTypeId: docSnap.data().achievementTypeId,
    totalProgress: docSnap.data().totalProgress,
    courseId: docSnap.data().courseId,
    topicId: docSnap.data().topicId,
    course: course,
    topic: topic,
  };
  
}

// ----------------------------------------------


// Función para obtener el logro del estudiante
export async function getStudentAchievementByStudentIdAndAchievementId(studentId: string, achievementId: string) {
  console.log("Entrando a getStudentAchievementByStudentIdAndAchievementId")
  const studentAchievementRef = collection(db, "StudentAchievement");
  const q = query(
    studentAchievementRef,
    where("studentId", "==", studentId),
    where("achievementId", "==", achievementId)
  );
  const querySnap = await getDocs(q);

  if (querySnap.empty) {
    return null;
  }

  const docSnap = querySnap.docs[0];

  return { 
    id: docSnap.id,
    studentId: docSnap.data().studentId,
    achievementId: docSnap.data().achievementId,
    date: docSnap.data().date,
    currentProgress: docSnap.data().currentProgress,
    tierId: docSnap.data().tierId,
  };

}


// Función para actualizar o crear el logro del estudiante
export async function updateStudentAchievement({
  studentId,
  achievementId,
  date,
  currentProgress,
  tierId,
}: {
  studentId: string;
  achievementId: string;
  date: string;
  currentProgress: number;
  tierId: string;
}) {
  // Validar que el logro exista
  console.log("Entrando a updateStudentAchievement")
  const achievement = await getAchievementById(achievementId);


  // Obtener el estado actual del logro del estudiante
  const studentAchievement = await getStudentAchievementByStudentIdAndAchievementId(studentId, achievementId);

  console.log("Student Achievement:", studentAchievement)

  const dateTimestamp = Timestamp.fromDate(new Date(date));

  const newStudentAchievement = {
    studentId,
    achievementId,
    date: dateTimestamp,
    currentProgress,
    tierId,
  };

  // Crear o actualizar el logro del estudiante
  let id = ''
  if (studentAchievement) {
    const studentAchievementRef = doc(db, "StudentAchievement", studentAchievement.id);
    await updateDoc(studentAchievementRef, newStudentAchievement);
    id = studentAchievement.id
  } else {
    const docRef = await addDoc(collection(db, "StudentAchievement"), newStudentAchievement);
    id = docRef.id
  }

  // Devolver los datos completos del logro
  return {
    id: id,
    date: dateTimestamp,
    currentProgress,
    tierId,
    achievement: {
      id: achievement.id,
      description: achievement.description,
      achievementTypeId: achievement.achievementTypeId,
      totalProgress: achievement.totalProgress,
      course: achievement.course,
      topic: achievement.topic,
    },
    totalProgress: achievement.totalProgress,
  };
}

export async function getTierByWeightedScore(newWeightedScore : number) { //aqui entra el score_decimal / 3
  //ejm
  // (1 + 0 + 0) / 3 = 0.33
  // (0.5 + 0.6 + 0) / 3 = 0.37
  // (1 + 1 + 0) / 3 = 0.67
  // (1 + 1 + 1) / 3 = 1.0
  //obtener TODOS los registros de Tier
  console.log("Entrando a getTierByWeightedScore")
  const tierRef = collection(db, "Tier");
  const tierSnap = await getDocs(tierRef);
  const tiers = tierSnap.docs.map((doc) => (
    { id: doc.id,
      name: doc.data().name,
      spriteImgLink: doc.data().spriteImgLink,
    }));

  let tier :{
    id: string;
    name: string;
    spriteImgLink: string;
  } = {
    id: "",
    name: "",
    spriteImgLink: "",
  };

  if (newWeightedScore < 0.33) {
    tier = {
      id: "0",
      name: "Ninguno",
      spriteImgLink: "https://example.com/default.png", // Cambia esto por la URL de la imagen por defecto
    }
  } else if (newWeightedScore >= 0.33 && newWeightedScore < 0.5) {
    tier = tiers.find((t) => t.name === "Bronce") as {
      id: string;
      name: string;
      spriteImgLink: string;
    }
  } else if (newWeightedScore >= 0.5 && newWeightedScore < 0.67) {
    tier = tiers.find((t) => t.name === "Plata") as {
      id: string;
      name: string;
      spriteImgLink: string;
    }
  } else if (newWeightedScore >= 0.67 && newWeightedScore < 0.85) {
    tier = tiers.find((t) => t.name === "Oro") as {
      id: string;
      name: string;
      spriteImgLink: string;
    }
  } else if (newWeightedScore >= 0.85 && newWeightedScore < 1) {
    tier = tiers.find((t) => t.name === "Diamante") as {
      id: string;
      name: string;
      spriteImgLink: string;
    }
  } else if (newWeightedScore >= 1) {
    tier = tiers.find((t) => t.name === "Obsidiana") as {
      id: string;
      name: string;
      spriteImgLink: string;
    }
  }
  

  return tier;


}

export async function getStudentAchievementByStudentId(studentId: string) {
  console.log("Entrando a getStudentAchievementByStudentId");

  const studentAchievementRef = collection(db, "StudentAchievement");
  const q = query(studentAchievementRef, where("studentId", "==", studentId));
  const querySnap = await getDocs(q);

  if (querySnap.empty) {
    return [];
  }

  const achievements = await Promise.all(querySnap.docs.map(async (docSnap) => {
    const data = docSnap.data();
    // Obtener el logro asociado
    const achievementRef = doc(db, "Achievement", data.achievementId);
    const achievementSnap = await getDoc(achievementRef);

    // Obtener el tier asociado
    const tierRef = doc(db, "Tier", data.tierId);
    const tierSnap = await getDoc(tierRef);

    if (!tierSnap.exists()) {
      throw new Error(`Tier with ID ${data.tierId} does not exist.`);
    }
    if (!achievementSnap.exists()) {
      throw new Error(`Achievement with ID ${data.achievementId} does not exist.`);
    }
    const achievementData = achievementSnap.data();

    const tierData = tierSnap.data();

    // Formatear la fecha
    const dateObj = data.date.toDate();
    const formattedDate = `${dateObj.getDate().toString().padStart(2, '0')}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.getFullYear()}`;

    return {
      id: docSnap.id,
      studentId: data.studentId,
      achievementId: data.achievementId,
      date: formattedDate,
      currentProgress: data.currentProgress,
      tierId: data.tierId,
      tierName: tierData.name,
      spriteImgLink: tierData.spriteImgLink,
      courseId: achievementData.courseId,
      description: achievementData.description,
      name: achievementData.name,
    };
  }));

  console.log("Achievements:", achievements);
  return achievements;
}