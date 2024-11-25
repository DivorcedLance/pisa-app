import { Link } from 'expo-router';
import { View, Text, Image, Pressable } from 'react-native';
import { HomeIcon } from '../../components/Icons';

export default function MainScreen() {
  return (
    <View className='bg-[#535353] flex flex-1'>
        <View className='flex flex-1 justify-center items-center bg-[#1B1E1A]'>
            <Image source={require('../../assets/images/pisapp-login-logo.png')} className='w-52 h-52 mb-7' />
            <Text className='font-bold text-4xl flex gap-7 color-white'>PisApp</Text>
            <Pressable className='bg-[#E8B21A] items-center justify-center py-3 px-8 mt-8 rounded-md elevation'>
                <Text className='font-bold tracking-wider text-center color-white text-sm'>Iniciar Sesión</Text>
            </Pressable>
            <Pressable className='bg-[#000000] items-center justify-center py-3 px-8 mt-8 rounded-md elevation'>
                <Text className='font-bold tracking-wider text-center color-white text-sm'>Registrarse</Text>
            </Pressable>
        </View>
        <Link className='font-normal text-2xl text-white' href="/">
        <HomeIcon /> Index
      </Link>
    </View>
  );
}