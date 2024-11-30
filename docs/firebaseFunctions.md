# Firebase Functions to create data

## createCourse()

### Toma:
```json
{
  "name": "string",
  "color": "string", // hexadecimal (Ejm: #FF0000)
}
```

### Escribe en la base de datos:
Course
```json
{
  "name": "string", //PK
  "color": "string",
  "topicIds": "string[]", <// lista vacia
}
```

### Devuelve:
```json
{
  "name": "string",
  "color": "string",
  "topicIds": "string[]", <// lista vacia
}
```

## createTopic()

### Toma:
```json
{
  "courseName": "string", <// validar que exista

  "name": "string",
  "index": "number",
  "multimediaContent": {
    "videoLink": "string",
    "imageLink": "string",
    "description": "string",
  },
}
```

### Escribe en la base de datos:

Topic
```json
{
  "id": "string", //PK
  "name": "string",
  "index": "number",
  "multimediaContent": {
    "videoLink": "string",
    "imageLink": "string",
    "description": "string",
  },
  "evaluationIds": "string[]", // lista vacia
}
```

### Actualiza en la base de datos:

Course
en Course.name == req.courseName
```json
{
  "name": "string", //PK
  "color": "string",
  "topicIds": "string[]",  <------ agregar Topic.id
}
```

### Devuelve:
```json
{
  "id": "string",
  "name": "string",
  "index": "number",
  "multimediaContent": {
    "videoLink": "string",
    "imageLink": "string",
    "description": "string",
  },
  "evaluationIds": "string[]", // lista vacia
}
```

## createEvaluation()

### Toma:
```json
{
  "topicId": "string", <// validar que exista
  "levelIndex": "number", // 0, 1, 2
  "totalScore": "number",
  "questions": {
    "statement": "string",
    "questionImgLink": "string",
    "options": "string[]",
    "correctOptionIndex": "number",
    "score": "number",
    "solution": "string",
  }[],
}
```

Debe manejar level apartir de levelIndex

```
"level": {
  "name": "string", // Básico, Intermedio, Avanzado
  "index": "number", // 0, 1, 2
}
```

### Escribe en la base de datos:

Question <---- questions[]
```json
{
  "id": "string",
  "statement": "string",
  "questionImgLink": "string",
  "options": "string[]",
  "correctOptionIndex": "number",
  "score": "number",
  "solution": "string",
}
```

Evaluation
```json
{
  "id": "string", //PK
  "level": {
    "name": "string",
    "index": "number",
  },
  "totalScore": "number",
  "questionIds": "string[]",
}
```

### Actualiza en la base de datos:

Topic
en Topic.id == req.topicId
```json
{
  "id": "string", //PK
  "name": "string",
  "index": "number",
  "multimediaContent": {
    "videoLink": "string",
    "imageLink": "string",
    "description": "string",
  },
  "evaluationIds": "string[]",  <------ agregar Evaluation.id
}
```

### Devuelve:
```json
{
  "id": "string",
  "level": {
    "name": "string",
    "index": "number",
  },
  "totalScore": "number",
  "questions": {
    "id": "string",
    "statement": "string",
    "questionImgLink": "string",
    "options": "string[]",
    "correctOptionIndex": "number",
    "score": "number",
    "solution": "string",
  }[],
}
```

## createTier()

### Toma:
```json
{
  "name": "string",
  "spriteImgLink": "string",
}
```

### Escribe en la base de datos:
Tier
```json
{
  "id": "string", //PK
  "name": "string",
  "spriteImgLink": "string",
}
```

### Devuelve:
```json
{
  "id": "string", //PK
  "name": "string",
  "spriteImgLink": "string",
}
```

## createStudent()

### Toma:
```json
{
  "email": "string",
  "firstName": "string",
  "lastName": "string",
  "telephone": "string",
  "profileImgLink": "string",
  "documentType": "string",
  "documentNumber": "string",
  "birthDate": "date",
}
```

### Escribe en la base de datos:

User
```json
{
  "id": "string", //PK
  "email": "string",
  "firstName": "string",
  "lastName": "string",
  "telephone": "string",
  "profileImgLink": "string",
  "documentType": "string",
  "documentNumber": "string",
  "birthDate": "date",
  "type": "student", <// student
  "rolData": {
    "sectionId": "", <// vacio
  }

}
```

