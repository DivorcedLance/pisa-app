import { Link } from 'expo-router';
import { View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View className='bg-red-500'>
      <Text className='font-bold text-4xl'>Index</Text>
      <Link href="/teteo">Teteo</Link>
    </View>
  );
}