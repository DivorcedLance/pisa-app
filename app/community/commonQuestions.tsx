import { useState, useEffect } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { getCommonQuestions } from '@/lib/firebase/community';
import { CommonQuestion } from '@/types/commonQuestion';
import { RightArrowIcon } from '@/components/Icons';

type CommonQuestionProps = {
  id: string;
  question: string;
  answer: string
};

const CommonQuestionCard = ({ id, question, answer }: CommonQuestionProps) => {
  const router = useRouter();
  return (
    <View className="flex flex-row mb-4 p-4 border rounded-xl bg-[#535353] shadow-md">
      <View className='flex-1 flex-col'>
        <Text className="text-white font-bold text-lg mb-2">{question}</Text>
        <Text className="text-[#B1B1B1]">{answer}</Text>
      </View>
      {/* falta funcion */}
      <Pressable onPress={() => {
        router.push(`../../../community/commonQuestion/${id}`);
      }} className="flex flex-row items-center justify-end">
        <RightArrowIcon />
      </Pressable>
    </View>
  );
};

const CommonQuestionsScreen = () => {
  const [commonQuestions, setCommonQuestions] = useState<CommonQuestion[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCommonQuestions();
      setCommonQuestions(data);
    };

    fetchData();
  }, []);

  return (
    <View className="flex-1 p-4 bg-[#1B1E1A]">
      <Text className="text-2xl text-white font-bold mb-4">Preguntas Frecuentes</Text>
      <FlatList
        data={commonQuestions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CommonQuestionCard id={item.id} question={item.question} answer={item.answer} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default CommonQuestionsScreen;
