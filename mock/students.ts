import { Student } from "@/types/student";
import { mockAchivements } from "./achievements";

export const students: Student[] = [
  {
    id: "user-001",
    code: "STU-2024",
    email: "student1@example.com",
    firstName: "John",
    lastName: "Doe",
    telephone: "+1234567890",
    profilePictureLink: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.excelsior.com.mx%2Fmedia%2Fpictures%2F2024%2F11%2F21%2F3216015.jpg&f=1&nofb=1&ipt=5afad0066caa6b4aec41c671d95e3b0c8c295cbe6224258183df806961df26c3&ipo=images",
    birthDate: "2005-09-15",
    documentNumber: "12345678",
    type: "student",
    grade: "10",
    section: "A",
    achivements: mockAchivements,
    points: 1500,
  },
  {
    id: "user-002",
    code: "STU-2024",
    email: "student2@example.com",
    firstName: "Jane",
    lastName: "Smith",
    telephone: "+0987654321",
    profilePictureLink: "https://i.ytimg.com/vi/NT_3wePUoug/hqdefault.jpg",
    birthDate: "2006-03-10",
    documentNumber: "87654321",
    type: "student",
    grade: "11",
    section: "B",
    achivements: mockAchivements,
    points: 1700,
  },
];