### Devuelve:

```json
{
  "id": "string", //PK
  "email": "string",
  "firstName": "string",
  "lastName": "string",
  "telephone": "string",
  "profileImgLink": "string",
  "documentType": "string",
  "documentNumber": "string",
  "birthDate": "date",
  "type": "student", <// student
  "rolData": {
    "sectionId": "" <// vacio
  }
}
```

## createTeacher()

### Toma:
```json
{
  "email": "string",
  "firstName": "string",
  "lastName": "string",
  "telephone": "string",
  "profileImgLink": "string",
  "documentType": "string",
  "documentNumber": "string",
  "birthDate": "date",
}
```

### Escribe en la base de datos:

User
```json
{
  "id": "string", //PK
  "email": "string",
  "firstName": "string",
  "lastName": "string",
  "telephone": "string",
  "profileImgLink": "string",
  "documentType": "string",
  "documentNumber": "string",
  "birthDate": "date",
  "type": "teacher", <// teacher
  "rolData": {
    "sectionIds": "string[]", <// vacio
  }
}
```

### Devuelve:

```json
{
  "id": "string", //PK
  "email": "string",
  "firstName": "string",
  "lastName": "string",
  "telephone": "string",
  "profileImgLink": "string",
  "documentType": "string",
  "documentNumber": "string",
  "birthDate": "date",
  "type": "teacher",
  "rolData": {
    "sectionIds": "string[]", <// vacio
  }
}
```

## createSection()

### Toma:
```json
{
  "code": "string",
  "teacherId": "string",
}
```

### Escribe en la base de datos:

Section
```json
{
  "id": "string", //PK
  "code": "string",
  "teacherId": "string",
  "studentIds": "string[]", <// lista vacia
}
```

### Actualiza en la base de datos:

Teacher
en Teacher.id == req.teacherId
```json
{
  "id": "string", //PK
  "email": "string",
  "firstName": "string",
  "lastName": "string",
  "telephone": "string",
  "profileImgLink": "string",
  "documentType": "string",
  "documentNumber": "string",
  "birthDate": "date",
  "type": "teacher",
  "rolData": {
    "sectionIds": "string[]",  <------ agregar Section.id
  }
}
```

### Devuelve:
```json
{
  "id": "string", //PK
  "code": "string",
  "teacherId": "string",
  "studentIds": "string[]", <// lista vacia
}
```



## createAchievement()

### Toma:
```json
{
  "courseId": "string", <// validar que exista u optional
  "topicId": "string", <// validar que exista u optional
  "name": "string",
  "description": "string",
  "totalProgress": "number",
  "achievementTypeId": "string",
}
```

### Escribe en la base de datos:

Achievement
```json
{
  "id": "string", //PK
  "courseId": "string", // optional
  "topicId": "string", // optional
  "name": "string",
  "description": "string",
  "totalProgress": "number",
  "achievementTypeId": "string",
}
```

### Devuelve:

```json
{
  "id": "string", //PK
  "courseId": "string", // optional
  "topicId": "string", // optional
  "name": "string",
  "description": "string",
  "totalProgress": "number",
  "achievementTypeId": "string",
}
```

# Firebase Functions to get data

## getUserData()

### Response

```json
User
{
  "id": "string",
  "email": "string",
  "firstName": "string",
  "lastName": "string",
  "telephone": "string",
  "profileImgLink": "string",
  "documentType": "string",
  "documentNumber": "string",
  "birthDate": "date",
  "type": "student" | "teacher",
  "rolData": Student | Teacher
}

  Student
  {
    "section": Section, // from sectionId
    "achievements": StudentAchievement[] // from T[studentAchievement] where studentId is Student.id
  }

    Section
    {
      "id": "string",
      "code": "string",
      "teacherId": "string",
      "studentIds": "string[]"
    }

    StudentAchievement
    {
      "id": "string",
      "date": "date",
      "currentProgress": "number",
      "tierId": "string",

      "achivement": Achievement, // from achievementId
      "totalProgress": "number", // from Achievement.totalProgress
    }

      Achievement
      {
        "id": "string",
        "name": "string",
        "description": "string",
        "totalProgress": "number",
        "achievementTypeId": "string",
        "course": Course | null, // from courseId
        "topicId": Topic | null, // from topicId
      }

        Course
        {
          "name": "string",
          "color": "string"
        }

        Topic
        {
          "id": "string",
          "name": "string",
          "index": "number",
        }
        

  Teacher
  {
    "sections": Section[] // from sectionIds
  }

    Section
    {
      "id": "string",
      "code": "string",
      "teacherId": "string",
      "studentIds": "string[]"
    }
```

