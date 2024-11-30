import { View, Text, Pressable, Image } from "react-native";
import { useCourseStore } from "@/stores/courseStore";
import { WebView } from "react-native-webview";
import { router } from "expo-router";

export default function TopicMultiMediaScreen() {
  const { selectedCourse, selectedTopic } = useCourseStore();

  return (
    <View className="flex-1 bg-[#1B1E1A] p-6">
      {/* Título del curso */}
      <Text
        className="text-white text-3xl font-bold mb-6"
        style={{ color: selectedCourse?.color }}
      >
        {selectedCourse?.name}
      </Text>

      {/* Título del tema */}
      <Text
        className="text-white text-3xl font-bold mb-6"
        style={{ color: selectedCourse?.color }}
      >
        {selectedTopic?.name}
      </Text>

      {/* Mostrar video de YouTube */}
      {selectedTopic?.multimediaContent.videoLink ? (
        <View style={{ height: 200, marginBottom: 20 }}>
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

      <Text className="text-white text-3xl">
        Descripción
      </Text>

      <Text className="text-white text-lg">
        {selectedTopic?.multimediaContent.description}
      </Text>

      <Pressable
        className="bg-[#262A28] p-4 rounded-md mt-6"
        style={{ backgroundColor: selectedCourse?.color }}
        onPress={() => router.push(`./evaluations`)}
      >
        <Text className="text-white text-lg font-bold">Ver Ejercicios</Text>
      </Pressable>


    </View>
  );
}

// Función para extraer el ID de un video de YouTube
function getYouTubeVideoId(url: string) {
  const match = url.match(
    /(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be\.com\/(?:watch\?v=|v\/|embed\/|shorts\/))([\w-]{11})/
  );
  return match ? match[1] : null;
}
