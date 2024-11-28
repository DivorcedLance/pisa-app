//mockup de teacher
// import { User } from "@/types/user";

import { Teacher } from "@/types/teacher";

// export type Teacher = User & {
//     classrooms: string[];
//     position: string;
// };

export const teachers: Teacher[] = [
    {
        id: "1",
        email: "teacher1@example.com",
        firstName: "John",
        lastName: "Doe",
        birthDate: "1980-01-01",
        code: "T001",
        country: "USA",
        documentNumber: "123456789",
        profilePictureLink: "https://example.com/profile1.jpg",
        type: "teacher",
        position: "Math Teacher",
        telephone: "123-456-7890",
        classrooms: [
            {
                grade: "1",
                section: "A",
                students: [
                    {
                        id: "1",
                        email: "student1@example.com",
                        firstName: "Alice",
                        lastName: "Smith",
                        birthDate: "2010-05-15",
                        code: "S001",
                        country: "USA",
                        documentNumber: "987654321",
                        profilePictureLink: "https://example.com/student1.jpg",
                        type: "student",
                        telephone: "321-654-0987",
                    }
                ]
            }
        ]
    },
    {
        id: "2",
        email: "teacher2@example.com",
        firstName: "Jane",
        lastName: "Doe",
        birthDate: "1985-02-02",
        code: "T002",
        country: "USA",
        documentNumber: "234567890",
        profilePictureLink: "https://example.com/profile2.jpg",
        type: "teacher",
        position: "Science Teacher",
        telephone: "234-567-8901",
        classrooms: [
            {
                grade: "1",
                section: "B",
                students: [
                    {
                        id: "2",
                        email: "student2@example.com",
                        firstName: "Bob",
                        lastName: "Johnson",
                        birthDate: "2010-06-20",
                        code: "S002",
                        country: "USA",
                        documentNumber: "876543210",
                        profilePictureLink: "https://example.com/student2.jpg",
                        type: "student",
                        telephone: "432-765-0987",
                    }
                ]
            }
        ]
    }
];