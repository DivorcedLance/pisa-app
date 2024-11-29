import { Link } from 'expo-router';
import { View, Text, Pressable, FlatList, TouchableOpacity } from 'react-native';
import { HomeIcon } from '@/components/Icons';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';

const renderCurso = ({ item, course}: { item: any, course: String}) => (
    <TouchableOpacity className={`w-36 h-16 my-2 mx-4 items-center justify-center rounded-lg ${
        course === 'Math'
          ? 'bg-[#D83131]'
          : course === 'Science'
          ? 'bg-[#BBC548]'
          : 'bg-[#0077A1]'
      }`} >
        <Text className="text-white text-lg">{item.nombre_corto_tema}</Text>
    </TouchableOpacity>
);

export default function TopicsScreen() {
    const { course } = useLocalSearchParams();
    const courses = [
        { id: 1, course: 'Math', name: 'Matemáticas' },
        { id: 2, course: 'Science', name: 'Ciencias' },
        { id: 3, course: 'Lect', name: 'Lectura' },
    ];
    const topics = [
        { id: 1, course:'Math', nombre_corto_tema: 'Álgebra' },
        { id: 2, course:'Math', nombre_corto_tema: 'Geometría' },
        { id: 3, course:'Science', nombre_corto_tema: 'Biología' },
        { id: 4, course:'Science', nombre_corto_tema: 'Física' },
        { id: 5, course:'Lect', nombre_corto_tema: 'Literatura' },
        { id: 6, course:'Lect', nombre_corto_tema: 'Historia' },
      ];
  return (
    <View className="flex-1 bg-backgroundPrimary">
      {/* Volver Button */}
      <Pressable className="w-full justify-center items-start p-4 mt-4">
        <Ionicons/>
      </Pressable>

      {/* Título */}
      <View className="mt-4 ml-5 mb-4">
        <Text>
          ¿Qué quieres aprender? {course}
        </Text>
        <Text>
          Elige una opción...
        </Text>
      </View>

      {/* Lista de Cursos */}
      {/* <FlatList
        data={topics}
        renderItem={({ item }) => renderCurso(item, 'Math')}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle="items-center"
      /> */}
    </View>
  );
}