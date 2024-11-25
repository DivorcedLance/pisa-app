import { Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className='bg-red-500'>
        <Text className='font-bold text-4xl'>Not Found</Text>
      </View>
    </>
  );
}