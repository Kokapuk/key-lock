import { Pressable, PressableProps, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import StyleVars from '../styles/styleVars';

interface Props {
  children?: string;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<TextStyle>;
  iconName?: string;
}

const Button = ({
  children,
  style,
  titleStyle,
  containerStyle,
  iconStyle,
  iconName,
  ...props
}: Props & Omit<PressableProps, 'children' | 'style'>) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Pressable
        {...props}
        style={[styles.button, style]}
        android_ripple={{ color: 'rgba(255, 255, 255, 0.35)', ...props.android_ripple }}
      >
        {!!iconName && <Icon name={iconName} style={[styles.icon, iconStyle]} />}
        {!!children && <Text style={[styles.title, titleStyle]}>{children}</Text>}
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
    height: 36,
    backgroundColor: StyleVars.accent,
    paddingVertical: 8,
    paddingHorizontal: 13,
    gap: 5,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'center',
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
