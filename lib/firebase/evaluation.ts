import { addDoc, collection, doc, getDoc, getDocs, query, Timestamp, updateDoc, where } from "firebase/firestore";
import { db } from "@/lib/firebase/firebaseConfig";
import { StudentTopic } from "@/types/studentTopic";
import { getAchievementByTopicId, getStudentAchievementByStudentIdAndAchievementId, getTierByWeightedScore, updateStudentAchievement } from "./achievement";

export type Evaluation = {
  id: string;
  level: {
    name: string;
    index: number;
  };
  totalScore: number;

  questions: Question[];

  currentScore?: number;
  weightedScore?: number;
  date?: Date;
};

export type Question = {
  id: string;
  statement: string;
  questionImgLink: string;
  options: string[];
  correctOptionIndex: number;
  score: number;
  solution: string;
};

export type StudentEvaluation = {
  id: string;
  studentId: string;
  evaluationId: string;

  currentScore: number;
  weightedScore: number;
  date: Date;

  selectedOptionIndexs: number[];
};

export async function getEvaluationDataById(evaluationId: string, studentId: string): Promise<Evaluation> {
  // Referencia a la evaluación
  const evaluationRef = doc(db, "Evaluation", evaluationId);
  const evaluationSnap = await getDoc(evaluationRef);

  // Verificar si existe la evaluación
  if (!evaluationSnap.exists()) {
    throw new Error(`Evaluation with ID "${evaluationId}" not found`);
  }

  // Obtener datos de la evaluación
  const evaluationData = evaluationSnap.data();

  // Obtener preguntas asociadas
  const questionPromises = evaluationData.questionIds.map(async (questionId: string) => {
    const questionRef = doc(db, "Question", questionId);
    const questionSnap = await getDoc(questionRef);

    if (!questionSnap.exists()) {
      throw new Error(`Question with ID "${questionId}" not found`);
    }

    return { id: questionId, ...questionSnap.data() } as Question;
  });

  const questions = await Promise.all(questionPromises);

  // Consultar la colección StudentEvaluation con filtros
  const studentEvaluationRef = collection(db, "StudentEvaluation");
  const studentEvaluationQuery = query(
    studentEvaluationRef,
    where("studentId", "==", studentId),
    where("evaluationId", "==", evaluationId)
  );
  const studentEvaluationSnap = await getDocs(studentEvaluationQuery);

  // Verificar si hay datos de StudentEvaluation
  if (!studentEvaluationSnap.empty) {
    // Obtener los datos del primer documento encontrado
    const studentEvaluationData = studentEvaluationSnap.docs[0].data();
    // Retornar la evaluación consolidada

    return {
      id: evaluationId,
      level: evaluationData.level,
      totalScore: evaluationData.totalScore,
      questions,
      currentScore: studentEvaluationData.currentScore,
      weightedScore: studentEvaluationData.weightedScore,
      date: studentEvaluationData.date,
    };
  }
  return {
    id: evaluationId,
    level: evaluationData.level,
    totalScore: evaluationData.totalScore,
    questions,
  };

}


