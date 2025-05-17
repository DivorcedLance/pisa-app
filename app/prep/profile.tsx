import { Link, Stack } from 'expo-router';
import { View, Text, Image, Pressable, ScrollView, Alert } from 'react-native';
import { HomeIcon } from '@/components/Icons';
import { useAuthStore } from "@/stores/authStore";
import { useEffect, useState } from 'react';
import { getStudentAchievementByStudentId } from '@/lib/firebase/achievement';
import { Timestamp } from 'firebase/firestore';
import { useRouter } from "expo-router";
import BronceSvg from '@/components/svg/BronceSvg';
import PlataSvg from '@/components/svg/PlataSvg';
import OroSvg from '@/components/svg/OroSvg';
import DiamanteSvg from '@/components/svg/DiamanteSvg';
import ObsidianaSvg from '@/components/svg/ObsidianaSvg';

type StudentAchievement = {
    id: string;
    studentId: string;
    achievementId: string;
    date: string;
    tierId: string;
    tierName: string;
    spriteImgLink: string;
    courseId: string;
    description: string;
    name: string;
    // totalProgress: number;
    currentProgress: number;
};

export default function ProfileScreen() {
    const router = useRouter();
    const { user, logout } = useAuthStore();
    const [studentAchievements, setStudentAchievements] = useState<StudentAchievement[]>([]);
    const alumno = {
        idAlumno: "hfsdkjh138fy13",
        profileLinkImg: "https://i.pinimg.com/736x/51/46/17/51461769517902929f28103cde97743f.jpg",
        nombre: "Esteban",
        apellido: "Garcia",
        codigo: "CA-1",
        puntos: 15,
        logros: [
            {
                achievementTypeId: "1",
                courseId: "Matemáticas",
                description: "Completa el topico Algebra para obtener este logro",
                name: "Logro de Algebra",
            },
            {
                achievementTypeId: "2",
                courseId: "Ciencias",
                description: "Completa el topico Dinamica para obtener este logro",
                name: "Logro de Dinamica",
            },
            {
                achievementTypeId: "3",
                courseId: "Lectura",
                description: "Completa el topico Parrafos para obtener este logro",
                name: "Logro de Parrafos",
            }
        ],
        idTutor: "SD"
    };

    useEffect(() => {
        const fetchAchievements = async () => {
            if (user?.id) {
                try {
                    await getStudentAchievementByStudentId(user.id)

                    const data = await getStudentAchievementByStudentId(user.id);
                    setStudentAchievements(data);

                } catch (error) {
                    console.error("Error fetching achievements:", error);
                }
            } else {
                console.error("User ID is undefined");
            }
        };

        fetchAchievements();
    }, [user?.id]);

    const handleLogout = async () => {
        try {
            await logout();
            router.replace("/login/email"); // Redirige al login después de cerrar sesión
        } catch (error: any) {
            Alert.alert("Error", "No se pudo cerrar sesión: " + error.message);
        }
    };

    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Perfil',
                    headerTitleStyle: { fontSize: 18 } // Estilos personalizados
                }}
            />
            <ScrollView className="bg-[#1B1E1A] px-7" contentContainerStyle={{ paddingBottom: 100 }}>
                <Image source={{ uri: user?.profileImgLink }} className="h-[200px] w-[200px] mb-7 mt-7 self-center rounded-2xl" />
                <Text className="font-bold text-center text-5xl">{user?.firstName} {user?.lastName}</Text>
                {/* <Text className="text-center color-[#b2b2b2]">Código: {alumno.codigo}</Text> */}
                <View className="flex flex-col justify-center items-center mt-8">
                    {/* <View className="mx-2">
                        <Text className="text-center text-4xl">Puntos</Text>
                        <Text className="text-center text-7xl">{alumno.puntos}</Text>
                    </View> */}
                    <View className="mx-2 w-full">
                        <Text className="text-center text-4xl">Logros</Text>
                        <View className="flex flex-col">
                            {studentAchievements.length > 0 ? (
                                studentAchievements.map((logro, index) => (
                                    <View key={index} className="flex justify-between bg-[#b2b2b2] p-2 my-2">
                                        <View className="flex flex-row">
                                            <View className="flex-row justify-between items-center space-x-2">
                                                <Text className="text-2xl">{logro.name}</Text>
                                                {logro.tierName === "Bronce" ? (
                                                    <BronceSvg style={{ transform: [{ scale: 1 }] }} />
                                                ) : logro.tierName === "Plata" ? (
                                                    <PlataSvg style={{ transform: [{ scale: 1 }] }} />
                                                ) : logro.tierName === "Oro" ? (
                                                    <OroSvg style={{ transform: [{ scale: 1 }] }} />
                                                ) : logro.tierName === "Diamante" ? (
                                                    <DiamanteSvg style={{ transform: [{ scale: 1 }] }} />
                                                ) : logro.tierName === "Obsidiana" ? (
                                                    <ObsidianaSvg style={{ transform: [{ scale: 1 }] }} />
                                                ) : null}
                                            </View>

                                        </View>
                                    </View>
                                ))
                            ) : (
                                <View className="flex justify-between items-center bg-[#b2b2b2] p-2 my-2">
                                    <View className="flex flex-row">
                                        <Text className="text-2xl">No tiene logros</Text>
                                    </View>
                                </View>
                            )}
                        </View>
                        <Link asChild href={"/prep/achievementsview"}>
                            <Pressable className="flex justify-center items-center h-[50px] px-8 rounded elevation me-2 bg-[#E8B21A] mt-2">
                                <Text className="text-[20px] font-normal leading-5 tracking-wide color-white">Ver Logros</Text>
                            </Pressable>
                        </Link>
                    </View>
                </View>
                <Pressable className="flex justify-center items-center py-3 px-8 rounded elevation bg-[#0077A1] mt-16">
                    <Text className="text-[20px] font-normal tracking-wide color-white">Tutor Asignado</Text>
                </Pressable>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Pressable className="flex justify-center items-center h-[50px] px-8 rounded elevation me-2 bg-[#E8B21A] mt-2">
                        <Text className="text-[20px] font-normal tracking-wide color-white">Editar</Text>
                    </Pressable>
                    <Pressable className="flex justify-center items-center h-[50px] px-8 rounded elevation me-2 bg-[#DB0E0E] mt-2" onPress={handleLogout}>
                        <Text className="text-[20px] font-normal tracking-wide color-white">Cerrar Sesión</Text>
                    </Pressable>
                </View>

            </ScrollView>

        </>
    );
}
