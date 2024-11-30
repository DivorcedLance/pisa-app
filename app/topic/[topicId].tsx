import React, { useEffect, useState } from "react";
import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { getTopicDataById, Topic } from "@/lib/firebase/topic";
import { useCourseStore } from "@/stores/useCourseStore";

export default function TopicScreen() {
  const { topicId } = useLocalSearchParams<{ topicId: string }>();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { courses } = useCourseStore();

  const course = courses["Matemáticas"];

  useEffect(() => {
    async function fetchTopic() {
      if (!topicId) return;

      try {
        const topicData = await getTopicDataById(topicId);
        setTopic(topicData);
      } catch (error: any) {
        console.error("Error fetching topic data:", error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTopic();
  }, [topicId]);

  if (loading || !topic) {
    return (
      <View className="flex-1 justify-center items-center bg-[#1B1E1A]">
        <ActivityIndicator size="large" color="#E8B21A" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#1B1E1A] p-6">
      <Text className="text-white text-3xl font-bold mb-6" style={{ color: course?.color }}>
        {topic.name}
      </Text>
      <Pressable
        className="bg-[#262A28] p-4 rounded-md mb-4"
        style={{ backgroundColor: course?.color }}
        onPress={() => "router.push(`/course/${courseName}/topic/${topicId}/multimedia`)"}
      >
        <Text className="text-white text-lg font-bold">Contenido Multimedia</Text>
      </Pressable>
      <Pressable
        className="bg-[#262A28] p-4 rounded-md"
        style={{ backgroundColor: course?.color }}
        onPress={() => "router.push(`/course/${courseName}/topic/${topicId}/evaluations`)"}
      >
        <Text className="text-white text-lg font-bold">Evaluaciones</Text>
      </Pressable>
    </View>
  );
}
