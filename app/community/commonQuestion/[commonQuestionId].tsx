import React from 'react';
import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getCommonQuestionById } from '@/lib/firebase/community';
import { CommonQuestion } from '@/types/commonQuestion';

type CommonQuestionProps = {
    question: string;
    answer: string;
};



const CommonQuestionScreen = () => {
    const { commonQuestionId } = useLocalSearchParams();

    const [commonQuestion, setCommonQuestion] = React.useState<CommonQuestion[]>([]);

    React.useEffect(() => {
        const fetchData = async () => {
            const data = await getCommonQuestionById(commonQuestionId);
            setCommonQuestion(data);
        };

        fetchData();
    }, []);

    return (
        <View className="flex-1 p-4 bg-[#1B1E1A]">
            <Text className="text-2xl text-white font-bold mb-4">{commonQuestion.question}</Text>
            <Text className="text-base text-white mb-4">{commonQuestion.answer}</Text>
            <View className="flex-1 justify-end">
                <Text className="text-gray-600 text-sm font-bold mt-16">©PISApp Copyright 2023</Text>
            </View>
        </View>
    );
};

export default CommonQuestionScreen