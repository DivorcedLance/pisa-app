# Login
Boton siguiente redirige a pagina Password, pasando el email: string

# Password
Front envía un
{
    email: String,
    password: String
}
para validar.


# Registro
Front envia un Alumno
{
    codigo: String,
    nombre:String,
    fechaNacimiento:String,
    sexo:String,
    correoInstitucional:String,
    telefono:String,
    password:String,
    confirmarContrasena:String,
    aceptaTerminos: boolean
  };
para registrar

# Perfil (alumno)
el front envía un idAlumno: String

se le envía al front un Alumno
{
    idAlumno?: String,
    profileLinkImg: String,
    nombre: String,
    codigo: String,
    puntos: number,
    logros: Logro[] //a mi parecer
    idTutor: String
}

### AssignedTutorView
el front envía un idTutor: String

se le envía al front un Tutor
{
    idTutor?: String,
    codigo: String,
    correoInstitucional: String,
    cargo: String,
    aula: String,
    telefono: number,
    fechaNacimiento: Date
}

### Editar
el front envia un idAlumno: String

se le devuelve un alumno: Alumno


# Home

no sé cómo funciona el Expo AuthSession,
estoy asumiendo que es casi parecido a useSession() de nextjs,
porque hay partes que solo piden cosas pequeñas como el nombre 
del alumno, solucionable con una session

se le pasa como parametro
{
    topic: String
}
a cada boton, topic puede ser Math, Science, Lect