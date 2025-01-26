export type StudentTopic = {
    id?: string,
    studentId: string,
    topicId: string,
    weightedScore: number,
    weightedScores: {"Básico": number, "Intermedio": number, "Avanzado": number}
  }