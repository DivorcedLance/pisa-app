import { create } from "zustand";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/firebaseConfig";
import { createStudent, createTeacher, getUserDataByEmail, updateStreak, UserData } from "@/lib/firebase/userData";

interface AuthState {
  user: UserData | null; // Información completa del usuario
  isLoading: boolean;
  error: string | null;
  setEmail: (email: string) => void;
  login: (password: string) => Promise<void>;
  register: (email: string, password: string, userdata: {
    firstName: string;
    lastName: string;
    telephone: string;
    profileImgLink: string;
    documentType: string;
    documentNumber: string;
    birthDate: Date;
    type: "student" | "teacher";
  }) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null, // Estado inicial del usuario
  isLoading: false,
  error: null,

  // Actualiza solo el email del usuario en el estado
  setEmail: (email: string) => {
    set((state) => ({ user: { ...state.user, email } as UserData }));
  },

  // Inicia sesión con email y contraseña
  login: async (password: string) => {
    const { user } = get();
    if (!user?.email) {
      throw new Error("Email no proporcionado.");
    }

    set({ isLoading: true, error: null });
    try {
      const userCredential = await signInWithEmailAndPassword(auth, user.email, password);
      const fullUserData = await getUserDataByEmail(userCredential.user.email!);
      set({ user: fullUserData, isLoading: false });

      const streak = await updateStreak(fullUserData?.id!);
      if (!streak) {
        throw new Error("Error al actualizar la racha.");
      }
    console.log("Racha actual:", streak);
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  // Registra un nuevo usuario y guarda su información en la base de datos
  register: async (email: string, password: string, userdata: {
    firstName: string;
    lastName: string;
    telephone: string;
    profileImgLink: string;
    documentType: string;
    documentNumber: string;
    birthDate: Date;
    type: "student" | "teacher";
  }) => {
    set({ isLoading: true, error: null });
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // guardar userdata en la base de datos tabla User
      const data = {
        ...userdata,
        email,
      };
      
      if (userdata.type === "student") {
        const createdStudent = await createStudent({
          email,
          firstName: data.firstName,
          lastName: data.lastName,
          telephone: data.telephone,
          profileImgLink: data.profileImgLink,
          documentType: data.documentType,
          documentNumber: data.documentNumber,
          birthDate: data.birthDate
        });
        if (!createdStudent) {
          throw new Error("Error al crear el estudiante.");
        }
      } else if (userdata.type === "teacher") {
        const createdTeacher = await createTeacher({
          email,
          firstName: data.firstName,
          lastName: data.lastName,
          telephone: data.telephone,
          profileImgLink: data.profileImgLink,
          documentType: data.documentType,
          documentNumber: data.documentNumber,
          birthDate: data.birthDate
        });
        if (!createdTeacher) {
          throw new Error("Error al crear el profesor.");
        }
      }
      
      const fullUserData = await getUserDataByEmail(userCredential.user.email!);
      set({ user: fullUserData, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  // Cierra la sesión del usuario y limpia el estado
  logout: async () => {
    set({ isLoading: true });
    try {
      await signOut(auth);
      set({ user: null, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
}));
