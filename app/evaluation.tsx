import { View, Text, Pressable, Image } from "react-native";
import { useCourseStore } from "@/stores/courseStore";
import { router } from "expo-router";
import { useEffect } from "react";

export default function EvaluationScreen() {
  const { selectedCourse, selectedTopic } = useCourseStore();

  useEffect(() => {
    console.log("evaluations", selectedTopic?.evaluations);
  }, [selectedTopic]);

  return (
    <View className="flex-1 bg-[#1B1E1A] p-6">
      <Text
        className="text-white text-3xl font-bold mb-6"
        style={{ color: selectedCourse?.color }}
      >
        {selectedCourse?.name}
      </Text>
    </View>
  );
}

