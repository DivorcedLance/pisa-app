import { User } from "@/types/user";
import { View, Text, Image } from "react-native";
import { Student } from "@/types/student";
import { Teacher } from "@/types/teacher";
import { StudentProfileData } from "./StudentProfileData";
import { TeacherProfileData } from "./TeacherProfileData";

export function UserProfileData({ userData }: { userData: User }) {
  return (
    <View className='flex gap-7'>
      <Text className='font-bold text-4xl'>
        Bienvenido, {userData.firstName} {userData.lastName}
      </Text>
      <Text className='font-normal text-2xl'>
        Email: {userData.email}
      </Text>
      <Image source={{ uri: userData.profilePictureLink }} style={{ width: 200, height: 200 }} />
      
      {userData.type === 'student' ? (
        <StudentProfileData userData={userData as Student} />
      ) : userData.type === 'teacher' ? (
        <TeacherProfileData userData={userData as Teacher} />
      ) : null}
      
    </View>
  )
}

