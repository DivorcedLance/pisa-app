import { View, Button, Modal, Text, TextInput } from "react-native";

type ModalDisplayProps = {
    modalVisible: boolean;
    setModalVisible: (value: boolean) => void;
    newCommunityPostTitle: string;
    setNewCommunityPostTitle: (value: string) => void;
    newCommunityPostContent: string;
    setNewCommunityPostContent: (value: string) => void;
    handleAddQuestion: () => void;
}

export const ModalDisplay = ({ modalVisible, setModalVisible, newCommunityPostTitle, setNewCommunityPostTitle, newCommunityPostContent, setNewCommunityPostContent, handleAddQuestion }: ModalDisplayProps) => {
    return (
        <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          setNewCommunityPostContent('');
          setNewCommunityPostTitle('');
        }}
      >
        <View className='flex-1 justify-end items-center p-5' style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View className='bg-white rounded-2xl px-7 py-5 w-full' 
          style={{ 
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5 
            }}>
            <Text className="text-lg font-bold mb-2">Título de la pregunta</Text>
            <TextInput
              value={newCommunityPostTitle}
              onChangeText={setNewCommunityPostTitle}
              placeholder="Escribe el título"
              className="bg-[#E2E2E2] p-2 mb-4 rounded-xl"
            />
            <Text className="text-lg font-bold mb-2">Contenido de la pregunta</Text>
            <TextInput
              value={newCommunityPostContent}
              onChangeText={setNewCommunityPostContent}
              placeholder="Escribe tu pregunta"
              className="bg-[#E2E2E2] p-2 mb-4 rounded-xl"
            />
            <Button
              title="Agregar pregunta"
              onPress={handleAddQuestion}
            />
          </View>
        </View>
      </Modal>
    )
}