## getCourseList()

### Response

```json
Course[]
{
  "name": "string",
  "color": "string"
}
```

## getAchivementData()

### Response

```json
Achivement[]
{
  "id": "string",
  "name": "string",
  "description": "string",
  "totalProgress": "number",
  "achievementTypeId": "string",

  "course": Course | null, // from courseId
  "topicId": Topic | null, // from topicId
}

  Course
  {
    "name": "string",
    "color": "string"
  }

  Topic
  {
    "id": "string",
    "name": "string",
    "index": "number",
  }
```

## getTopicList()

### Request

```ts
{
  "courseId": string;
}
```

### Response

```json
Course[]
{
  "name": "string",
  "color": "string",

  "topics": Topic[], // from topicIds
}


  Topic
  {
    "id": "string",
    "name": "string",
    "index": "number",
  }
```

## getTopicDataById()

### Request

```ts
{
  "topicId": string;
}
```

### Response

```json
Topic
{
  "id": "string",
  "name": "string",
  "index": "number",
  "multimediaContent": MultimediaContent,

  "evaluations": Evaluation[], // from evaluationIds
}

  MultimediaContent
  {
    "videoLink": "string",
    "imageLink": "string",
    "description": "string",
  }

  Evaluation
  {
    "id": "string",
    "level": Level,
  }

    Level
    {
      "name": "string",
      "index": "number",
    }
```

## getEvaluationDataById()

### Request

```ts
{
  "evaluationId": string;
}
```

### Response

```json
Evaluation
{
  "id": "string",
  "level": Level,
  "totalScore": "number",

  "questions": Question[], // from T[Question] based on questionIds
  "currentScore": "number", // from T[StudentEvaluation]
  "weightedScore": "number", // from T[StudentEvaluation]
  "date": "date", // from T[StudentEvaluation]
}

  Level
  {
    "name": "string",
    "index": "number",
  }

  Question
  {
    "id": "string",
    "statement": "string",
    "questionImgLink": "string",
    "options": "string[]",
    "correctOptionIndex": "number",
    "score": "number",
    "solution": "string",
  }
```

# Firebase Functions to post data

## registerStudentInSection()

### Toma:
```json
{
  "studentId": "string", <// validar que exista
  "sectionId": "string", <// validar que exista
}
```

### Escribe en la base de datos:

Section
en Section.id == req.sectionId
```json
{
  "id": "string", //PK
  "code": "string",
  "teacherId": "string",
  "studentIds": "string[]",  <------ agregar req.studentId
}
```

User
en User.id == req.studentId
```json
{
  "id": "string", //PK
  "email": "string",
  "firstName": "string",
  "lastName": "string",
  "telephone": "string",
  "profileImgLink": "string",
  "documentType": "string",
  "documentNumber": "string",
  "birthDate": "date",
  "type": "student",
  "rolData": {
    "sectionId": "string", <// req.sectionId
  }
}
```

### Devuelve:
```json
{
  "id": "string", //PK
  "code": "string",
  "teacherId": "string",
  "studentIds": "string[]",  <// lista con req.studentId
}
```

## registerEvaluationSolution()

### Toma:
```json
{
  "studentId": "string", <// validar que exista
  "evaluationId": "string", <// validar que exista
  "selectedOptionIndexs": "number[]",
  "currentScore": "number",
  "date": "date",
}
```

Primero se debe revisa si el estudiante ya ha respondido la evaluación
E1: Si ya ha respondido se debe actualizar la respuesta
E2: Si no ha respondido se debe crear una nueva respuesta

### E1: Si ya ha respondido se debe actualizar la respuesta

#### Actualiza en la base de datos:

