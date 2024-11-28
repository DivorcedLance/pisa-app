import { Achivements } from "@/types/achivements";
import { User } from "@/types/user";
import { Classroom } from "./classroom";

export type Student = User & {
  grade?: string;
  section?: string;
  achivements?: Achivements[];
  points?: number;
  classroom?: Classroom;
};
