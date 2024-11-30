# Firebase Functions

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

<!-- * Nota importante -->
### Sobre la creación de logros por defecto

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