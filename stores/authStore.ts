import { create } from "zustand";
import { login, LoginError } from "@/lib/firebase/auth";
import { Student } from "@/types/student";
import { Teacher } from "@/types/teacher";

interface AuthState {
  email: string;
  password: string;
  userData: Student | Teacher | null;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  login: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set, get) => ({
  email: "",
  password: "",
  userData: null,
  setEmail: (email: string) => set({ email }),
  setPassword: (password: string) => set({ password }),
  login: async () => {
    try {
      const user = await login(get().email, get().password);
      set({ password: "" });
      set({ userData: user });
    } catch (error) {
      if (error instanceof LoginError) {
        throw new Error(error.message);
      } else {
        console.error(error);
      }
    }
  },
}));

export default useAuthStore;
