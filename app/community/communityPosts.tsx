import { View, Text, FlatList, TextInput, Button } from 'react-native';
import { addCommunityPost, getCommunityPosts } from '@/lib/firebase/community';
import { CommunityPost, newCommunityPost } from '@/types/communityPost';
import { CommunityPostCard } from '@/components/CommunityPostCard';
import { useEffect, useState } from 'react'
import { useAuthStore } from '@/stores/authStore';

const CommunityPostsScreen = () => {
  const [posts, setPosts] = useState<CommunityPost[]>([]);

  const [newCommunityPostTitle, setNewCommunityPostTitle] = useState<string>('');
  const [newCommunityPostContent, setNewCommunityPostContent] = useState<string>('');

  const { user } = useAuthStore();

  const fetchData = async () => {
    const data = await getCommunityPosts();
    setPosts(data.filter((post) => post.responseTo === null));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddQuestion = async () => {
    if (!user) return;
    if (!newCommunityPostTitle || !newCommunityPostContent) {
      alert('Please fill in the title and content of the question');
      return;
    }

    await addCommunityPost({
      studentId: user!.id,
      title: newCommunityPostTitle,
      content: newCommunityPostContent,
      responseTo: null,
    } as newCommunityPost);

    await fetchData();
    
    setNewCommunityPostTitle('');
    setNewCommunityPostContent('');
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

      <Text className="text-lg font-bold mb-2">Add a Question Title</Text>
      <TextInput
        value={newCommunityPostTitle}
        onChangeText={setNewCommunityPostTitle}
        placeholder="Question Title"
        className="bg-white p-2 mb-4"
      />
      <Text className="text-lg font-bold mb-2">Add a Question Content</Text>
      <TextInput
        value={newCommunityPostContent}
        onChangeText={setNewCommunityPostContent}
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

export default CommunityPostsScreen;
