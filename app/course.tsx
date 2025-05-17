import React, { useEffect, useState } from "react";
import { View, Text, Pressable, ScrollView, ActivityIndicator } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { Stack, useRouter } from "expo-router";
import { useCourseStore } from "@/stores/courseStore";
import { useConfigStore } from "@/stores/configStore";
import { useAuthStore } from "@/stores/authStore";

export default function coursesScreen() {
  const { courses, fetchCourses } = useCourseStore();
  const { selectLevelIndex, selectedLevelIndex } = useConfigStore();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    const loadCourses = async () => {
      await fetchCourses();
      setLoading(false);
    };

    loadCourses();
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Cursos',
          headerTitleStyle: { fontSize: 18 } // Estilos personalizados
        }}
      />
      <View className="flex-1 bg-[#1B1E1A] p-6">
        {user && (
          <Text className="text-white text-3xl font-bold text-left mb-4">
            Bienvenido, {user.firstName} {user.lastName} 👋
          </Text>
        )}
        <Text className="text-gray-400 text-lg font-bold mb-16">¿Qué deseas aprender hoy?</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#E8B21A" />
        ) : (
          <ScrollView>
            {Object.values(courses).map((course) => (
              <Pressable
                key={course.name}
                className="mb-10 p-10 rounded-md w-56 self-center"
                style={{ backgroundColor: course.color }}
                onPress={() => {
                  router.push(`./course/${course.name}`)
                }}
              >
                <Text className="text-white text-xl font-bold text-center">{course.name}</Text>
              </Pressable>
            ))}

            <Text className="text-white text-lg mb-6 self-center">Dificultad</Text>

            <View className="flex-1 bg-[#3B3B3B] mb-4 rounded-lg w-60 self-center p-0">

              <Picker
                selectedValue={selectedLevelIndex}
                onValueChange={(itemValue) => selectLevelIndex(itemValue)}
                className="text-white text-lg font-bold"
                style={{ color: "white" }}
                dropdownIconColor="white"
              >
                <Picker.Item label="Básico" value={0} />
                <Picker.Item label="Intermedio" value={1} />
                <Picker.Item label="Avanzado" value={2} />
              </Picker>

            </View>
          </ScrollView>
        )}
        <Text className="text-gray-600 text-sm font-bold mt-16">©PISApp Copyright 2023</Text>
      </View>

    </>
  );
}
