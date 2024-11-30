import { Link } from 'expo-router';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useState } from 'react';
import { HomeIcon } from '../components/Icons';
import { createStudent } from '@/lib/firebase/examples';

export default function Testeo2Screen() {
  const [jsonInput, setJsonInput] = useState('');
  const [parsedObject, setParsedObject] = useState<any>(null);

  const handleJsonParse = async () => {
    try {
      // Parsear el JSON ingresado
      const parsedData = JSON.parse(jsonInput);

      // Validar si contiene los campos requeridos
      const requiredFields = [
        'email',
        'firstName',
        'lastName',
        'telephone',
        'profileImgLink',
        'documentType',
        'documentNumber',
        'birthDate',
      ];
      const missingFields = requiredFields.filter((field) => !parsedData[field]);
      if (missingFields.length > 0) {
        Alert.alert(
          'Error',
          `Faltan los siguientes campos en el JSON: ${missingFields.join(', ')}`
        );
        return;
      }

      // Convertir `birthDate` a un objeto Date
      parsedData.birthDate = new Date(parsedData.birthDate);

      // Enviar el objeto a la función `createStudent`
      const studentData = await createStudent(parsedData);
      setParsedObject(studentData);

      Alert.alert('Éxito', 'Estudiante creado correctamente.');
    } catch (error) {
      console.error('Error al procesar el JSON:', error);
      Alert.alert('Error', 'JSON inválido o error al crear el estudiante.');
    }
  };

  return (
    <View className="bg-orange-500 p-4">
      <Text className="font-bold text-4xl mb-4">Teteo</Text>
      <Link className="font-normal text-2xl text-white mb-4" href="/">
        <HomeIcon /> Index
      </Link>

      <Text className="font-normal text-xl text-white mb-2">Introduce un JSON:</Text>
      <TextInput
        value={jsonInput}
        onChangeText={setJsonInput}
        placeholder="Escribe tu JSON aquí"
        multiline
        numberOfLines={6}
        style={{
          backgroundColor: 'white',
          padding: 10,
          borderRadius: 5,
          marginBottom: 10,
          height: 150,
          textAlignVertical: 'top',
        }}
      />
      <Button title="Convertir y Enviar" onPress={handleJsonParse} color="#fff" />
    </View>
  );
}
