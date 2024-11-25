import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { getCommunityPosts } from '@/lib/firebase/community';
import { CommunityPost } from '@/types/communityPost';
import { CommunityPostCard } from '@/components/CommunityPostCard';

const CommunityPostsScreen = () => {
  const [posts, setPosts] = React.useState<CommunityPost[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getCommunityPosts();
      setPosts(data.filter((post) => post.responseTo === null));
    };

    fetchData();
  }, []);

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
            student={item.student}
            isDetail={false}
            isTouchable={true}
          />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default CommunityPostsScreen;
