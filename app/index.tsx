import { Link, useFocusEffect, useRouter } from 'expo-router';
import { View, Text, ActivityIndicator } from 'react-native';
import { HomeIcon } from '@/components/Icons';
import { useCallback, useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';

export default function HomeScreen() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();

  useFocusEffect(
    useCallback(() => {
      if (!isLoading && user) {
        router.replace('/main');
      } else {
        router.replace('/login/email');
      }
    }, [user, isLoading])
  );

  // Muestra un loader mientras redirige
  return (
    <View className="flex-1 justify-center items-center bg-[#1B1E1A]">
      <ActivityIndicator size="large" color="#E8B21A" />
    </View>
  );
}