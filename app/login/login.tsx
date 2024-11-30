import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { useAuthStore } from "@/stores/authStore";

const LoginScreen: React.FC = () => {
  const { login, user, error, isLoading } = useAuthStore();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    await login(email, password);
  };

  return (
    <View style={styles.container}>
      {user ? (
        <Text>Bienvenido, {user.email}</Text>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Correo Electrónico"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={password}
            secureTextEntry
            onChangeText={setPassword}
          />
          <Button title={isLoading ? "Cargando..." : "Iniciar Sesión"} onPress={handleLogin} />
          {error && <Text style={styles.error}>{error}</Text>}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  error: {
    color: "red",
    marginTop: 10,
  },
});

export default LoginScreen;
