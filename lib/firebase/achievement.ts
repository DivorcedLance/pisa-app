import { mockAchivements } from "@/mock/achievements";
import { students } from "@/mock/students";
import { Achivements } from "@/types/achivements";

//obtener los logros por ids
export async function getAchievementsByIds(ids : String[]): Promise<Achivements[]> {
  return mockAchivements.filter((achivement) => ids.includes(achivement.id));
}

//obtener los logros por estudianteid, un estudiante tiene un array de idlogros
export async function getAchievementsByStudentId(studentId : String): Promise<Achivements[]> {
  const student = students.find((student) => student.id === studentId);
    if (!student) {
        throw new Error("Student not found");
    }
    const achievements = await getAchievementsByIds(student.achivements.map(a => a.id));
    return achievements;
}