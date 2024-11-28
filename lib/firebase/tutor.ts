import { teachers } from "@/mock/teacher";
import { Teacher } from "@/types/teacher";

//obtener tutor by id
export async function getTutorById(id : String): Promise<Teacher> {
  const tutor = teachers.find((tutor) => tutor.id === id);
  if (!tutor) {
    throw new Error("Tutor not found");
  }
  return tutor;
}