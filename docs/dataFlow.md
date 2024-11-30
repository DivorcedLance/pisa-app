# General

## UserValidation:

{
  *email*: string,
  passwordEncrypted: string,
  userId: string,
}

## User:

{
  *id*: string,
  email: string,
  firstName: string,
  lastName: string,
  telephone: string,
  profileImgLink: string,
  documentType: string,
  documentNumber: string,
  birthDate: date,
  type: 'student' | 'teacher',
  rolData: Student | Teacher
}

## Student:

{
  user: User,
  section: Section,
}

## Section:

{
  *id*: string,
  code: string,
}

## Course:

{
  *name*: string,
  color: string,
  topics: Topic[],
}

course/[courseId]

## Topic:

{
  *id*: string,
  name: string,
  index: number,
  multimediaContent: MultimediaContent,
  evaluations: Evaluation[],
}

course/[courseId]/topic/[topicId]

## MultimediaContent:

{
  *id*: string,
  videoLink: string,
  imageLink: string,
  description: string,
}

## Evaluation:

{
  *id*: string,
  questions: Question[],
  totalScore: number,
  level: Level,
}

## Level:

{
  *name*: string,
  index: number,
}

## Question:

{
  *id*: string,
  statement: String,
  questionImgLink?: String,
  options: String[],
  correctOptionIndex: number,
  score: number,
  solution: String,
}

## Achivement:

{
  *id*: string,
  course: Course,
  topic?: Topic,
  description: string,
  type: AchivementType,
}

<!-- TODO: How to save the formula for totalProgress in each AchievementType -->
## AchivementType:

{
  *name*: string,
  conditions: map<string, string>,
  totalProgress: number,
}

## Tier
{
  "name": "string",
  "spriteImgLink": "string",
}

### AchivementType Examples:

{
  *name*: "CompleteTopic",
  conditions: {
    topicId: string,
  },
}

{
  *name*: "CompleteEvaluation",
  conditions: {
    evaluationId: string,
  },
}

