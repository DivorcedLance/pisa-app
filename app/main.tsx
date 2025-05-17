import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Image, Alert } from "react-native";
import { useAuthStore } from "@/stores/authStore";
import { Stack, useRouter } from "expo-router";
import AnimatedStreakBadge from "@/components/AnimatedStreakBadge";

export default function MainScreen() {
  const { user, logout, isLoading } = useAuthStore(); // Obtenemos la información del usuario y la función logout
  const router = useRouter();
  const [streak, setStreak] = useState(user?.streak || 0); // Inicializamos el streak con el valor del usuario o 0

  useEffect(() => {
    if (!isLoading) {
      // Redirige basado en el estado de autenticación
      if (user?.type === 'admin') {
        // Usuario autenticado - redirige al main
        router.replace('/admin');
      }
    }
  }, [user, isLoading]);

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
          title: 'PisApp',
          headerTitleStyle: { fontSize: 18 } // Estilos personalizados
        }}
      />
      <View className="flex-1 justify-center items-center bg-[#1B1E1A] p-6">
        {user ? (
          <>
            <Image
              source={{ uri: user.profileImgLink }}
              className="w-32 h-32 rounded-full mb-6"
              resizeMode="cover"
            />
            {user.type === "student" && (
              <View style={{
                position: 'absolute',
                bottom: 500,
                right: 130,
              }}>
                <AnimatedStreakBadge streak={streak} />
              </View>
            )}
            <Text className="text-white text-3xl font-bold text-center mb-4">
              Bienvenido, {user.firstName} {user.lastName} 👋
            </Text>

            {/* <View className="bg-[#262A28] p-4 rounded-lg w-full mb-6">
              <Text className="text-white text-lg">Id: {user.id}</Text>
              <Text className="text-white text-lg">Correo: {user.email}</Text>
              <Text className="text-white text-lg">Teléfono: {user.telephone}</Text>
              <Text className="text-white text-lg">
                Tipo de Usuario: {user.type === "student" ? "Estudiante" : "Profesor"}
              </Text>
              <Text className="text-white text-lg">Tipo de Documento: {user.documentType}</Text>
              <Text className="text-white text-lg">Número de Documento: {user.documentNumber}</Text>
              <Text className="text-white text-lg">
                Fecha de Nacimiento: {user.birthDate.toLocaleDateString()}
              </Text>
              {user.type === "student" && 'sectionId' in user.rolData && user.rolData.sectionId ? (
                <Text className="text-white text-lg">Sección: {user.rolData.sectionId}</Text>
              ) : (user.type === "teacher" && 'sectionIds' in user.rolData && user.rolData.sectionIds) ? (
                <Text className="text-white text-lg">
                  Asignaturas: {user.rolData.sectionIds.join(", ")}
                </Text>
              ) : null}
            </View> */}

            <Pressable
              className="bg-[#E8B21A] w-48 px-6 py-3 mb-4 rounded-md"
              onPress={() => router.push("./prep/profile")}
            >
              <Text className="text-black text-lg font-bold text-center">Mi Perfil</Text>
            </Pressable>

            {user.type === "student" ? (
              <Pressable
              className="bg-[#E8B21A] w-48 px-6 py-3 mb-4 rounded-md"
              onPress={() => router.push("/course")}
            >
              <Text className="text-black text-lg font-bold text-center">Cursos</Text>
            </Pressable>
            ) : (<Pressable
              className="bg-[#E8B21A] w-48 px-6 py-3 mb-4 rounded-md"
              onPress={() => router.push("/section")}
            >
              <Text className="text-black text-lg font-bold text-center">Secciones</Text>
            </Pressable>) }
            
            <Pressable
              className="bg-[#E8B21A] w-48 px-6 py-3 mb-4 rounded-md"
              onPress={() => router.push("./community/communityPosts")}
            >
              <Text className="text-black text-lg font-bold text-center">Comunidad</Text>
            </Pressable>
            <Pressable
              className="bg-[#E8B21A] w-48 px-6 py-3 mb-4 rounded-md"
              onPress={() => router.push("./community/commonQuestions")}
            >
              <Text className="text-black text-lg font-bold text-center">Preguntas Frecuentes</Text>
            </Pressable>
            <Pressable
              className="bg-[#E8B21A] w-48 px-6 py-3 mb-4 rounded-md"
              onPress={() => router.push("./prep/chatgtp")}
            >
              <Text className="text-black text-lg font-bold text-center">Asistente</Text>
            </Pressable>
            <Pressable
              className="bg-[#E8B21A] w-48 px-6 py-3 rounded-md"
              onPress={handleLogout}
            >
              <Text className="text-black text-lg font-bold text-center">Cerrar Sesión</Text>
            </Pressable>
          </>
        ) : (
          <Text className="text-white text-xl font-bold">Cargando información...</Text>
        )}
      </View>
    </>
  );
}
