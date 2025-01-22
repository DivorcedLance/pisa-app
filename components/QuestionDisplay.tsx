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
    <View className="p-4 rounded-md">
      <Text className="text-white text-lg font-bold mb-2">{question.statement}</Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginHorizontal: -5,
        }}
      >
        {question.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onSelectOption(index)}
            style={{
              padding: 10,
              backgroundColor: selectedOptionIndex === index ? "#595D5B" : "#FFFF",
              borderRadius: 5,
              marginBottom: 10,
              marginHorizontal: 5,
              width: "47%",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "black", fontWeight: "bold" }}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

    </View>
  );
};


