# Main
## MainScreen
Redirige a los screens correspondientes EmailScreen y Registro[tipo]Screen
### Front
#### Front pide a la api
Nada
#### Front envia a la api
Nada

# Login
## EmailScreen
### Front
#### Front pide a la api
Nada
#### Front envia a la api

#### Respuesta de la API


### API
#### Api pide a firebase getStudentByEmail
Pide ese student que tenga ese [email]
#### Firebase devuelve a api (caso bueno)
```json
{
    studentId: String,
    name: String,
    lastname: String,
    email:String,
    phone:number,
    birthday: Date,
    password: String,
    tutorId: String,
    classroom: String,
    achievments: Achievement[],
    points: number,
    level: String,
};
```
#### API guarda email y userData en authStore (ya sabes que me refiero a los metodos de firebase)

## PasswordScreen
### Front
#### Front pide el email y login() del authStore
### login() de authStore
verifica que el password del input

#### Respuesta del Front
Si la contraseña es correcta, redirige a HomeScreen.
Si es incorrecta, muestra un mensaje de error como: "Contraseña incorrecta." y borra toda data de authStore


# Registro
## RegisterStudentScreen
### Front
#### Front pide a la api
Nada, despues de registrar devolver al MainScreen

#### Front envia a la api
```json
{
    nombre:String,
    apellido: String,
    correo:String,
    telefono:number,
    fechaNacimiento: Date,
    contraseña: String,
  };
```
### API
#### API envia a firebase registerStudent()
```json
{
    name:String,
    lastname: String,
    email:String,
    phone:number,
    birthday: Date,
    password: String,
  };
```



## RegisterTutorScreen
### Front
#### Front pide a la api
Nada, despues de registrar devolver al MainScreen

#### Front envia a la api
```json
{
    nombre:String,
    apellido: String,
    correo:String,
    telefono:number,
    contraseña: String,
  };
```
### API
#### API envia a firebase registerTutor()
```json
{
    name:String,
    lastname: String,
    email:String,
    phone:number,
    password: String,
  };
```


# Perfil (alumno)
## PerfilScreen
se muestra la data necesaria del userData de authStore
```json
{
    name:String,
    lastname: String,
    email:String,
    phone:number,
    birthday: Date,
    grade: String, //SACADO DEL CLASSROOMID QUE TIENE
    seccion: String, // sacado del classroomId que tiene
    achievments: Achievement[],
    points: number, //ponderado
    level: String
};
```
### Editar
#### Front
- Envia a la api
```json
{
    nombre:String,
    apellido: String,
    email:String,
    telefono:number,
    imgBase64: string,
  };
```
#### API
- Convierte el `imgBase64` a un `linkImg`
- Envia a firebase actualizar doc `updateStudent` 
```json
{
    name:String,
    lastname: String,
    email:String,
    phone:number,
    linkImg: string,
};
```
- Firebase devuelve
```json
{
    name:String,
    lastname: String,
    email:String,
    phone:number,
    linkImg: string,
};
```
- API reemplaza esto en los campos correspondientes de userData de authStore

## AssignedTutorScreen
<!-- ### Front pide tutorId del userData del authStore
con el tutorId pide el tutor a la api -->
creo que es mejor si un `tutor` es pasado como parametro, para no estar haciendo la consulta dentro del screen, sino defrente ya colocar los datos, se estaría haciendo esa consulta en PerfilScreen

### API
Pide el tutor a firebase
`getTutorByTutorId`
```json
{
    code: String,
    name: String,
    lastname: String,
    email: String,
    position: String,
    grade: String, //SACADO DEL CLASSROOMID
    seccion: String, //SACADO DEL CLASSROOMID
    phone: number,
    birthday: Date
}
```
# Home
## HomeScreen
### Front
Se le pide al authStore el nombre del userData
Al presionar el boton del curso, pasa el nombre del curso al ContentScreen

#### Front pide a la api
Nada
#### Front envia a la api
Nada

### API
no hace nada

