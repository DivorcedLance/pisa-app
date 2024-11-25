import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import useAuthStore from '@/stores/authStore';
import { User } from '@/types/user';
import { UserProfileData } from '@/components/userData/UserProfileData';

export default function MainScreen() {

  const { userData } : { userData: User | null } = useAuthStore();

  if (!userData) {
    router.push('/login/email');
    return null;
  }

  return (
    <View>
      <UserProfileData userData={userData} />
      <Pressable onPress={() => router.push('/community/commonQuestions')}>
        <View>
          <Text>Preguntas frecuentes</Text>
        </View>
      </Pressable>
      <Pressable onPress={() => router.push('/community/communityPosts')}>
        <View>
          <Text>Posts</Text>
        </View>
      </Pressable>
    </View>
  );
}