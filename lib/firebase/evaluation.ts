// ## getEvaluationDataById()

// ### Request

// ```ts
// {
//   "evaluationId": string;
// }
// ```

// ### Response

// ```json
// Evaluation
// {
//   "id": "string",
//   "level": Level,
//   "totalScore": "number",

//   "questions": Question[], // from T[Question] based on questionIds
//   "currentScore": "number", // from T[StudentEvaluation]
//   "weightedScore": "number", // from T[StudentEvaluation]
//   "date": "date", // from T[StudentEvaluation]
// }

//   Level
//   {
//     "name": "string",
//     "index": "number",
//   }

//   Question
//   {
//     "id": "string",
//     "statement": "string",
//     "questionImgLink": "string",
//     "options": "string[]",
//     "correctOptionIndex": "number",
//     "score": "number",
//     "solution": "string",
//   }
// ```

import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/firebaseConfig";

export type Evaluation = {
  id: string;
  level: {
    name: string;
    index: number;
  };
  totalScore: number;

  questions: Question[];
  currentScore: number;
  weightedScore: number;
  date: Date;
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

// export async function getEvaluationDataById(evaluationId: string, studentId: string): Promise<Evaluation> {
//   const evaluationRef = doc(db, "Evaluation", evaluationId);
//   const evaluationSnap = await getDoc(evaluationRef);

//   if (!evaluationSnap.exists()) {
//     throw new Error(`Evaluation with ID "${evaluationId}" not found`);
//   }

//   const evaluationData = evaluationSnap.data();

//   const questionPromises = evaluationData.questionIds.map(async (questionId: string) => {
//     const questionRef = doc(db, "Question", questionId);
//     const questionSnap = await getDoc(questionRef);

//     if (!questionSnap.exists()) {
//       throw new Error(`Question with ID "${questionId}" not found`);
//     }

//     return { id: questionId, ...questionSnap.data() } as Question;
//   });

//   const questions = await Promise.all(questionPromises);

//   return {
//     id: evaluationId,
//     level: evaluationData.level,
//     totalScore: evaluationData.totalScore,
//     questions,
// //   "currentScore": "number", // from T[StudentEvaluation]
// //   "weightedScore": "number", // from T[StudentEvaluation]
// //   "date": "date", // from T[StudentEvaluation]
//   };
// }