import {
  StackCardInterpolatedStyle,
  StackCardInterpolationProps,
  StackCardStyleInterpolator,
} from '@react-navigation/stack';
import { Animated } from 'react-native';

const forFade: StackCardStyleInterpolator = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const forHorizontalIOS = ({
  current,
  next,
  inverted,
  layouts: { screen },
}: StackCardInterpolationProps): StackCardInterpolatedStyle => {
  const translateFocused = Animated.multiply(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [screen.width, 0],
      extrapolate: 'clamp',
    }),
    inverted
  );

  const translateUnfocused = next
    ? Animated.multiply(
        next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, screen.width * -0.3],
          extrapolate: 'clamp',
        }),
        inverted
      )
    : 0;

  const overlayOpacity = current.progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.15],
    extrapolate: 'clamp',
  });

  const shadowOpacity = current.progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.3],
    extrapolate: 'clamp',
  });

  return {
    cardStyle: {
      transform: [{ translateX: translateFocused }, { translateX: translateUnfocused }],
    },
    overlayStyle: { opacity: overlayOpacity, backgroundColor: 'black' },
    shadowStyle: { shadowOpacity },
  };
}

const TransitionPresets = { forFade, forHorizontalIOS };
export default TransitionPresets;
