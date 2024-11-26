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
Cuando el usuario ingrese su correo y presione el botón "Continuar", el frontend enviará una solicitud a la API para verificar si el correo existe.
```json
{
    email: String
}
```
#### Respuesta de la API
Si la API confirma que el correo existe, el frontend redirige a PasswordScreen con el correo validado.
Si no existe, muestra un mensaje de error como: "El correo no está registrado."

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
    classroom: String,
    achievments: Achievement[]
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
    classroom: String,
    achievments: Achievement[]
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
### Front pide studentId del authStore
- Envia studentId a la api

### API
Pide el tutor a firebase
`getTutorByStudentId`
```json
{
    idTutor?: String,
    codigo: String,
    correoInstitucional: String,
    cargo: String,
    aula: String,
    telefono: number,
    fechaNacimiento: Date
}
```
# Home
## HomeScreen
### Front
Se le pide al authStore el nombre del userData
Al presionar el boton del curso, se envia el nombre a la pagina ContentScreen
para que muestre las opciones correspondientes
#### Front pide a la api
Nada
#### Front envia a la api
Nada

### API
no hace nada

## ContentScreen
### Front
Tiene opciones dependiendo de la opcion que pulsó previamente

### API

