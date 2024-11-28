import { User } from "@/types/user";
import { Classroom } from "./classroom";

export type Teacher = User & {
    classrooms: Classroom[];
    position: string;
};
