import { Link } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';
import { HomeIcon } from '@/components/Icons';

export default function HomeScreen() {
  const alumno = {
    nombre: "Esteban",
    apellido: "Garcia",
    codigo: "CA-1",
  };
  return (
    <View className="flex flex-1 bg-[#1B1E1A] justify-center items-center">
      <View className='w-full p-5 '>
        <View className='flex flex-row mt-5'>
          <Text className='text-white'>Hola, {alumno.nombre}!</Text>
        </View>
        <Text className='text-white'>¿Qué deseas aprender hoy?</Text>
      </View>
      <View className="flex flex-1 bg-[#1B1E1A] justify-center items-center">
        
      <Link asChild href={"/prep/[course]"}>
        <TouchableOpacity className="bg-[#D83131] py-4 mb-6 w-64 justify-center items-center rounded-xl h-20">
          <Text className='font-semibold text-xl'>Matemáticas</Text>
        </TouchableOpacity>
      </Link>

        <TouchableOpacity className="bg-[#BBC548] py-4 my-2.5 w-64 justify-center items-center rounded-xl h-20">
          <Text className='font-semibold text-xl'>Ciencias</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-[#0077A1] py-4 mt-6 w-64 justify-center items-center rounded-xl h-20">
          <Text className='font-semibold text-xl'>Lectura</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
}