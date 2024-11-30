import { Link } from 'expo-router';
import { View, Text } from 'react-native';
import { HomeIcon } from '../components/Icons';
import { UserData, fetchUsers } from '@/lib/firebase/examples';
import { useEffect, useState } from 'react';

export default function TesteoScreen() {

  const [alumnos, setAlumnos] = useState([] as UserData[]);

  useEffect(() => {
    (async () => {
      const alumnos = await fetchUsers();
      setAlumnos(alumnos);
    })();
  }, []);

  return (
    <View className='bg-orange-500'>
      <Text className='font-bold text-4xl'>Teteo</Text>
      <Link className='font-normal text-2xl text-white' href="/">
        <HomeIcon />Index
      </Link>
      <View className='bg-white p-4 rounded-lg shadow-lg'>
        <Text className='font-bold text-2xl'>Alumnos</Text>
        <View className='flex flex-col gap-2'>
          {alumnos.map((alumno) => (
            <View className='flex gap-2' key={alumno.id}>
              <Text className='font-bold'>{alumno.firstName} {alumno.lastName}</Text>
              <Text className='font-normal'>{alumno.email}</Text>
              <Text className='font-normal'>{alumno.birthDate.toUTCString()}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}