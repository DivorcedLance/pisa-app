import { View, Text, Pressable, Image, ActivityIndicator } from "react-native";
import { useCourseStore } from "@/stores/courseStore";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useEvaluationStore } from "@/stores/evaluationStore";
import { useAuthStore } from "@/stores/authStore";
import { EvaluationDisplay } from "@/components/EvaluationDisplay";
import { useConfigStore } from "@/stores/configStore";

export default function EvaluationScreen() {
  const { selectedLevelIndex } = useConfigStore();
  const [loading, setLoading] = useState<boolean>(true);
  const { selectedCourse, selectedTopic } = useCourseStore();
  const { setEvaluationIds, setStudentId, selectLevel, selectedEvaluation } = useEvaluationStore();
  const { user } = useAuthStore();

  useEffect(() => {
    const loadEvaluation = async () => {
      if (!selectedTopic)  return 

      try {
        setEvaluationIds((selectedTopic.evaluations!.sort(
          (a, b) => a.level.index - b.level.index
        )).map((evaluation) => evaluation.id));
        setStudentId(user!.id);
        await selectLevel(selectedLevelIndex);
      } catch (error: any) {
        console.error("Error fetching evaluation data:", error.message);
      } finally {
        setLoading(false);
      }
    }

    loadEvaluation();
  }, []);

  useEffect(() => {
    const loadEvaluation = async () => {
      setLoading(true);
      await selectLevel(selectedLevelIndex);
      setLoading(false);
    }

    loadEvaluation();
  }, [selectedLevelIndex]);

  if (loading || !selectedCourse) {
    return (
      <View className="flex-1 justify-center items-center bg-[#1B1E1A]">
        <ActivityIndicator size="large" color="#E8B21A" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#1B1E1A] p-6">
      <View className={`flex-row p-2 pl-5 bg-[${selectedCourse?.color}] w-3/6 -inset-x-6`} 
      style={{ borderTopRightRadius: 10, borderBottomRightRadius: 10 }}
      >
        <Text
          className="text-white text-3xl font-bold"
          style={{
            color: "white",
            textShadowColor: "black",
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 2,
          }}
        >
          {selectedCourse?.name}
        </Text>
      </View>

      {(selectedEvaluation && user) ? 
        <EvaluationDisplay evaluation={selectedEvaluation} studentId={user.id} /> 
      : null}

    </View>
  );
}