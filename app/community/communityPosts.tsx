import { View, Text, FlatList, TextInput, Button } from 'react-native';
import { getCommunityPosts } from '@/lib/firebase/community';
import { CommunityPost } from '@/types/communityPost';
import { CommunityPostCard } from '@/components/CommunityPostCard';
import { useEffect, useState } from 'react';

const CommunityPostsScreen = () => {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [newQuestion, setNewQuestion] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCommunityPosts();
      setPosts(data.filter((post) => post.responseTo === null));
    };

    fetchData();
  }, []);

  const handleAddQuestion = () => {
    if (!newQuestion.trim()) return;
    console.log('Add Question:', newQuestion);
    setNewQuestion('');
  }

  return (
    <View className="flex-1 p-4 bg-gray-100">
      <Text className="text-2xl font-bold mb-4">Community Posts</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CommunityPostCard
            id={item.id}
            title={item.title}
            content={item.content}
            date={item.date}
            student={item.student!}
            isDetail={false}
            isTouchable={true}
          />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <Text className="text-lg font-bold mb-2">Add a Question</Text>
      <TextInput
        className="border rounded-md p-2 bg-white mb-4"
        placeholder="Type your question here..."
        value={newQuestion}
        onChangeText={setNewQuestion}
      />
      <Button title="Submit Question" onPress={handleAddQuestion} />
    </View>
  );
};

export default CommunityPostsScreen;
