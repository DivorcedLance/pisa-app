import { create } from "zustand";

interface EvaluationState {
  evaluations: Record<string, any>;
  selectedEvaluation: any | undefined;
  selectedLevel: any | undefined;

  fetchEvaluations: () => void;
  selectLevel: (level: number) => void;
}