import React, { useEffect, useState } from "react";
import { View, Text, Pressable, ScrollView, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useCourseStore } from "@/stores/courseStore";

export default function coursesScreen() {
  const { courses, fetchCourses } = useCourseStore();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const loadCourses = async () => {
      await fetchCourses();
      setLoading(false);
    };

    loadCourses();
  }, []);

  return (
    <View className="flex-1 bg-[#1B1E1A] p-6">
      <Text className="text-white text-3xl font-bold mb-6">Seleccione un curso</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#E8B21A" />
      ) : (
        <ScrollView>
          {Object.values(courses).map((course) => (
            <Pressable
              key={course.name}
              className="mb-4 p-4 rounded-md"
              style={{ backgroundColor: course.color }}
              onPress={() => {
                router.push(`./course/${course.name}`)
              }}
            >
              <Text className="text-white text-xl font-bold text-center">{course.name}</Text>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </View>
  );
}