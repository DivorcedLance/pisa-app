import { create } from "zustand";
import { Topic, Course, getCourseDataByCourseName, getTopicDataById } from "@/lib/firebase/topic";
import { getCourseList } from "@/lib/firebase/course";

interface CourseState {
  courses: Record<string, Course>;
  selectedCourse: Course | undefined;
  selectedTopic: Topic | undefined;

  fetchCourses: () => void;
  selectCourse: (courseName: string) => void;
  selectTopic: (topicId: string) => void;
}

export const useCourseStore = create<CourseState>((set) => ({
  courses: {},
  selectedCourse: undefined,
  selectedTopic: undefined,

  fetchCourses: async () => {
    try {
      const courseList = await getCourseList();
      const courses = courseList.reduce((acc, course) => {
        acc[course.name] = course;
        return acc;
      }, {} as Record<string, Course>);
      set({ courses });
    } catch (error: any) {
      console.error("Error fetching course list:", error.message);
    }
  },
  
  selectCourse: async (courseName: string) => {
    // ! HANDLE ERRORS
    const courseData = await getCourseDataByCourseName(courseName);
    set({ selectedCourse: courseData });
  },

  selectTopic: async (topicId: string) => {
    // ! HANDLE ERRORS
    const topicData = await getTopicDataById(topicId);
    set({ selectedTopic: topicData });
  },

}));
