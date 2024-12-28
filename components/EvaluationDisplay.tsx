import React, { useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import { QuestionDisplay } from "@/components/QuestionDisplay";
import { SolutionDisplay } from "@/components/SolutionDisplay";
import { Evaluation } from "@/lib/firebase/evaluation";

type EvaluationDisplayProps = {
  evaluation: Evaluation;
  studentId: string;
};

export const EvaluationDisplay: React.FC<EvaluationDisplayProps> = ({ evaluation, studentId }) => {
  if (!studentId) {
    Alert.alert("Error", "El ID del estudiante es requerido");
    return null;
  }

  if (!evaluation?.id) {
    Alert.alert("Error", "El ID de la evaluación es requerido");
    return null;
  }

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [showSolution, setShowSolution] = useState(false);

  const currentQuestion = evaluation.questions[currentQuestionIndex];

  const handleOptionSelect = (index: number) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[currentQuestionIndex] = index;
    setSelectedOptions(updatedOptions);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < evaluation.questions.length - 1) {
      setShowSolution(false);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Finaliza la evaluación y genera el objeto
      const currentScore = evaluation.questions.reduce((score, question, index) => {
        return selectedOptions[index] === question.correctOptionIndex
          ? score + question.score
          : score;
      }, 0);

      const result = {
        studentId,
        evaluationId: evaluation.id,
        selectedOptionIndexs: selectedOptions,
        currentScore,
        date: new Date(),
      };

      console.log(result);
      Alert.alert("Evaluación completada", "Revisa la consola para los resultados");
    }
  };

  return (
    <View className="flex-1 bg-[#1B1E1A] p-4">
      {/* Información de la evaluación */}
      <Text className="text-white text-2xl font-bold mb-4">
        Nivel: {evaluation.level.name} (Pregunta {currentQuestionIndex + 1} de{" "}
        {evaluation.questions.length})
      </Text>

      {/* Pregunta actual */}
      <QuestionDisplay
        question={currentQuestion}
        selectedOptionIndex={selectedOptions[currentQuestionIndex]}
        onSelectOption={handleOptionSelect}
      />

      {/* Mostrar solución */}
      {showSolution && <SolutionDisplay solution={currentQuestion.solution} />}

      {/* Botón para mostrar solución */}
      <Button
        title="Ver solución"
        onPress={() => setShowSolution(!showSolution)}
        color="#4CAF50" 
      />



      {/* Botón para continuar */}
      <Button
        title={
          currentQuestionIndex < evaluation.questions.length - 1
            ? "Siguiente pregunta"
            : "Finalizar evaluación"
        }
        onPress={handleNextQuestion}
        color="#2196F3"
      />
    </View>
  );
};
