import React from 'react';
import { View, Text, FlatList, TextInput, Button, TouchableOpacity } from 'react-native';
import { useLocalSearchParams , useRouter } from 'expo-router';
import { getCommunityPosts } from '@/lib/firebase/community';
import { CommunityPost } from '@/types/communityPost';
import { CommunityPostCard } from '@/components/CommunityPostCard';

const CommunityPostDetails = () => {
  const { communityPostId } = useLocalSearchParams();
  const router = useRouter();

  const [post, setPost] = React.useState<CommunityPost | null>(null);
  const [response, setResponse] = React.useState('');

  React.useEffect(() => {
    const fetchPost = async () => {
      const data = await getCommunityPosts();
      const selectedPost = data.find((p) => p.id === communityPostId);
      setPost(selectedPost || null);
    };

    fetchPost();
  }, [communityPostId]);

  const handleAddResponse = () => {
    if (!response.trim()) return;
    console.log('Add Response:', response); // Replace with actual response submission logic
    setResponse('');
  };

  if (!post) {
    return (
      <View className="flex-1 p-4 bg-gray-100 justify-center items-center">
        <Text className="text-gray-500">Loading post...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-4 bg-gray-100">
      {post.responseTo && (
        <TouchableOpacity
          onPress={() => router.push(`../communityPost/${post.responseTo}`)}
          className="mb-4 p-2 border rounded-md bg-gray-200"
        >
          <Text className="text-gray-600">View original post</Text>
        </TouchableOpacity>
      )}

      <CommunityPostCard {...post} isDetail={true} isTouchable={false}/>

      <Text className="text-lg font-bold mb-2">Answers</Text>
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
