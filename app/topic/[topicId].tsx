import React, { useEffect, useState } from "react";
import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useCourseStore } from "@/stores/courseStore";

export default function TopicScreen() {
  const { topicId } = useLocalSearchParams<{ topicId: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const { selectedCourse, selectTopic, selectedTopic } = useCourseStore();
  const router = useRouter();

  useEffect(() => {
    const loadTopic = async () => {
      if (!topicId) return;

      try {
        await selectTopic(topicId);
      } catch (error: any) {
        console.error("Error fetching topic data:", error.message);
      } finally {
        setLoading(false);
      }
    }

    loadTopic();
  }, [topicId, selectTopic]);

  if (loading || !selectedTopic) {
    return (
      <View className="flex-1 justify-center items-center bg-[#1B1E1A]">
        <ActivityIndicator size="large" color="#E8B21A" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#1B1E1A] p-6">
      <Text className="text-white text-3xl font-bold mb-6" style={{ color: selectedCourse?.color }}>
        {selectedTopic.name}
      </Text>
      <Pressable
        className="bg-[#262A28] p-4 rounded-md mb-4"
        style={{ backgroundColor: selectedCourse?.color }}
        onPress={() => router.push(`/multimedia`)}
      >
        <Text className="text-white text-lg font-bold">Contenido Multimedia</Text>
      </Pressable>
      <Pressable
        className="bg-[#262A28] p-4 rounded-md"
        style={{ backgroundColor: selectedCourse?.color }}
        onPress={() => router.push(`/evaluation`)}
      >
        <Text className="text-white text-lg font-bold">Evaluaciones</Text>
      </Pressable>
    </View>
  );
}