export async function registerEvaluationSolution(solution: { studentId: string, evaluationId: string, currentScore: number, selectedOptionIndexs: number[], topicId: string }): Promise<HaTopicWeightedScoreParams | null> {
  const evaluation = await getEvaluationDataById(solution.evaluationId, solution.studentId);

  // Referencia a la colección StudentEvaluation
  const studentEvaluationRef = collection(db, "StudentEvaluation");

  // Consultar si el estudiante ya ha respondido la evaluación
  const studentEvaluationQuery = query(
    studentEvaluationRef,
    where("studentId", "==", solution.studentId),
    where("evaluationId", "==", solution.evaluationId)
  );
  const studentEvaluationSnap = await getDocs(studentEvaluationQuery);

  // Obtener la fecha actual
  const date = new Date();

  // Calcular el weightedScore
  const weightedScore = solution.currentScore / evaluation.totalScore;


  if (!studentEvaluationSnap.empty) {
    // Ya existe una respuesta: actualizar
    const docId = studentEvaluationSnap.docs[0].id;
    const docRef = doc(studentEvaluationRef, docId);
    await updateDoc(docRef, {
      currentScore: solution.currentScore,
      date,
      selectedOptionIndexs: solution.selectedOptionIndexs,
      weightedScore,
    });
  } else {
    // No existe: crear nueva
    await addDoc(studentEvaluationRef, {
      studentId: solution.studentId,
      evaluationId: solution.evaluationId,
      currentScore: solution.currentScore,
      date,
      selectedOptionIndexs: solution.selectedOptionIndexs,
      weightedScore,
    });
  }

  //REVISAR BIEN ESTA PARTE

  // Referencia a la colección StudentTopic
  const studentTopicRef = collection(db, "StudentTopic");

  // Consultar si el estudiante ya ha respondido la evaluación
  const studentTopicQuery = query(
    studentTopicRef,
    where("studentId", "==", solution.studentId),
    where("topicId", "==", solution.topicId)
  );
  const studentTopicSnap = await getDocs(studentTopicQuery);

  // Si ya ha respondido la evaluación
  if (!studentTopicSnap.empty) {
    // Obtener el ID del documento
    const studentTopicId = studentTopicSnap.docs[0].id;

    // Crear una referencia al documento
    const studentTopicDocRef = doc(studentTopicRef, studentTopicId);

    const studentTopicData = studentTopicSnap.docs[0].data() as StudentTopic;

    const updatedWeightedScores = { ...studentTopicData.weightedScores, [evaluation.level.name]: weightedScore };

    const totalWeightedScore = Object.values(updatedWeightedScores).reduce((acc: number, score: number) => acc + score, 0) / 3.0

    // Actualizar la respuesta
    await updateDoc(studentTopicDocRef, {
      weightedScores: updatedWeightedScores,
      weightedScore: totalWeightedScore,
    });

    //haTopicWeightedScore()
    const hato = await haTopicWeightedScore({
      studentId: solution.studentId,
      topicId: solution.topicId,
      newWeightedScore: totalWeightedScore,
      date,
    });

    if (!hato) {
      throw new Error("Failed to calculate HaTopicWeightedScoreParams.");
    }

    return hato as HaTopicWeightedScoreParams;
  } else {
    // Crear una nueva respuesta
    await addDoc(studentTopicRef, {
      studentId: solution.studentId,
      topicId: solution.topicId,
      weightedScores: { [evaluation.level.name]: weightedScore },
      weightedScore: weightedScore/3.0,
    });
    //haTopicWeightedScore()
    const hato = await haTopicWeightedScore({
      studentId: solution.studentId,
      topicId: solution.topicId,
      newWeightedScore: weightedScore/3.0,
      date,
    });
    if (!hato) {
      throw new Error("Failed to calculate HaTopicWeightedScoreParams.");
    }
    return hato as HaTopicWeightedScoreParams;
  }

}

type HaTopicWeightedScoreParams = {
  id: string;
  date: Timestamp;
  currentProgress: number;
  tierId: string;
  achievement: {
    id: string;
    description: string;
    achievementTypeId: string;
    totalProgress: number;
    course: {
      name: string;
      color: string;
    }
    topic: {
      id: string;
      name: string;
      index: number;
    }
  },
  totalProgress: number;
};


//Debe verificar si el nuevo valor de Topic.weightedScore desbloquea un nuevo logro
export async function haTopicWeightedScore({ studentId, topicId, newWeightedScore, date }: { studentId: string, topicId: string, newWeightedScore: number, date: Date }) {
  // Obtener el logro de tipo 1 (Topic) con topicId == req.topicId
  const achievement = await getAchievementByTopicId(topicId);

  // Obtener el estado actual del logro del estudiante
  if (!achievement) {
    throw new Error(`Achievement for topicId "${topicId}" not found`);
  }
  const studentAchievement = await getStudentAchievementByStudentIdAndAchievementId(studentId, achievement.id);
  console.log("Student Achievement HATO:", studentAchievement);

  // Obtener el nuevo nivel
  const newTier = await getTierByWeightedScore(newWeightedScore);
  console.log("New Tier:", newTier);
  if (!newTier) {
    console.warn("No tier matched the weighted score:", newWeightedScore);
  }

  const shouldUpdate = !studentAchievement || newTier.id == studentAchievement.tierId;


  if (shouldUpdate) {
    console.log("Updating student achievement:")
    const newStudentAchievement = updateStudentAchievement({
      studentId,
      achievementId: achievement.id,
      date: date.toISOString(),
      currentProgress: newWeightedScore,
      tierId: newTier.id,
    });
    return newStudentAchievement;
  }
  console.log("No update needed for student achievement.");
  return {
    id: "",
    date: Timestamp.fromDate(new Date()),
    currentProgress: 0,
    tierId: "",
    achievement: {
      id: "",
      description: "",
      achievementTypeId: "",
      totalProgress: 0,
      course: { name: "", color: "" }, // fallback si es null
      topic: { id: "", name: "", index: 0 }, // fallback si es null
    },
    totalProgress: 0,
  };
}