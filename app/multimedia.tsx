import { View, Text, Pressable, Image, ScrollView } from "react-native";
import { useCourseStore } from "@/stores/courseStore";
import { WebView } from "react-native-webview";
import { router, Stack } from "expo-router";

export default function TopicMultiMediaScreen() {
  const { selectedCourse, selectedTopic } = useCourseStore();

  return (
    <>
      <Stack.Screen
        options={{
          title: "Multimedia",
          headerTitleStyle: { fontSize: 18 }, // Estilos personalizados
        }}
      />
      <View className="flex-1 bg-[#1B1E1A]">
        <ScrollView
          contentContainerStyle={{
            padding: 24,
            paddingBottom: 100 // Espacio extra para que los botones sean visibles
          }}
        >
          {/* Título del curso */}
          <View className={`flex-row p-2 pl-5 bg-[${selectedCourse?.color}] w-3/6 -inset-x-6`}
            style={{ borderTopRightRadius: 10, borderBottomRightRadius: 10 }}
          >
            <Text
              className="text-white text-3xl font-bold"
              style={{
                color: "white",
                textShadowColor: "black",
                textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 2,
              }}
            >
              {selectedCourse?.name}
            </Text>
          </View>

          {/* Título del tema */}
          <Text
            className="text-white text-lg font-bold mb-6 mt-2"
            style={{ color: "white" }}
          >
            Tema: {selectedTopic?.name}
          </Text>

          {/* Mostrar video de YouTube */}
          {selectedTopic?.multimediaContent.videoLink ? (
            <View style={{ height: 200, marginBottom: 20 }} className="rounded-3xl overflow-hidden">
              <WebView
                source={{
                  uri: `https://www.youtube.com/embed/${getYouTubeVideoId(
                    selectedTopic.multimediaContent.videoLink
                  )}`,
                }}
                style={{ borderRadius: 10 }}
                javaScriptEnabled
                domStorageEnabled
              />
            </View>
          ) : null}

          {/* Mostrar imagen */}
          {selectedTopic?.multimediaContent.imageLink ? (
            <Image
              source={{ uri: selectedTopic.multimediaContent.imageLink }}
              style={{
                width: "100%",
                height: 200,
                borderRadius: 10,
                marginBottom: 20,
              }}
              resizeMode="cover"
            />
          ) : null}

          <View className={`flex-row pl-5 mt-4 bg-white w-2/6 -inset-x-6`} >
            <Text className="text-black text-xl font-bold">
              Descripción
            </Text>
          </View>

          <View className="flex-1 bg-[#1B1E1A]">
            <Text className="text-white text-lg mt-4">
              {selectedTopic?.multimediaContent.description}
            </Text>
          </View>

          <Pressable
            className="bg-[#262A28] p-4 rounded-md mt-6 self-center items-center"
            style={{ backgroundColor: selectedCourse?.color, width: "35%" }}
            onPress={() => router.push(`./evaluations`)}
          >
            <Text className="text-white text-lg font-bold">Ver Ejercicios</Text>
          </Pressable>
        </ScrollView>



      </View>
    </>
  );
}

// Función para extraer el ID de un video de YouTube
function getYouTubeVideoId(url: string) {
  const match = url.match(
    /(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be\.com\/(?:watch\?v=|v\/|embed\/|shorts\/))([\w-]{11})/
  );
  return match ? match[1] : null;
}
