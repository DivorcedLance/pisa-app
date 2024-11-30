import { create } from "zustand";
import { Course } from "@/lib/firebase/topic";

interface CourseState {
  courses: Record<string, Course>;
  addCourse: (course: Course) => void;
  deleteCourse: (courseName: string) => void;
  deleteCourses: () => void;
}

export const useCourseStore = create<CourseState>((set) => ({
  courses: {},

  // Agrega un curso al store
  addCourse: (course: Course) =>
    set((state) => ({
      courses: {
        ...state.courses,
        [course.name]: course,
      },
    })),

  // Elimina un curso del store
  deleteCourse: (courseName: string) =>
    set((state) => {
      const { [courseName]: _, ...courses } = state.courses;
      return { courses };
    }
  ),

  // Elimina todos los cursos del store
  deleteCourses: () => set({ courses: {} }),
}));
