import { View, Text, FlatList, TextInput, Button, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { addCommunityPost, getCommunityPostById } from '@/lib/firebase/community';
import { CommunityPost, newCommunityPost } from '@/types/communityPost';
import { CommunityPostCard } from '@/components/CommunityPostCard';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/authStore';

const CommunityPostDetails = () => {
  const { communityPostId } = useLocalSearchParams();
  const router = useRouter();

  const [post, setPost] = useState<CommunityPost | null>(null);
  const [communityPostAnswerTitle, setCommunityPostAnswerTitle] = useState<string>('');
  const [communityPostAnswerContent, setCommunityPostAnswerContent] = useState<string>('');
  
  const { user } = useAuthStore();

  const fetchPost = async () => {
    const selectedPost = await getCommunityPostById(communityPostId as string);
    setPost(selectedPost || null);
  };
  
  useEffect(() => {
    fetchPost();
  }, [communityPostId]);

  const handleAddQuestion = async () => {
    if (!user) return;
    if (!post) return;
    if (!communityPostAnswerTitle || !communityPostAnswerContent) {
      alert('Please fill in the title and content of the answer');
      return;
    }

    await addCommunityPost({
      studentId: user!.id,
      title: communityPostAnswerTitle,
      content: communityPostAnswerContent,
      responseTo: post!.id,
    } as newCommunityPost);

    await fetchPost();
    
    setCommunityPostAnswerTitle('');
    setCommunityPostAnswerContent('');
  }

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

      <Text className="text-lg font-bold mb-2">Add a Question Title</Text>
      <TextInput
        value={communityPostAnswerTitle}
        onChangeText={setCommunityPostAnswerTitle}
        placeholder="Question Title"
        className="bg-white p-2 mb-4"
      />
      <Text className="text-lg font-bold mb-2">Add a Question Content</Text>
      <TextInput
        value={communityPostAnswerContent}
        onChangeText={setCommunityPostAnswerContent}
        placeholder="Question Content"
        className="bg-white p-2 mb-4"
      />
      <Button
        title="Add Question"
        onPress={handleAddQuestion}
      />
    </View>
  );
};

export default CommunityPostDetails;
