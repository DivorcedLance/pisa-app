import React, { useEffect, useState } from "react";
import { View, Text, Pressable, ScrollView, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { getCourseList, Course } from "@/lib/firebase/course";

export default function coursesScreen() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  // Llama a la función para obtener la lista de cursos
  useEffect(() => {
    async function fetchCourses() {
      try {
        const courseList = await getCourseList();
        setCourses(courseList);
      } catch (error: any) {
        console.error("Error al obtener la lista de cursos:", error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  return (
    <View className="flex-1 bg-[#1B1E1A] p-6">
      <Text className="text-white text-3xl font-bold mb-6">Seleccione un curso</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#E8B21A" />
      ) : (
        <ScrollView>
          {courses.map((course) => (
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
