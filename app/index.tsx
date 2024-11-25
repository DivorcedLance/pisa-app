import { Link } from 'expo-router';
import { View, Text } from 'react-native';
import { HomeIcon } from '../components/Icons';

export default function HomeScreen() {
  return (
    <View className='bg-green-400'>
      <Text className='font-bold text-4xl flex gap-7'>
        <HomeIcon />
        Index
      </Text>
      <Link className='font-normal text-2xl text-white'  href="/teteo">
        Teteo
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
    </View>
  );
}