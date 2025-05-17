import React, { useEffect, useState } from "react";
import { View, Text, Pressable, ScrollView, ActivityIndicator } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { Stack, useRouter } from "expo-router";
import { useCourseStore } from "@/stores/courseStore";
import { useConfigStore } from "@/stores/configStore";
import { useAuthStore } from "@/stores/authStore";
import { Section } from "@/types/section";
import { getSectionsByTeacherId } from "@/lib/firebase/section";

export default function SectionScreen() {
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    const { user } = useAuthStore();
    const [sections, setSections] = useState<Section[]>([]);

    useEffect(() => {
        const loadSections = async () => {
            if (!user?.id) {
                setLoading(false);
                return;
            }
            try {
                const response = await getSectionsByTeacherId(user.id);
                setSections(response);
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
                    title: 'Secciones',
                    headerTitleStyle: { fontSize: 18 } // Estilos personalizados
                }}
            />
            <View className="flex-1 bg-[#1B1E1A] p-6">
                {loading ? (
                    <ActivityIndicator size="large" color="#E8B21A" />
                ) : (
                    <ScrollView>
                        {Object.values(sections).map((section) => (
                            <Pressable
                                key={section.id}
                                className="mb-10 p-10 rounded-md w-56 self-center"
                                style={{ backgroundColor: "#262A28" }}
                                onPress={() => {
                                    router.push(`./section/${section.id}`)
                                }}
                            >
                                <Text className="text-white text-xl font-bold text-center">{section.code}</Text>
                            </Pressable>
                        ))}

                    </ScrollView>
                )}


            </View>

        </>
    );
}