## ContentScreen
### Front
Tiene opciones dependiendo de la opcion que pulsó previamente.
Agarra el parametro obtenido y lo usa para pedir los temas del curso.
#### Front pide a la api
pide los temas del curso
#### Front envia a la api
envia el nombre del curso
#### Front pasa el tema seleccionado a TypeContentScreen

### API
#### Api pide a firebase los temas 
getTopicsByCourseName

```json
{
    color: String,
    evaluation: {
      "basic": String,
      "intermediate": String,
      "advanced": String,
    }
    multimediaContent:{
      descripcion: String,
      videoUrl: String
    },
    title: String
}[]
```

## TypeContentScreen
### Front
Obtiene el parametro `tema`.
Tiene dos opciones: (pasa el `tema` a los dos screens)

- Contenido multimedia
## MultimediaContentScreen
Obtiene el parametro `tema`
Agarra el atributo multimediaContent para la interfaz.
#### Front pide a la api 
Pide la evaluacion correspondiente al nivel que tiene el student a la api
Osea primero del userData del authStore saca el level del student y con eso saca el id de la evaluacion correspondiente y ese id lo pasa a la api
#### Front envia a EvaluationScreen
Envia la `evaluacion` como parametro

### API
#### Api pide a firebase la evaluacion pedida
getEvaluationById

```json
{
  questions: Question[]
}
```

- Ejercicios
## EvaluationScreen
### FRONT
Obtiene el parametro `evaluacion`
#### Front pide a la api
Pide las preguntas del questionIds a la api
#### Front envia a SolutionScreen
Envia el atributo solution como parametro

### API
#### Api pide a firebase las preguntas
getQuestionsById

```json
{
  correctAnswer: number,
  options: String[],
  questionImg: String,
  score: number,
  solution: String,
  statement: String
}
```

# Comunity
## FrequentPostScreen
### FRONT
pide los posts de tipo common
{
    title: string;
    content: string;
}
### FRONT PASA `post` como parametro a PostScreen

### API
getPostsByType
devuelve
{
    id: string;
    title: string;
    content: string;
    type: string
}

## ComunityPostScreen
### FRONT
pide los posts de tipo community
{
    title: string;
    content: string;
    date: string;
    student: Student;
    answers: CommunityPost[];
    responseTo: string | null;
    type: string
}
### API
getPostsByType
{
    id: string;
    title: string;
    content: string;
    date: string;
    student: Student;
    answers: CommunityPost[];
    responseTo: string | null;
    type: string
}

getPostById(postId)

## PostScreen
### FRONT
toma el `post` de parametro
muestra el contenido, dependiendo si fue un post de tipo common o community

### API


## CreatePostScreen
tanto para crear un post como la respuesta
### FRONT
#### front pide
nada
### community
#### front envia
front envia a la api

{
    title: string;
    content: string;
    date: string;
    student: Student;
    type: string
}

#### api envia
createPost(postData)
{
    title: string;
    content: string;
    date: string;
    student: Student; //seria string para solo guardar el id, pero no sé cómo lo quieres manejar
    answers: []
    responseTo: null;
    type: string
}

### dando una respuesta
#### front envia
front envia a la api

{
    title: string;
    content: string;
    date: string;
    student: Student; //el id
    type: string;
    responseTo: postId; //string
}

#### api envia
createPost(postData)
{
    title: string;
    content: string;
    date: string;
    student: id //string
    answers: []
    responseTo: postId; //string
    type: string
}

but al crear el post, actualiza el campo de answers del postId referido en responseTo

# Virtual Asistant Chat Bot
## ChatBotScreen


## EN CUANTO A LOS STORES, CREO QUE IDENTIFIQUÉ DOS

courseStore:
Gestionaría todo lo relacionado con los cursos y contenidos.
Se encargaría de:
Almacenar la lista de cursos y temas obtenidos de la API.
Manejar las evaluaciones según el nivel del estudiante.

{
  courses: Course[],
  selectedCourse: Course | null,
  topics: Topic[],
  selectedTopic: Topic | null,
  evaluation: Evaluation | null,
}

y el uiStore, para las pantallas de cargando y mostrar notificaciones