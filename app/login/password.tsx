import { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/stores/authStore";

export default function PasswordScreen() {
  const [passwordInput, setPasswordInput] = useState<string>("");
  const { login } = useAuthStore(); // Usamos el método `login` del store
  const router = useRouter();

  const handleLogin = async () => {
    if (!passwordInput) {
      Alert.alert("Error", "Por favor, ingrese su contraseña.");
      return;
    }
    try {
      await login(passwordInput); // Intenta iniciar sesión con la contraseña
      router.replace("/main"); // Navega a la pantalla principal
    } catch (error: any) {
      Alert.alert("Error", "Error en el inicio de sesión: " + error.message);
    }
  };

  return (
    <View className="bg-[#1B1E1A] p-8 flex flex-1 justify-center">
      <Text className="font-bold text-4xl text-white mb-8">
        Ingrese su contraseña
      </Text>
      <Text className="font-bold text-2xl text-white">Contraseña</Text>
      <View className="border-b-slate-50 border-b-[1px]">
        <TextInput
          className="text-white font-bold text-center p-2"
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
        <Text className="font-bold text-2xl text-center text-white">
          Ingresar
        </Text>
      </Pressable>
      <Pressable className="items-center justify-center p-2 mt-8">
        <Text className="font-normal text-lg text-center text-white">
          ¿Olvidaste tu contraseña?
        </Text>
      </Pressable>
    </View>
  );
}
