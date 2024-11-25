import { Link } from 'expo-router';
import { View, Text } from 'react-native';
import { HomeIcon } from '../components/Icons';

export default function TeteoScreen() {
  return (
    <View className='bg-orange-500'>
      <Text className='font-bold text-4xl'>Teteo</Text>
      <Link className='font-normal text-2xl text-white' href="/">
        <HomeIcon /> Index
      </Link>
    </View>
  );
}