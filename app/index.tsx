import { Link } from 'expo-router';
import { View, Text } from 'react-native';
import { HomeIcon } from '@/components/Icons';

export default function HomeScreen() {
  return (
    <View className='flex gap-5'>
      <Text className='font-bold text-4xl flex gap-7'>
        <HomeIcon /> Index
      </Text>
      <View className='bg-green-400'>
        <Link className='font-normal text-2xl text-white'  href="/testeo">
          Testeo
        </Link>
        <Link className='font-normal text-2xl text-white'  href="/testeo2">
          Testeo2
        </Link>
        <Link className='font-normal text-2xl text-white'  href="./prep/login">
          Login
        </Link>
        <Link className='font-normal text-2xl text-white'  href="./prep/main">
          Main
        </Link>
        <Link className='font-normal text-2xl text-white'  href="./prep/register">
          Register
        </Link>
        <Link className='font-normal text-2xl text-white'  href="./prep/profile">
          Profile
        </Link>
        <Link className='font-normal text-2xl text-white'  href="./prep/assignedtutor">
          AssignedTutor
        </Link>
        <Link className='font-normal text-2xl text-white'  href="./prep/chatgtp">
          Virtual Asistant
        </Link>
      </View>
      <View className='bg-blue-400'>
        <Link className='font-normal text-2xl text-white'  href="./login/email">
          Login
        </Link>
        <Link className='font-normal text-2xl text-white'  href="./login/register">
          Register
        </Link>
        <Link className='font-normal text-2xl text-white'  href="./login/logout">
          Logout
        </Link>

      </View>
    </View>
  );
}