import React, { useEffect, useState } from "react";
import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { useRouter, useLocalSearchParams, Stack } from "expo-router";
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
    <>
      <Stack.Screen
        options={{
          title: 'Aprendizaje',
          headerTitleStyle: { fontSize: 18 } // Estilos personalizados
        }}
      />
      <View className="flex-1 bg-[#1B1E1A] p-6">
        <Text className="text-white text-3xl font-bold text-left">
          ¿Cómo quieres aprender?
        </Text>
        <Text className="text-gray-400 text-lg font-bold mb-32">Elige una opción</Text>
        <Pressable
          className="bg-[#262A28] p-7 rounded-md mb-16 w-64 self-center items-center"
          style={{ backgroundColor: selectedCourse?.color }}
          onPress={() => router.push(`/multimedia`)}
        >
          <Text className="text-white text-lg font-bold">CONTENIDO MULTIMEDIA</Text>
        </Pressable>
        <Pressable
          className="bg-[#262A28] p-7 rounded-md w-64 self-center items-center"
          style={{ backgroundColor: selectedCourse?.color }}
          onPress={() => router.push(`/evaluation`)}
        >
          <Text className="text-white text-lg font-bold">EJERCITANDO</Text>
        </Pressable>

        <View className="flex-1 justify-end">
          <Text className="text-gray-600 text-sm font-bold mt-16">©PISApp Copyright 2023</Text>
        </View>
      </View>
    </>
  );
}
