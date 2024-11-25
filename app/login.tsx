import { Link } from 'expo-router';
import { View, Text, TextInput, Pressable } from 'react-native';
import { HomeIcon } from '../components/Icons';

export default function LoginScreen() {
    return (
        <View className='bg-[#1B1E1A] p-8 flex flex-1 justify-center'>
            <Text className='font-bold text-4xl flex gap-7 color-white'>Ingrese el correo con el{'\n'}que se registró</Text>
            <View className='mb-12'></View>
            <Text className='font-bold text-2xl color-white '>Email</Text>
            <View className='border-b-slate-50 border-b-[1px]'>
                <TextInput className='color-white font-bold text-center p-2' placeholder='Ingrese el correo electrónico'
                placeholderTextColor='#8D8D8D' />
            </View>
            <Pressable className='bg-[#E8B21A] items-center justify-center p-2 mt-8 rounded-md'>
                <Text className='font-bold text-2xl text-center color-black'>Siguiente</Text>
            </Pressable>

            <Link className='font-normal text-2xl text-white' href="/">
        <HomeIcon /> Index
      </Link>
            
        </View>
    );
}