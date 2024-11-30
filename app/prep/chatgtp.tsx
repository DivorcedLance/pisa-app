
import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, ActivityIndicator, StyleSheet, ScrollView, Animated, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { ChatCompletionMessageParam } from 'openai/resources';
import openai from '@/lib/chatgtp/chatgtpUtils';

const ChatGPT = () => {
    const scrollViewRef = useRef<ScrollView>(null);

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<{ text: string, user: boolean }[]>([]);
    const [isLoading, setLoading] = useState(false);
    const inputOpacity = useRef(new Animated.Value(1)).current;
    const inputHeight = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    }, [messages]);

    const sendMessage = async () => {
        if (!input) return;
        setLoading(true);

        // Añadir el nuevo mensaje del usuario al historial
        const newMessages = [...messages, { text: input, user: true }];
        setMessages(newMessages);
        setInput('');

        // Preparar el historial de mensajes para enviar a la API
        const apiMessages: ChatCompletionMessageParam[] = messages.map((msg) => { //se agregó el tipo de retorno
            const role = msg.user ? 'user' : 'assistant'
            return {
                role: role, // 'user' o 'assistant'
                content: msg.text, // El contenido del mensaje
                
            };
        });


        // Añadir el mensaje del sistema al inicio del historial
        apiMessages.unshift({
            role: "system",
            content: "Responde utilizando solo los siguientes elementos de markdown: Encabezados, Estilos de texto, Citas en bloque, Listas, Código en línea, Bloques de código, Enlaces, Líneas horizontales. Eres el asistente educativo virtual de la app PisApp, ayudas a personas entre primaria y secundaria sobre temas alusivos a las pruebas PISA. Responde en español y tus respuestas deben ser de tamaño pequeño o mediano, a menos que se especifique lo contrario. Puedes negarte a responder cosas no relacionadas a los cursos con la excepción de emergencias. Por favor, evita usar cualquier elemento de markdown no soportado como katex. Asegúrate de que el contenido esté claramente formateado y sea fácil de leer.",

        });

        // Enviar la conversación completa a la API
        try {
            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: apiMessages,
                temperature: 1,
                max_tokens: 600,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            });

            // Añadir la respuesta de la API al historial de mensajes
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: response.choices[0].message.content ?? '', user: false },
            ]);

            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const toggleInput = () => {
        const toValue = isLoading ? 0 : 1;

        Animated.timing(inputHeight, {
            toValue: toValue === 0 ? 0 : 50,
            duration: 500,
            useNativeDriver: false,
        }).start();

        Animated.timing(inputOpacity, {
            toValue,
            duration: 500,
            useNativeDriver: false,
        }).start();
    };

    useEffect(() => {
        toggleInput();
    }, [isLoading]);

    return (
        <View className="flex flex-col flex-1 bg-[#1B1E1A] justify-center items-center w-full px-2">
            <ScrollView ref={scrollViewRef} className="w-full">
                <View>
                    <View className="py-4">
                        {
                            // Agrega un mensaje con cada consulta
                            messages.map((message, index) => (
                                <View key={index}
                                className={`flex items-center justify-center text-white h-auto 
                                    ${message.user ? 'self-end rounded-lg rounded-br-none bg-[#0077A1] p-2 max-w-[70%] mb-4' : 
                                                     'self-start rounded-lg rounded-bl-none bg-[#535353] p-2 max-w-[85%] mb-4'}`}
                                >
                                    <MarkdownRenderer content={message.text} />
                                </View>
                            ))}
                    </View>
                </View>
                {isLoading && (
                    <View>
                        {/* Usar un ActivityIndicator para mostrar el spinner */}
                        <ActivityIndicator size="large" color={'#535353'} />
                    </View>
                )}
            </ScrollView>

            <Animated.View style={[styles.consultContainer, { opacity: inputOpacity, height: inputHeight }]}>
                <TextInput
                    value={input}
                    onChangeText={setInput}
                    className="p-2 text-left text-white font-semibold w-[90%] mr-2"
                    placeholderTextColor={'#b2b2b2'}
                    placeholder="Escriba su consulta..."
                    editable={!isLoading}
                />
                <TouchableOpacity className="flex justify-center items-center w-5 text-center mr-1" onPress={isLoading ? undefined : sendMessage}>
                    <Ionicons name='send-outline' size={20} color='white' />
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1B1E1A',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 10
    },
    chatContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        height: 'auto'
    },
    text: {
        color: "#fff"
    },
    textInput: {
        padding: 10,
        textAlign: 'left',
        color:'#ffffff',
        fontWeight: '600',
        width: '90%',
        marginEnd: 10
    },
    buttonSend: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: 20,
        marginEnd: 5
    },
    userMessage: {
        alignSelf: 'flex-end',
        borderRadius: 10,
        borderBottomEndRadius: 0,
        alignItems: 'flex-start',
        backgroundColor: '#0077A1',
        padding: 10,
        maxWidth: '70%',
        marginBottom: 15
    },
    systemMessage: {
        alignSelf: 'flex-start',
        borderRadius: 10,
        borderBottomLeftRadius: 0,
        alignItems: 'flex-start',
        backgroundColor: '#535353',
        padding: 10,
        maxWidth: '85%',
        marginBottom: 15
    },
    consultContainer: {
        marginBottom: 20,
        marginTop: 10,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        borderRadius: 10,
        backgroundColor: '#535353',
    }
});

export default ChatGPT;
