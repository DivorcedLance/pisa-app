import React, { useEffect, useState } from "react";
import { View, Text, Pressable, ScrollView, ActivityIndicator } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useAuthStore } from "@/stores/authStore";
import { Section } from "@/types/section";
import { getSectionsByTeacherId, getSectionStudents } from "@/lib/firebase/section";
import { Student } from "@/types/student";

export default function SectionUnitScreen() {
    const { sectionId } = useLocalSearchParams<{ sectionId: string }>();
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    const { user } = useAuthStore();
    const [students, setStudents] = useState<Student[]>([]);

    useEffect(() => {
        const loadSections = async () => {
            if (!user?.id) {
                setLoading(false);
                return;
            }
            try {
                const response = await getSectionStudents(sectionId);
                setStudents(response);
                
            } catch (error) {
                console.error("Error fetching sections:", error);
            } finally {
                setLoading(false);
            }
        };

        loadSections();
    }, []);

    return (
        <>
            <Stack.Screen
                options={{
                    title: `Sección`,
                    headerTitleStyle: { fontSize: 18 } // Estilos personalizados
                }}
            />
            <View className="flex-1 bg-[#1B1E1A] p-6">
                {loading ? (
                    <ActivityIndicator size="large" color="#E8B21A" />
                ) : (
                    <ScrollView>
                        {Object.values(students).map((student) => (
                            <Pressable
                                key={student.id}
                                className="mb-10 p-10 rounded-md w-56 self-center"
                                style={{ backgroundColor: "#262A28" }}
                                onPress={() => {
                                    router.push(`./report/${student.firstName}`)
                                }}
                            >
                                <Text className="text-white text-xl font-bold text-center">{student.firstName} {student.lastName} </Text>
                            </Pressable>
                        ))}

                    </ScrollView>
                )}


            </View>

        </>
    );
}
