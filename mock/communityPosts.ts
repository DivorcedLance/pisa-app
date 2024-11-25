import { CommunityPost } from "@/types/communityPost";
import { students } from "@/mock/students";

export const communityPosts: CommunityPost[] = [
  {
    id: "post-001",
    title: "How to improve study habits?",
    content: "I am looking for tips on how to study more effectively. Any advice?",
    date: "2024-11-25",
    student: students[0],
    answers: [
      {
        id: "post-002",
        title: "Re: How to improve study habits?",
        content: "You can try the Pomodoro technique and set clear goals for each session.",
        date: "2024-11-26",
        student: students[1],
        answers: [],
        responseTo: "post-001",
      },
    ],
    responseTo: null,
  },
  {
    id: "post-002",
    title: "Re: How to improve study habits?",
    content: "You can try the Pomodoro technique and set clear goals for each session.",
    date: "2024-11-26",
    student: students[1],
    answers: [],
    responseTo: "post-001",
  },
  {
    id: "post-003",
    title: "Best resources for learning programming?",
    content: "What are the best online resources for beginners learning programming?",
    date: "2024-11-20",
    student: students[1],
    answers: [],
    responseTo: null,
  },
];
