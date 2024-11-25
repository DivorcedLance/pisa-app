import { Link } from 'expo-router';
import { View, Text } from 'react-native';

export default function Teteo() {
  return (
    <View className='bg-red-500'>
      <Text className='font-bold text-4xl'>Teteo</Text>
      <Link href="/">Index</Link>
    </View>
  );
}