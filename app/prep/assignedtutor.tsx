import { Link } from 'expo-router';
import { View, Text, Image } from 'react-native';
import { HomeIcon } from '@/components/Icons';

export default function AssignedTutorScreen() {
    const tutor = {
        codigo: "CT-1",
        nombre: "Unayoe",
        apellido: "Vasquez",
        correoInstitucional: "unayoe@gmail.com",
        cargo: "Docente",
        aula: "1",
        telefono: 991223553,
        fechaNacimiento: "12/12/1990",
        profileLinkImg: "https://i.pinimg.com/736x/d9/8c/ac/d98cacb488d9246c5f8eba80221c2b42.jpg",
    }

    return (
        <View className="px-8 pt-10 bg-backgroundPrimary flex-1 justify-center">
            <Image source={{ uri: tutor.profileLinkImg }} className="h-[200px] w-[200px] mb-7 self-center rounded-2xl" />
          <Text className='text-[32px] font-bold text-center'>
            Nombre del Docente {'\n'}
            {tutor.nombre} {tutor.apellido}
          </Text>
          <View>
            <Text className='text-center color-[#b2b2b2]'>
                {tutor.codigo} - {tutor.cargo}
            </Text>
            <Text className='text-center color-[#b2b2b2]'>
              {tutor.correoInstitucional}
            </Text>
            <Text className='text-center text-3xl font-bold'>
                Aula Asignada
            </Text>
            <Text className='text-center text-7xl'>
                {tutor.aula}
            </Text>
            <Text>
              Teléfono: {tutor.telefono}
            </Text>
            <Text>
              Fecha de Nacimiento: {tutor.fechaNacimiento}
            </Text>
          </View>
        </View>
      );
}