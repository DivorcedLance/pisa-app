import { Link } from 'expo-router';
import { View, Text, Image, Pressable, ScrollView } from 'react-native';
import { HomeIcon } from '@/components/Icons';

export default function ProfileScreen() {
    const alumno = {
        idAlumno: "hfsdkjh138fy13",
        profileLinkImg: "https://i.pinimg.com/736x/51/46/17/51461769517902929f28103cde97743f.jpg",
        nombre: "Esteban",
        apellido: "Garcia",
        codigo: "CA-1",
        puntos: 15,
        logros: [
            {
                nombre: "Recien llegando a matematicas!",
                descripcion: "Completa tu primer ejercicio de álgebra.",
                curso: "Matematicas",
                tipo: "bronce",
                puntos: 5
            },
            {
                nombre: "Me siento fragmentado",
                descripcion: "Resuelve correctamente 5 problemas de fracciones.",
                curso: "Matematicas",
                tipo: "bronce",
                puntos: 5
            },
            {
                nombre: "Recien llegando a ciencias!",
                descripcion: "Resuelve tu primer ejercicio de ciencias.",
                curso: "Matematicas",
                tipo: "bronce",
                puntos: 5
            }
        ],
        idTutor: String
    };

    return (
        <ScrollView className="bg-[#1B1E1A] flex-1 p-7" contentContainerStyle={{ paddingBottom: 20 }}>
            <Image source={{ uri: alumno.profileLinkImg }} className="h-[200px] w-[200px] mb-7 self-center rounded-2xl" />
            <Text className="font-bold text-center text-5xl">{alumno.nombre} {alumno.apellido}</Text>
            <Text className="text-center color-[#b2b2b2]">Código: {alumno.codigo}</Text>
            <View className="flex flex-col justify-center items-center mt-8">
                <View className="mx-2">
                    <Text className="text-center text-4xl">Puntos</Text>
                    <Text className="text-center text-7xl">{alumno.puntos}</Text>
                </View>
                <View className="mx-2 w-full">
                    <Text className="text-center text-4xl">Logros</Text>
                    <View className="flex flex-col">
                        {alumno.logros.map((logro, index) => (
                            <View key={index} className="flex flex-row justify-between items-center bg-[#b2b2b2] p-2 my-2">
                                <Text className="text-center text-2xl">{logro.nombre}</Text>
                                <Text className="text-center text-2xl">{logro.puntos}</Text>
                            </View>
                        ))}
                    </View>
                    <Link asChild href={"/prep/achievementsview"}>
                        <Pressable className="flex justify-center items-center h-[50px] px-8 rounded elevation me-2 bg-[#E8B21A] mt-2">
                            <Text className="text-[20px] font-normal leading-5 tracking-wide color-white">Ver Logros</Text>
                        </Pressable>
                    </Link>
                </View>
            </View>
            <Pressable className="flex justify-center items-center py-3 px-8 rounded elevation bg-[#0077A1] mt-16">
                <Text className="text-[20px] font-normal leading-5 tracking-wide color-white">Tutor Asignado</Text>
            </Pressable>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Pressable className="flex justify-center items-center h-[50px] px-8 rounded elevation me-2 bg-[#E8B21A] mt-2">
                    <Text className="text-[20px] font-normal leading-5 tracking-wide color-white">Editar</Text>
                </Pressable>
                <Pressable className="flex justify-center items-center h-[50px] px-8 rounded elevation me-2 bg-[#DB0E0E] mt-2">
                    <Text className="text-[20px] font-normal leading-5 tracking-wide color-white">Cerrar Sesión</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}
