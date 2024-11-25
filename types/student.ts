import { Achivements } from "@/types/achivements";
import { User } from "@/types/user";

export type Student = User & {
  grade: string;
  section: string;
  achivements: Achivements[];
  points: number;
};
