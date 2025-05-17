// components/AnimatedStreakBadge.tsx
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import FlameSVG from './svg/FlameSVG'; // Importa el componente SVG
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

type Props = {
  streak: number;
};

const AnimatedView = Animated.createAnimatedComponent(View);

const AnimatedStreakBadge: React.FC<Props> = ({ streak }) => {
  const scale = useSharedValue(1);

  useEffect(() => {
    // Trigger pop animation on streak change
    scale.value = 1.4;
    scale.value = withSpring(1, {
      damping: 5,
      stiffness: 200,
    });
  }, [streak]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedView style={[styles.container, animatedStyle]}>
      <FlameSVG width={50} height={50} />
    <Text
      style={[
        styles.text,
        {
          fontSize:
            streak >= 1000000
              ? 6
              : streak >= 100000
              ? 8
              : streak >= 10000
              ? 10
              : streak >= 1000
              ? 12
              : streak >= 100
              ? 14
              : 16,
        },
      ]}
    >
      {streak}
    </Text>
    </AnimatedView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
  },
  text: {
    position: 'absolute',
    bottom: 30,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default AnimatedStreakBadge;
