import { Link } from 'expo-router';
import { View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View className='bg-green-400'>
      <Text className='font-bold text-4xl'>Index</Text>
      <Link className='font-normal text-2xl text-white'  href="/teteo">Teteo</Link>
    </View>
  );
}