StudentEvaluation
```ts
evaluation = getEvaluationById(req.evaluationId)

{
  "id": "string", //PK
  "studentId": "string",
  "evaluationId": "string",
  "currentScore": "number", <---- req.currentScore,
  "date": "date", <---- req.date,
  "selectedOptionIndexs": <---- req.selectedOptionIndexs,
  "weightedScore": <---- req.currentScore / evaluation.totalScore,
}
```

### E2: Si no ha respondido se debe crear una nueva respuesta

#### Escribe en la base de datos:

StudentEvaluation
```ts
evaluation = getEvaluationById(req.evaluationId)

{
  "id": "string", //PK
  "studentId": "string",
  "evaluationId": "string",
  "currentScore": "number",
  "date": "date",
  "selectedOptionIndexs": "number[]",
  "weightedScore": req.currentScore / evaluation.totalScore,
}
```

### Después de E1 y E2

#### Actualiza en la base de datos:

StudentTopic
```ts
evaluation = getEvaluationById(req.evaluationId)

{
  "id": "string", //PK
  "studentId": "string",
  "topicId": "string",
  "weightedScore": "number", <---- promedio(weightedScores)
  "weightedScores": "number[]", <---- agregar req.currentScore / evaluation.totalScore en el index de evaluation.level.index
}
```

<!-- * Nota importante -->
# Sobre la creación de logros por defecto

createAchievement()

#### Logros de Topics

Al crear un topic este debe crear un achievement por defecto con los siguientes valores:

```js
{
  "courseId": "string",
  "topicId": "string",
  "name": `Logro ${topic.name}`
  "description": `Responde correctamente preguntas de ${topic.name} en el curso de ${course.name}`,
  "totalProgress": 0,
  "achievementTypeId": 1,
}
```

# Firebase Functions to handle achivements

## updateStudentAchievement()

### Toma:
```json
{
  "studentId": "string", <// validar que exista
  "achievementId": "string", <// validar que exista
  "date": "date",
  "currentProgress": "number",
  "tierId": "string",
}
```

### E1: Si no tiene el logro se debe crear

#### Escribe en la base de datos:

StudentAchievement
```json
{
  "id": "string", //PK
  "studentId": "string",
  "achievementId": "string",
  "date": "date",
  "currentProgress": "number",
  "tierId": "string",
}
```

### E2: Si ya tiene el logro se debe actualizar

#### Actualiza en la base de datos:

StudentAchievement
```json
{
  "id": "string", //PK
  "studentId": "string",
  "achievementId": "string",
  "date": "date",
  "currentProgress": "number",
  "tierId": "string",
}
```

### Después de E1 y E2

#### Devuelve:
```json
{
  "id": "string",
  "date": "date",
  "currentProgress": "number",
  "tierId": "string",

  "achivement": Achievement, // from achievementId
  "totalProgress": "number", // from Achievement.totalProgress
}

  Achievement
  {
    "id": "string",
    "course": Course | null, // from courseId
    "topicId": Topic | null, // from topicId
    "description": "string",
    "totalProgress": "number",
    "achievementTypeId": "string",
  }

    Course
    {
      "name": "string",
      "color": "string"
    }

    Topic
    {
      "id": "string",
      "name": "string",
      "index": "number",
    }
```

## haTopicWeightedScore()

Debe verificar si el nuevo valor de Topic.weightedScore desbloquea un nuevo logro

### Se llama en:

```ts
registerEvaluationSolution()
```

### Toma:
```json
{
  "studentId": "string", <// validar que exista
  "topicId": "string", <// validar que exista
  "newWeightedScore": "number",
  "date": "date",
}
```

Buscar el logro de tipo 1 (Topic) con topicId == req.topicId

```ts
achievement = getAchievementByTopicId(req.topicId)

Buscar el estado actual del logro del estudiante

studentAchievement = getStudentAchievementByStudentIdAndAchievementId(req.studentId, achievement.id)

newTier = getTierByWeightedScor(req.newWeightedScore)

if ((!studentAchievement && newTier) || newTier.id != studentAchievement.tierId) {
  newAchivement = updateStudentAchievement({
    "studentId": req.studentId,
    "achievementId": achievement.id,
    "date": new Date(),
    "currentProgress": newTier.newWeightedScore,
    "tierId": newTier.id,
  })

  return newAchivement
}
return null
```