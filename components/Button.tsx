import StyleVars from '@/styles/styleVars';
import { useMemo } from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Animated, { Easing, FadeIn, FadeOut, Layout } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

const AnimatedActivityIndicator = Animated.createAnimatedComponent(ActivityIndicator);

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
  const layoutAnimation = useMemo(() => Layout.duration(StyleVars.animationDuration).easing(Easing.ease), []);

  return (
    <View style={[styles.container, containerStyle]}>
      <Pressable
        {...props}
        disabled={props.disabled || loading}
        style={[styles.button, style]}
        android_ripple={{ color: 'rgba(255, 255, 255, 0.35)', ...props.android_ripple }}
      >
        <Animated.View style={styles.buttonContent} layout={layoutAnimation}>
          {!!iconName && <Icon name={iconName} style={[styles.icon, iconStyle]} />}
          {!!children && <Text style={[styles.title, titleStyle]}>{children}</Text>}
        </Animated.View>
        {loading && (
          <AnimatedActivityIndicator color="white" entering={FadeIn} exiting={FadeOut} layout={layoutAnimation} />
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
});

export default Button;
