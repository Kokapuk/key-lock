import {
  Easing,
  EntryAnimationsValues,
  EntryExitAnimationFunction,
  ExitAnimationsValues,
  withTiming,
} from 'react-native-reanimated';
import StyleVars from './styleVars';

const FadeInDown: EntryExitAnimationFunction = (values: EntryAnimationsValues) => {
  'worklet';
  const animations = {
    originY: withTiming(values.targetOriginY, {
      duration: StyleVars.animationDuration,
      easing: Easing.out(Easing.ease),
    }),
    opacity: withTiming(1, { duration: StyleVars.animationDuration, easing: Easing.out(Easing.ease) }),
  };
  const initialValues = {
    originY: values.targetOriginY + 100,
    opacity: 0,
  };

  return {
    initialValues,
    animations,
  };
};

const FadeOutDown: EntryExitAnimationFunction = (values: ExitAnimationsValues) => {
  'worklet';
  const animations = {
    originY: withTiming(values.currentOriginY + 100, {
      duration: StyleVars.animationDuration,
      easing: Easing.in(Easing.ease),
    }),
    opacity: withTiming(0, { duration: StyleVars.animationDuration, easing: Easing.in(Easing.ease) }),
  };
  const initialValues = {
    originY: values.currentOriginY,
    opacity: 1,
  };

  return {
    initialValues,
    animations,
  };
};

export { FadeInDown, FadeOutDown };
