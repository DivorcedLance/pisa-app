import { Student } from "@/types/student";
import { User } from "@/types/user";

import { students } from "@/mock/students";

export class LoginError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LoginError";
  }
}

export async function login(email: string, password: string): Promise<User | null> {
  if (password.length > 6) {
    throw new LoginError("La contraseña no debe tener más de 6 caracteres"); // ! Simular error
  }

  return students[0] as Student;
}
