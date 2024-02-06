import StyleVars from '@/styles/styleVars';
import { useEffect } from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Animated, { Easing, FadeIn, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';


const AnimatedActivityIndicator = Animated.createAnimatedComponent(ActivityIndicator);
const AniamtedIcon = Animated.createAnimatedComponent(Icon);

interface Props {
  children?: string;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<TextStyle>;
  iconName?: string;
  loading?: boolean;
}

const Button = ({
                  children,
                  style,
                  titleStyle,
                  containerStyle,
                  iconStyle,
                  iconName,
                  loading,
                  ...props
                }: Props & Omit<PressableProps, 'children' | 'style'>) => {

  const contentOpacity = useSharedValue(1);

  useEffect(() => {
    contentOpacity.value = withTiming(loading ? 0 : 1, {
      duration:  StyleVars.animationDuration,
      easing: (loading ? Easing.in : Easing.out)(Easing.ease),
    });
  }, [loading]);

  const animatedContentStyle = useAnimatedStyle(() => ({ opacity: contentOpacity.value }));

  return (
    <View style={[styles.container, containerStyle]}>
      <Pressable
        {...props}
        disabled={props.disabled || loading}
        style={[styles.button, style]}
        android_ripple={{ color: 'rgba(255, 255, 255, 0.35)', ...props.android_ripple }}
      >
        <Animated.View style={styles.buttonContent}>
          {!!iconName && <AniamtedIcon name={iconName} style={[styles.icon, iconStyle, animatedContentStyle]} />}
          {!!children &&
            <Animated.Text style={[styles.title, titleStyle, animatedContentStyle]}>{children}</Animated.Text>}
        </Animated.View>
        {loading && (
          <AnimatedActivityIndicator style={styles.activityIndicator}
                                     color='white'
                                     entering={FadeIn.duration(StyleVars.animationDuration).easing(Easing.out(Easing.ease))}
                                     size={24} />
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: StyleVars.borderRadius,
    overflow: 'hidden',
  },
  button: {
    backgroundColor: StyleVars.accent,
    paddingVertical: 8,
    paddingHorizontal: 13,
    overflow: 'hidden',
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContent: {
    gap: 5,
    flexDirection: 'row',
  },
  title: {
    color: 'white',
    fontSize: 16,
    lineHeight: 20,
    textAlignVertical: 'center',
  },
  icon: {
    color: 'white',
    fontSize: 20,
    lineHeight: 20,
    textAlignVertical: 'center',
  },
  activityIndicator: {
    position: 'absolute',
  },
});

export default Button;
