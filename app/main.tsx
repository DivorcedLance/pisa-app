import React from "react";
import { View, Text, Pressable, Image, Alert } from "react-native";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "expo-router";

export default function MainScreen() {
  const { user, logout } = useAuthStore(); // Obtenemos la información del usuario y la función logout
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/login/email"); // Redirige al login después de cerrar sesión
    } catch (error: any) {
      Alert.alert("Error", "No se pudo cerrar sesión: " + error.message);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#1B1E1A] p-6">
      {user ? (
        <>
          <Image
            source={{ uri: user.profileImgLink }}
            className="w-32 h-32 rounded-full mb-6"
            resizeMode="cover"
          />
          <Text className="text-white text-3xl font-bold text-center mb-4">
            Bienvenido, {user.firstName} {user.lastName} 👋
          </Text>
          <View className="bg-[#262A28] p-4 rounded-lg w-full mb-6">
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
          </View>
          <Pressable
            className="bg-[#E8B21A] px-6 py-3 rounded-md"
            onPress={() => router.push("/course")}
          >
            <Text className="text-black text-lg font-bold text-center">Ver Cursos</Text>
          </Pressable>
          <Pressable
            className="bg-[#E8B21A] px-6 py-3 rounded-md"
            onPress={handleLogout}
          >
            <Text className="text-black text-lg font-bold text-center">Cerrar Sesión</Text>
          </Pressable>
        </>
      ) : (
        <Text className="text-white text-xl font-bold">Cargando información...</Text>
      )}
    </View>
  );
}
