import { Student } from "./student";

export type Classroom = {
    grade: string;
    section: string;
    students: Student[];
};