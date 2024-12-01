import { Evaluation, getEvaluationDataById } from "@/lib/firebase/evaluation";
import { create } from "zustand";

interface EvaluationState {
  evaluationIds: string[];
  studentId: string;
  selectedLevel: number | undefined;
  selectedEvaluation: Evaluation | undefined;

  setEvaluationIds: (evaluationIds: string[]) => void;
  setStudentId: (studentId: string) => void;
  selectLevel: (level: number) => Promise<void>;
}

export const useEvaluationStore = create<EvaluationState>((set, get) => ({
  evaluationIds: [],
  studentId: "",
  selectedLevel: undefined,
  selectedEvaluation: undefined,

  setEvaluationIds: (evaluationIds: string[]) => {
    set({ evaluationIds });
  },

  setStudentId: (studentId: string) => {
    set({ studentId });
  },

  selectLevel: async (level: number) => {
    const { evaluationIds, studentId } = get();

    // Handle invalid or undefined level
    if (level === undefined || level < 0 || level >= evaluationIds.length) {
      set({ selectedLevel: undefined, selectedEvaluation: undefined });
      console.warn("Invalid level selected:", level);
      return;
    }

    set({ selectedLevel: level });

    const evaluationId = evaluationIds[level];

    try {
      const evaluationData = await getEvaluationDataById(evaluationId, studentId);
      set({ selectedEvaluation: evaluationData });
    } catch (error: any) {
      console.error("Error fetching evaluation data:", error.message || error);
      set({ selectedEvaluation: undefined });
    }
  },
}));
