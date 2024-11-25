import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import useAuthStore from "@/stores/authStore";
import { useRouter } from "expo-router";

export default function PasswordScreen() {
  const [passwordInput, setPasswordInput] = useState("");
  const { setPassword, login } = useAuthStore();
  const router = useRouter();

  const handleLogin = async () => {
    setPassword(passwordInput);
    try {
      await login();
      router.replace("/main");
    } catch (error: any) {
      alert("Error en el inicio de sesión: " + error.message);
    }
  };

  return (
    <View className="bg-[#1B1E1A] p-8 flex flex-1 justify-center">
      <Text className="font-bold text-4xl flex gap-7 color-white">
        Ingrese su contraseña
      </Text>
      <View className="mb-12"></View>
      <Text className="font-bold text-2xl color-white">Contraseña</Text>
      <View className="border-b-slate-50 border-b-[1px]">
        <TextInput
          className="color-white font-bold text-center p-2"
          placeholder="Ingrese la contraseña"
          placeholderTextColor="#8D8D8D"
          secureTextEntry={true}
          onChangeText={setPasswordInput}
          value={passwordInput}
        />
      </View>
      <Pressable
        className="bg-[#E8B21A] items-center justify-center p-2 mt-8 rounded-md"
        onPress={handleLogin}
      >
        <Text className="font-bold text-2xl text-center color-white">
          Ingresar
        </Text>
      </Pressable>
      <Pressable className="items-center justify-center p-2 mt-8">
        <Text className="font-normal text-lg text-center color-white">
          Olvidaste tu contraseña
        </Text>
      </Pressable>
    </View>
  );
}
