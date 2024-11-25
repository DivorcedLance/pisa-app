import { Student } from "@/types/student";

export type CommunityPost = {
    id: string;
    title: string;
    content: string;
    date: string;
    student: Student;
    answers: CommunityPost[];
    responseTo: string | null;
}