import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
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


export async function registerEvaluationSolution(solution: {studentId: string, evaluationId: string, currentScore: number, selectedOptionIndexs: number[], topicId: string}): Promise<void> {
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

  // Si ya ha respondido la evaluación
  if (!studentEvaluationSnap.empty) {
    // Obtener el ID del documento
    const studentEvaluationId = studentEvaluationSnap.docs[0].id;

    // Crear una referencia al documento
    const studentEvaluationDocRef = doc(studentEvaluationRef, studentEvaluationId);

    // Actualizar la respuesta
    await updateDoc(studentEvaluationDocRef, {
      currentScore: solution.currentScore,
      date,
      selectedOptionIndexs: solution.selectedOptionIndexs,
      weightedScore,
    });
  } else {
    // Crear una nueva respuesta
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
    where("topicId", "==", evaluation.level.name)
  );
  const studentTopicSnap = await getDocs(studentTopicQuery);

  // Si ya ha respondido la evaluación
  if (!studentTopicSnap.empty) {
    // Obtener el ID del documento
    const studentTopicId = studentTopicSnap.docs[0].id;

    // Crear una referencia al documento
    const studentTopicDocRef = doc(studentTopicRef, studentTopicId);

    // Actualizar la respuesta
    await updateDoc(studentTopicDocRef, {
      weightedScores: [
        ...studentTopicSnap.docs[0].data().weightedScores,
        weightedScore,
      ],
      weightedScore: studentTopicSnap.docs[0].data().weightedScores.reduce((acc: number, curr: number) => acc + curr, 0) / studentTopicSnap.docs[0].data().weightedScores.length,
    });
  } else {
    // Crear una nueva respuesta
    await addDoc(studentTopicRef, {
      studentId: solution.studentId,
      topicId: solution.topicId,
      weightedScores: [weightedScore],
      weightedScore,
    });
  }
}
