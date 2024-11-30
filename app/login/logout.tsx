import React from "react";
import { View, Button } from "react-native";
import { useAuthStore } from "@/stores/authStore";

const LogoutScreen: React.FC = () => {
  const { logout, user } = useAuthStore();

  return (
    <View>
      {user && <Button title="Cerrar Sesión" onPress={logout} />}
    </View>
  );
};

export default LogoutScreen;
