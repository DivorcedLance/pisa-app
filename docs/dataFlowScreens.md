# Login - Password Screen

Valida las credenciales del usuario y lo redirige a [HomeScreen].

## API

### `POST /login`

#### Request

```json
{
  "email": "string",
  "password": "string"
}
```

#### Response

```json
{
  "token": "string"
}
```

### `POST /login/refresh`

#### Request

```json
{
  "token": "string"
}
```

#### Response

```json
{
  "token": "string"
}
```

# HomeScreen

Pantalla principal de la aplicación.

## API

### `GET /user` (For StudentProfileScreen)

#### Response

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

### `PUT /user` (For StudentProfileScreen)

<!-- TODO -->
Para actualizar la información del usuario.

### `GET /course` (For CoursesScreen)

#### Request

```json
{
  "token": "string"
}
```

#### Response

```json
Course[]
{
  "name": "string",
  "color": "string",
}
```

### `GET /achivement` (For AchivementScreen)

Devuelve todos los achivements, permite organizarlos por course, topic o level.
Además muestra el progreso del usuario en cada achivement.

#### Response

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

**Nota**: El front va a tomar de la info del perfil para el progreso individual del usuario.

### `GET /commonQuestion/` (For CommonQuestionsScreen)
### `GET /commonQuestion/[commonQuestionId]` (For CommonQuestionsScreen)
<!-- TODO -->
Para obtener las preguntas frecuentes.

### `GET /communityPost/` (For CommunityPostsScreen)
### `GET /communityPost/[communityPostId]` (For CommunityPostsScreen)
<!-- TODO -->
Para obtener los posts de la comunidad.

### `POST /communityPost/` (For CommunityPostsScreen)
<!-- TODO -->
Para crear un post en la comunidad.
También se usa para comentar un post.

# CourseScreen

### `GET /course/[courseId]`
Para obtener la información de un curso, sobretodo sus topics.

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

# TopicScreen

### `GET /course/[courseId]/topic/[topicId]` (For MultimediaContentScreen and ExercisesScreen)

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

### `GET /course/[courseId]/topic/[topicId]/evaluationId` (For ExerciseScreen)

#### Response

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

### `POST /course/[courseId]/topic/[topicId]/evaluationId` (For ExerciseScreen)

#### Request

```json
{
  "token": "string",
  
  "selectedOptionIndexs": "number[]",
  "currentScore": "number",
  "date": "date",
}
```

// Update scores: 
  // StudentEvaluation.weightedScore
  // StudentTopic.weightedScore
  // StudentTopic.weightedScores

<!-- *Handle Achievements -->
// Handle Achievements

#### Response

// Responds with the new achivements that the user has unlocked.

```json
{
  "newAchivements": StudentAchievement[] | null,
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

