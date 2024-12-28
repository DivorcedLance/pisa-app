import React from "react";
import { View, Text } from "react-native";

type SolutionDisplayProps = {
  solution: string;
};

export const SolutionDisplay: React.FC<SolutionDisplayProps> = ({ solution }) => {
  return (
    <View className="bg-[#333] p-4 rounded-md mt-4">
      <Text className="text-white font-bold mb-2">Solución:</Text>
      <Text className="text-white">{solution}</Text>
    </View>
  );
};
