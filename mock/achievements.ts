import { Achivements } from "@/types/achivements";

export const mockAchivements: Achivements[] = [
    {
        "id": "1",
        "title": "Primer paso",
        "description": "Has resuelto tu primer ejercicio correctamente.",
        "course": "Matemáticas",
        "level": "Basic",
        "icon": "medal_bronze",
        "progress": {
          "completed": 1,
          "total": 1
        },
        "status": "unlocked"
      },
      {
        "id": "2",
        "title": "Estrella en Matemáticas",
        "description": "Resuelve 10 ejercicios de matemáticas.",
        "course": "Matemáticas",
        "level": "Basic",
        "icon": "bronze",
        "progress": {
          "completed": 7,
          "total": 10
        },
        "status": "in_progress"
      },
      {
        "id": "3",
        "title": "Científico en Acción",
        "description": "Completa un tema de ciencias al 100%.",
        "course": "Ciencias",
        "level": "Basic",
        "icon": "trophy_gold",
        "progress": {
          "completed": 1,
          "total": 1
        },
        "status": "unlocked"
      },
      {
        "id": "4",
        "title": "Maratón de Ejercicios",
        "description": "Resuelve 50 ejercicios en total.",
        "course": "Matemáticas",
        "level": "Intermediate",
        "icon": "silver",
        "progress": {
          "completed": 32,
          "total": 50
        },
        "status": "in_progress"
      },
      {
        "id": "5",
        "title": "Maestro del Lenguaje",
        "description": "Resuelve 20 ejercicios de lenguaje correctamente.",
        "course": "Lectura",
        "level": "Basic",
        "icon": "bronze",
        "progress": {
          "completed": 20,
          "total": 20
        },
        "status": "unlocked"
      }
];
