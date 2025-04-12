import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useAuthStore } from "@/stores/authStore";

const RegisterScreen: React.FC = () => {
  const { register, error, isLoading } = useAuthStore();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [userdata, setUserData] = useState({
    firstName: "",
    lastName: "",
    telephone: "",
    profileImgLink: "",
    documentType: "",
    documentNumber: "",
    birthDate: new Date(),
    type: "student" as "student" | "teacher",
  });

  const handleRegister = async () => {
    await register(email, password, userdata);
  };

  const handleDateChange = (event: any, selectedDate?: Date): void => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setUserData({ ...userdata, birthDate: selectedDate });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>

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
      <TextInput
        style={styles.input}
        placeholder="Tipo Documento"
        value={userdata.documentType}
        onChangeText={(text) => setUserData({ ...userdata, documentType: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Nro Documento"
        value={userdata.documentNumber}
        onChangeText={(text) => setUserData({ ...userdata, documentNumber: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombres"
        value={userdata.firstName}
        onChangeText={(text) => setUserData({ ...userdata, firstName: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellidos"
        value={userdata.lastName}
        onChangeText={(text) => setUserData({ ...userdata, lastName: text })}
      />

      {/* Fecha de nacimiento con DatePicker */}
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <TextInput
          style={styles.input}
          placeholder="Fecha de Nacimiento"
          editable={false}
          value={userdata.birthDate.toISOString().split("T")[0]} // YYYY-MM-DD
          pointerEvents="none"
        />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={userdata.birthDate || new Date()}
          mode="date"
          display="default"
          maximumDate={new Date()}
          onChange={handleDateChange}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={userdata.telephone}
        onChangeText={(text) => setUserData({ ...userdata, telephone: text })}
      />

      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
        <Text style={{ fontSize: 16 }}>Tipo Docente</Text>
        <Switch
          value={userdata.type === "teacher"}
          onValueChange={(value) =>
            setUserData({ ...userdata, type: value ? "teacher" : "student" })
          }
        />
      </View>

      <Button title={isLoading ? "Registrando..." : "Registrarse"} onPress={handleRegister} />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
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

export default RegisterScreen;
