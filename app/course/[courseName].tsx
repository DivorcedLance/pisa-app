import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { getTopicList } from "@/lib/firebase/topic";
import { useCourseStore } from "@/stores/useCourseStore";

export default function CourseScreen() {
  const { courseName } = useLocalSearchParams<{ courseName: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { courses, addCourse, deleteCourse } = useCourseStore();

  const course = courses[courseName ?? ""];

  useEffect(() => {
    async function fetchCourse() {
      if (!courseName || course) return;

      try {
        const courseData = await getTopicList(courseName);
        // deleteCourse(courseName);
        addCourse(courseData);
      } catch (error: any) {
        console.error("Error fetching course data:", error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCourse();
  }, [courseName, course, addCourse]);

  if (loading || !course) {
    return (
      <View className="flex-1 justify-center items-center bg-[#1B1E1A]">
        <ActivityIndicator size="large" color="#E8B21A" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#1B1E1A] p-6">
      <Text className="text-white text-3xl font-bold mb-6" style={{ color: course.color }}>
        {course.name}
      </Text>
      <ScrollView>
        {course.topics
          .sort((a, b) => a.index - b.index)
          .map((topic) => (
            <Pressable
              key={topic.id}
              className="bg-[#262A28] p-4 rounded-md mb-4"
              onPress={() => {
                const link = `./topic/${topic.id}`;
                console.log(link);
                router.push(`./../topic/${topic.id}`);
              }}
            >
              <Text className="text-white text-lg font-bold">{topic.name}</Text>
            </Pressable>
          ))}
      </ScrollView>
    </View>
  );
}
