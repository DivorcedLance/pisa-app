import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/firebaseConfig";

export type MultimediaContent = {
  videoLink: string;
  imageLink: string;
  description: string;
};

export type Topic = {
  id: string;
  name: string;
  index: number;
  multimediaContent: MultimediaContent;
  evaluationIds: string[];
  evaluations?: Evaluation[];
};

export type Course = {
  name: string;
  color: string;
  topics?: Topic[];
};

export async function getCourseDataByCourseName(courseName: string): Promise<Course> {
  // Obtener el curso
  const courseRef = doc(db, "Course", courseName);
  const courseSnap = await getDoc(courseRef);

  if (!courseSnap.exists()) {
    throw new Error(`Course with name "${courseName}" not found`);
  }

  const courseData = courseSnap.data();
  const { color, topicIds } = courseData;

  // Obtener los datos de los temas
  const topicPromises = topicIds.map(async (topicId: string) => {
    const topicRef = doc(db, "Topic", topicId);
    const topicSnap = await getDoc(topicRef);

    if (!topicSnap.exists()) {
      throw new Error(`Topic with ID "${topicId}" not found`);
    }

    return { id: topicId, ...topicSnap.data() } as Topic;
  });

  const topics = await Promise.all(topicPromises);

  return {
    name: courseName,
    color,
    topics,
  };
}

export type Level = {
  name: string;
  index: number;
};

export type Evaluation = {
  id: string;
  level: Level;
};

export async function getTopicDataById(topicId: string): Promise<Topic> {
  const topicRef = doc(db, "Topic", topicId);
  const topicSnap = await getDoc(topicRef);

  if (!topicSnap.exists()) {
    throw new Error(`Topic with ID "${topicId}" not found`);
  }

  const topicData = topicSnap.data();

  const evaluationPromises = topicData.evaluationIds.map(async (evaluationId: string) => {
    const evaluationRef = doc(db, "Evaluation", evaluationId);
    const evaluationSnap = await getDoc(evaluationRef);

    if (!evaluationSnap.exists()) {
      throw new Error(`Evaluation with ID "${evaluationId}" not found`);
    }

    return { id: evaluationId, ...evaluationSnap.data() } as Evaluation;
  });

  const evaluations = await Promise.all(evaluationPromises);

  return {
    id: topicId,
    ...topicData,
    evaluations,
  } as Topic;
}
