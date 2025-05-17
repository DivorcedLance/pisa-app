import { Link, useRouter } from 'expo-router';
import { View, Text, Alert, Pressable } from 'react-native';
import { HomeIcon } from '@/components/Icons';
import { useAuthStore } from '@/stores/authStore';


export default function AdminScreen() {
    const router = useRouter();
    const { user, logout } = useAuthStore();
    const handleLogout = async () => {
        try {
            await logout();
            router.replace("/login/email"); // Redirige al login después de cerrar sesión
        } catch (error: any) {
            Alert.alert("Error", "No se pudo cerrar sesión: " + error.message);
        }
    };
    return (
        <View className='flex gap-5'>
            <Text className='font-bold text-4xl flex gap-7'>
                <HomeIcon /> Panel
            </Text>

            <View className='bg-blue-400'>
                <Link className='font-normal text-2xl text-white' href="./login/register">
                    Register
                </Link>




            </View>
            <Pressable className="flex justify-center items-center h-[50px] px-8 rounded elevation me-2 bg-[#DB0E0E] mt-2" onPress={handleLogout}>
                <Text className="text-[20px] font-normal tracking-wide color-white">Cerrar Sesión</Text>
            </Pressable>
        </View>
    );
}