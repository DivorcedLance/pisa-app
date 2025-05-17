import { View, Text, FlatList, TextInput, Button, Modal, Pressable } from 'react-native';
import { addCommunityPost, getCommunityPosts } from '@/lib/firebase/community';
import { CommunityPost, newCommunityPost } from '@/types/communityPost';
import { CommunityPostCard } from '@/components/CommunityPostCard';
import { useEffect, useState } from 'react'
import { useAuthStore } from '@/stores/authStore';
import { ModalDisplay } from '@/components/ModalDisplay';
import { Stack } from 'expo-router';

const CommunityPostsScreen = () => {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [newCommunityPostTitle, setNewCommunityPostTitle] = useState<string>('');
  const [newCommunityPostContent, setNewCommunityPostContent] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);

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

  const handleOpenModal = () => {
    setModalVisible(true);
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Comunidad',
          headerTitleStyle: { fontSize: 18 } // Estilos personalizados
        }}
      />
      <View className="flex-1">
        {/* modal */}
        <ModalDisplay modalVisible={modalVisible} setModalVisible={setModalVisible} setNewCommunityPostContent={setNewCommunityPostContent} setNewCommunityPostTitle={setNewCommunityPostTitle} handleAddQuestion={handleAddQuestion} newCommunityPostContent={newCommunityPostContent} newCommunityPostTitle={newCommunityPostTitle} />

        <View className="flex-1 p-4 bg-[#1B1E1A]">
          <Text className="text-white text-2xl font-bold mb-4">Preguntas de la Comunidad</Text>
          <View className='mb-4'>
            {/* boton para abrir modal */}
            <Button
              title="Hacer pregunta"
              onPress={handleOpenModal}
            />

          </View>
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
          <View className="flex justify-end">
            <Text className="text-gray-600 text-sm font-bold">©PISApp Copyright 2023</Text>
          </View>
        </View>

      </View>
    </>

  );
};

export default CommunityPostsScreen;
