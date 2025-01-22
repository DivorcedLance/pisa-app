import { View, Text, FlatList, TextInput, Button, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getCommunityPostById } from '@/lib/firebase/community';
import { CommunityPost } from '@/types/communityPost';
import { CommunityPostCard } from '@/components/CommunityPostCard';
import { useEffect, useState } from 'react';

const CommunityPostDetails = () => {
  const { communityPostId } = useLocalSearchParams();
  const router = useRouter();

  const [post, setPost] = useState<CommunityPost | null>(null);
  const [response, setResponse] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      const selectedPost = await getCommunityPostById(communityPostId as string);
      setPost(selectedPost || null);
    };

    fetchPost();
  }, [communityPostId]);

  const handleAddResponse = () => {
    if (!response.trim()) return;
    console.log('Add Response:', response);
    setResponse('');
  };

  if (!post) {
    return (
      <View className="flex-1 p-4 bg-[#1B1E1A] justify-center items-center">
        <Text className="text-white">Loading post...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-4 bg-[#1B1E1A]">
      {post.responseTo && (
        <TouchableOpacity
          onPress={() => router.push(`../communityPost/${post.responseTo}`)}
          className="mb-4 p-2 border rounded-md bg-gray-200"
        >
          <Text className="text-gray-600">View original post</Text>
        </TouchableOpacity>
      )}

      {/* <CommunityPostCard {...post} isDetail={true} isTouchable={false}/> */}
      <Text className="text-[#D8D8D8] text-sm font-bold mb-4">Preguntas de la Comunidad</Text>
      <Text className="text-white text-5xl font-bold mb-4">{post.title}</Text>
      <View className="flex flex-row items-center gap-5">
        <Image
          source={{ uri: post.student.profileImgLink }}
          style={{ width: 30, height: 30, borderRadius: 50 }}
        />
        <Text className="text-sm text-white">
          {post.student.firstName} {post.student.lastName}
        </Text>
        <Text className="text-sm text-white">Fecha: {post.date.toLocaleDateString()}</Text>
      </View>
      <Text className="text-white text-lg mt-4">{post.content}</Text>

      <Text className="text-white text-lg font-bold mb-2 mt-10">Respuestas ({post.answers?.length})</Text>
      <FlatList
        data={post.answers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CommunityPostCard {...item} isDetail={true} isTouchable={true} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <Text className="text-lg font-bold mb-2">Add a Response</Text>
      <TextInput
        className="border rounded-md p-2 bg-white mb-4"
        placeholder="Type your response here..."
        value={response}
        onChangeText={setResponse}
      />
      <Button title="Submit Response" onPress={handleAddResponse} />
    </View>
  );
};

export default CommunityPostDetails;
