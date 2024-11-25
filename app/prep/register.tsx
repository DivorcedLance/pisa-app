import { Link } from 'expo-router';
import { View, Text, TextInput, Switch, Pressable } from 'react-native';
import { HomeIcon } from '../../components/Icons';

export default function RegisterScreen() {
  return (
    <View className="flex flex-1 items-center justify-center bg-[#1B1E1A] px-6">
      <Text className="font-bold text-4xl text-center text-white mb-10">
        Registro Alumno
      </Text>

      {/* Campos de entrada */}
      <TextInput
        className="text-white font-bold text-center p-4 bg-gray-800 rounded-md w-full mb-4"
        placeholder="Documento"
        placeholderTextColor="#8D8D8D"
      />
      <TextInput
        className="text-white font-bold text-center p-4 bg-gray-800 rounded-md w-full mb-4"
        placeholder="Nombres y Apellidos"
        placeholderTextColor="#8D8D8D"
      />
      <TextInput
        className="text-white font-bold text-center p-4 bg-gray-800 rounded-md w-full mb-4"
        placeholder="Fecha de Nacimiento"
        placeholderTextColor="#8D8D8D"
      />
      <TextInput
        className="text-white font-bold text-center p-4 bg-gray-800 rounded-md w-full mb-4"
        placeholder="Sexo"
        placeholderTextColor="#8D8D8D"
      />
      <TextInput
        className="text-white font-bold text-center p-4 bg-gray-800 rounded-md w-full mb-4"
        placeholder="Correo"
        placeholderTextColor="#8D8D8D"
      />
      <TextInput
        className="text-white font-bold text-center p-4 bg-gray-800 rounded-md w-full mb-4"
        placeholder="Teléfono"
        placeholderTextColor="#8D8D8D"
      />
      <TextInput
        className="text-white font-bold text-center p-4 bg-gray-800 rounded-md w-full mb-4"
        placeholder="Crear Contraseña"
        placeholderTextColor="#8D8D8D"
        secureTextEntry
      />
      <TextInput
        className="text-white font-bold text-center p-4 bg-gray-800 rounded-md w-full mb-6"
        placeholder="Confirmar Contraseña"
        placeholderTextColor="#8D8D8D"
        secureTextEntry
      />

      {/* Términos y condiciones */}
      <View className="flex flex-row items-center justify-between w-full mb-6">
        <Text className="text-white font-medium">
          Aceptar Términos y Condiciones
        </Text>
        <Switch value={true} />
      </View>

      {/* Botón de registro */}
      <Pressable className="bg-[#E8B21A] items-center justify-center py-3 px-8 rounded-md w-full">
        <Text className="font-bold text-2xl text-center text-white">
          Registrarse
        </Text>
      </Pressable>

      {/* Enlace al índice */}
      <Link className="font-normal text-lg text-white mt-6 flex items-center flex-row" href="/">
        <HomeIcon className="mr-2" />
        Volver al inicio
      </Link>
    </View>
  );
}
