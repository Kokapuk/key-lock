import StyleVars from '@/styles/styleVars';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const PasswordSkeleton = () => {
  const blinkAnimation = useSharedValue(0.1);

  useEffect(() => {
    blinkAnimation.value = withRepeat(
      withDelay(
        800,
        withSequence(
          withTiming(0.25, { duration: StyleVars.animationDuration, easing: Easing.out(Easing.ease) }),
          withTiming(0.1, { duration: StyleVars.animationDuration, easing: Easing.in(Easing.ease) })
        )
      ),
      -1
    );
  }, []);

  const boneStyle = useAnimatedStyle(() => ({
    backgroundColor: `rgba(255, 255, 255, ${blinkAnimation.value})`,
  }));

  return (
    <Animated.View style={[boneStyle, styles.container]}>
      <Animated.View style={[boneStyle, styles.image]} />
      <Animated.View style={styles.details}>
        <Animated.View style={[boneStyle, styles.title]} />
        <Animated.View style={[boneStyle, styles.caption]} />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: StyleVars.borderRadiusLarge,
    gap: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  details: {
    gap: 5,
    flex: 1,
  },
  title: {
    height: 19,
    borderRadius: 10,
    width: '80%',
  },
  caption: {
    height: 13,
    borderRadius: 7,
    width: '65%',
  },
});

export default PasswordSkeleton;
