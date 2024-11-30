import { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/stores/authStore";

export default function EmailScreen() {
  const [emailInput, setEmailInput] = useState<string>("");
  const setEmail = useAuthStore((state) => state.setEmail);
  const router = useRouter();

  const handleNext = () => {
    if (emailInput) {
      setEmail(emailInput);
      router.push("/login/password");
    } else {
      Alert.alert("Error", "Por favor, ingrese su correo electrónico.");
    }
  };

  return (
    <View className="bg-[#1B1E1A] p-8 flex flex-1 justify-center">
      <Text className="font-bold text-4xl text-white mb-8">
        Ingrese el correo con el{"\n"}que se registró
      </Text>
      <Text className="font-bold text-2xl text-white">Email</Text>
      <View className="border-b-slate-50 border-b-[1px]">
        <TextInput
          className="text-white font-bold text-center p-2"
          placeholder="Ingrese el correo electrónico"
          placeholderTextColor="#8D8D8D"
          onChangeText={setEmailInput}
          value={emailInput}
        />
      </View>
      <Pressable
        className="bg-[#E8B21A] items-center justify-center p-2 mt-8 rounded-md"
        onPress={handleNext}
      >
        <Text className="font-bold text-2xl text-center text-white">
          Siguiente
        </Text>
      </Pressable>
    </View>
  );
}
