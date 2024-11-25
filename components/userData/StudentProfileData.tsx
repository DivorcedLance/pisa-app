import { Student } from "@/types/student";
import { Text } from "react-native";

export function StudentProfileData({ userData }: { userData: Student }) {
  return (
    <>
      <Text className='text-lg font-bold'>Grade: {userData.grade}</Text>
      <Text className='text-lg font-bold'>Section: {userData.section}</Text>
      <Text className='text-lg font-bold'>Points: {userData.points}</Text>
    </>
  )
}

