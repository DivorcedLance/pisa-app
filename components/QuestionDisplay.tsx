import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Question } from "@/lib/firebase/evaluation";

type QuestionDisplayProps = {
  question: Question;
  selectedOptionIndex?: number;
  onSelectOption: (index: number) => void;
};

export const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  question,
  selectedOptionIndex,
  onSelectOption,
}) => {
  return (
    <View className="bg-[#262A28] p-4 rounded-md">
      <Text className="text-white text-lg font-bold mb-2">{question.statement}</Text>

      {/* Opciones */}
      {question.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onSelectOption(index)}
          style={{
            padding: 10,
            backgroundColor: selectedOptionIndex === index ? "#595D5B" : "#262A28",
            borderRadius: 5,
            marginBottom: 5,
          }}
        >
          <Text className="text-white">{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};


