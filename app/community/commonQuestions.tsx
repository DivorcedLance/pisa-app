import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { getCommonQuestions } from '@/lib/firebase/community';
import { CommonQuestion } from '@/types/commonQuestion';

type CommonQuestionProps = {
  question: string;
  answer: string;
};

const CommonQuestionCard = ({ question, answer }: CommonQuestionProps) => {
  return (
    <View className="mb-4 p-4 border rounded-md bg-white shadow-md">
      <Text className="font-bold text-lg mb-2">{question}</Text>
      <Text className="text-gray-700">{answer}</Text>
    </View>
  );
};

const CommonQuestionsScreen = () => {
  const [commonQuestion, setCommonQuestion] = React.useState<CommonQuestion[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getCommonQuestions();
      setCommonQuestion(data);
    };

    fetchData();
  }, []);

  return (
    <View className="flex-1 p-4 bg-gray-100">
      <Text className="text-2xl font-bold mb-4">Frequently Asked Questions</Text>
      <FlatList
        data={commonQuestion}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CommonQuestionCard question={item.question} answer={item.answer} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default CommonQuestionsScreen;
