import { create } from "zustand";

interface ConfigState {
  selectedLevelIndex: number;
  selectLevelIndex: (levelIndex: number) => void;
}

export const useConfigStore = create<ConfigState>((set) => ({
  selectedLevelIndex: 0,
  selectLevelIndex: (levelIndex) => {
    set({ selectedLevelIndex: levelIndex });
  },
}));