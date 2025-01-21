import { mockAchivements } from "./achievements";
import { UserData } from "@/lib/firebase/userData";

export const students: UserData[] = [
  {
    id: "user-001",
    email: "student1@example.com",
    firstName: "John",
    lastName: "Doe",
    telephone: "1234567890",
    profileImgLink: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.excelsior.com.mx%2Fmedia%2Fpictures%2F2024%2F11%2F21%2F3216015.jpg&f=1&nofb=1&ipt=5afad0066caa6b4aec41c671d95e3b0c8c295cbe6224258183df806961df26c3&ipo=images",
    birthDate: new Date("2006-03-10"),
    documentType: "DNI",
    documentNumber: "12345678",
    type: "student",
    rolData: {
      sectionId: "section-001",
    },
  },
  {
    id: "user-002",
    email: "student2@example.com",
    firstName: "Jane",
    lastName: "Smith",
    telephone: "0987654321",
    profileImgLink: "https://i.ytimg.com/vi/NT_3wePUoug/hqdefault.jpg",
    birthDate: new Date("2005-05-15"),
    documentType: "DNI",
    documentNumber: "87654321",
    type: "student",
    rolData: {
      sectionId: "section-002",
    },
  },
];
