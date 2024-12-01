import { View, Text, Pressable, Image } from "react-native";
import { useCourseStore } from "@/stores/courseStore";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useEvaluationStore } from "@/stores/evaluationStore";
import { useAuthStore } from "@/stores/authStore";

export default function EvaluationScreen() {
  const [ level ] = useState(0); // TODO: get from config
  const { selectedCourse, selectedTopic } = useCourseStore();
  const { setEvaluationIds, setStudentId, selectLevel, selectedEvaluation } = useEvaluationStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (selectedTopic) {
      setEvaluationIds(selectedTopic.evaluations!.map((evaluation) => evaluation.id));
    }
    setStudentId(user!.id);
    selectLevel(level);
  }, []);

  useEffect(() => {
    selectLevel(level);
  }, [level]);

  useEffect(() => {
    console.log(selectedEvaluation);
  }, [selectedEvaluation]);

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