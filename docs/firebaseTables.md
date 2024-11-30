# User
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
  "type": "student" | "teacher",
  "rolData": Student | Teacher
}

Student
{
  "sectionId": "string",
}

Teacher
{
  "sectionIds": "string[]",
}
```

# Section
```json
{
  "id": "string", //PK
  "code": "string",
  "teacherId": "string",
  "studentsIds": "string[]",
}
```

# Achievement
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

# StudentAchievement
```json
{
  "id": "string", //PK // Not Used
  "studentId": "string",
  "achievementId": "string",
  "date": "date",
  "currentProgress": "number",
  "tierId": "string",
}
```

# Tier
```json
{
  "id": "string", //PK
  "name": "string",
  "spriteImgLink": "string",
  // mutable
}
```


# Course
```json
{
  "name": "string", //PK
  "color": "string",
  "topicIds": "string[]",
}
```

# Topic
```json
{
  "id": "string", //PK
  "name": "string",
  "index": "number",
  "multimediaContent": MultimediaContent,
  "evaluationIds": "string[]",
}
MultimediaContent
{
  "videoLink": "string",
  "imageLink": "string",
  "description": "string",
}
```

# Evaluation
```json
{
  "id": "string", //PK
  "level": "Level",
  "totalScore": "number",
  "questionIds": "string[]",
}

Level
{
  "name": "string",
  "index": "number",
}
```

# Question
```json
{
  "id": "string", //PK
  "statement": "string",
  "questionImgLink": "string",
  "options": "string[]",
  "correctOptionIndex": "number",
  "score": "number",
  "solution": "string",
}
```

# StudentEvaluation
```json
{
  "id": "string", //PK  //Not Used
  "studentId": "string",
  "evaluationId": "string",

  "currentScore": "number",
  "weightedScore": "number",
  "date": "date",

  "selectedOptionIndexs": "number[]",
}
```

# StudentTopic
```json
{
  "id": "string", //PK  //Not Used
  "studentId": "string",
  "topicId": "string",
  "weightedScore": "number",
  "weightedScores": "number[]", // for each evaluation in the evaluation.level.index
}
```

# Sobre el type date

```js
Date()
```

## firebase
verificar si firebase soporta el Date nativo de js

sino usar un string ISO