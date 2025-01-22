import { UserData } from "@/lib/firebase/userData";

export type CommunityPost = {
    id: string;
    title: string;
    content: string;
    date: Date;
    studentId: string;
    student: UserData;
    answers?: CommunityPost[];
    responseTo: string | null;
}

export type newCommunityPost = Pick<CommunityPost, 'studentId' | 'title' | 'content' | 'responseTo'>;