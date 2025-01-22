import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useCourseStore } from "@/stores/courseStore";

export default function CourseScreen() {
  const { courseName } = useLocalSearchParams<{ courseName: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { selectCourse, selectedCourse } = useCourseStore();

  useEffect(() => {
    const loadCourse = async () => {
      if (!courseName) return;

      try {
        await selectCourse(courseName);
      } catch (error: any) {
        console.error("Error fetching course data:", error.message);
      } finally {
        setLoading(false);
      }
    }

    loadCourse();
  }, [courseName, selectedCourse ]);

  if (loading || !selectedCourse) {
    return (
      <View className="flex-1 justify-center items-center bg-[#1B1E1A]">
        <ActivityIndicator size="large" color="#E8B21A" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#1B1E1A] p-6">
      <Text className="text-white text-3xl font-bold text-left">
        ¿Qué quieres aprender?
      </Text>
      <Text className="text-gray-400 text-lg font-bold mb-16">Elige una opción</Text>
      <ScrollView className="flex-1 p-4">
  <View className="flex-row flex-wrap justify-between">
    {selectedCourse.topics!
      .sort((a, b) => a.index - b.index)
      .map((topic) => (
        <Pressable
          key={topic.id}
          className={`p-4 rounded-md mb-4`}
          style={{
            backgroundColor: selectedCourse.color,
            width: "48%", // Dos columnas con un pequeño espacio entre ellas
          }}
          onPress={() => {
            router.push(`./../topic/${topic.id}`);
          }}
        >
          <Text className="text-white text-lg font-bold text-center">{topic.name}</Text>
        </Pressable>
      ))}
  </View>
</ScrollView>

      <Text className="text-gray-600 text-sm font-bold mt-16">©PISApp Copyright 2023</Text>
    </View>
  );
}
