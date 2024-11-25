import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

type CommunityPostProps = {
  id: string;
  title: string;
  content: string;
  date: string;
  student: {
    firstName: string;
    lastName: string;
    profilePictureLink: string;
  };
  isDetail: boolean;
  isTouchable: boolean;
};

export const CommunityPostCard = ({ id, title, content, date, student, isDetail, isTouchable = true }: CommunityPostProps) => {
  const router = useRouter();

  const PostCardContent = (
    <View className={`mb-4 p-4 bg-white ${isTouchable ? "border rounded-md shadow-md" : ""}`}>
      <Text className="font-bold text-lg mb-1">{title}</Text>
      <View className="flex flex-row items-center gap-5">
        <Image
          source={{ uri: student.profilePictureLink }}
          style={{ width: 30, height: 30, borderRadius: 50 }}
        />
        <Text className="text-sm text-gray-500">
          {student.firstName} {student.lastName}
        </Text>
        <Text className="text-sm text-gray-500">{new Date(date).toLocaleDateString()}</Text>
      </View>
      <Text className="text-gray-700 mt-2">{content}</Text>
    </View>
  );

  return isTouchable ? (
    <TouchableOpacity
      onPress={() => {
        router.push(isDetail ? `../../../community/communityPost/${id}` : `../../community/communityPost/${id}`);
      }}
    >
      {PostCardContent}
    </TouchableOpacity>
  ) : (
    PostCardContent
  );
};