import StyleVars from '@/styles/styleVars';
import React from 'react';
import { ActivityIndicator, TextStyle, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Animated, { Easing, FadeIn, FadeOut, LayoutAnimationConfig } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  iconName: string;
  loading?: boolean;
  iconStyle?: TextStyle;
}

const AnimatedActivityIndicator = Animated.createAnimatedComponent(ActivityIndicator);
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const IconButton = ({ iconName, loading, iconStyle, ...props }: Props & Omit<TouchableOpacityProps, 'children'>) => {
  return (
    <LayoutAnimationConfig skipEntering>
      <TouchableOpacity {...props} disabled={props.disabled || loading}>
        {loading ? (
          <AnimatedActivityIndicator
            size={iconStyle?.fontSize}
            color={iconStyle?.color ?? 'white'}
            entering={FadeIn.duration(StyleVars.animationDuration)}
          />
        ) : (
          <AnimatedIcon
            name={iconName}
            style={iconStyle}
            entering={FadeIn.duration(StyleVars.animationDuration).easing(Easing.linear)}
            exiting={FadeOut.duration(StyleVars.animationDuration).easing(Easing.linear)}
          />
        )}
      </TouchableOpacity>
    </LayoutAnimationConfig>
  );
};

export default IconButton;
