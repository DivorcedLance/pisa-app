import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase/firebaseConfig";

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