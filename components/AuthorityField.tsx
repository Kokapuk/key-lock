import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import StyleVars from '../styles/styleVars';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  label: string;
  secureTextEntry?: boolean;
}

const AuthorityField = ({ label, secureTextEntry: defaultSecureTextEntry }: Props) => {
  const [secureTextEntry, setSecureTextEntry] = useState(defaultSecureTextEntry);
  const colorAnimation = useSharedValue(0);

  const animatedTextStyle = useAnimatedStyle(() => ({
    color: interpolateColor(colorAnimation.value, [0, 1], ['rgba(255, 255, 255, .5)', StyleVars.accent]),
  }));

  const animatedInputBorderStyle = useAnimatedStyle(() => ({
    borderColor: interpolateColor(colorAnimation.value, [0, 1], ['rgba(255, 255, 255, .25)', StyleVars.accent]),
  }));

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.label, animatedTextStyle]}>{label}</Animated.Text>
      <Animated.View style={[styles.inputContainer, animatedInputBorderStyle]}>
        <TextInput
          onFocus={() => (colorAnimation.value = withTiming(1, { duration: StyleVars.animationDuration }))}
          onBlur={() => (colorAnimation.value = withTiming(0, { duration: StyleVars.animationDuration }))}
          selectionColor={StyleVars.accent}
          cursorColor={StyleVars.accent}
          style={styles.input}
          secureTextEntry={secureTextEntry}
          returnKeyType="next"
          autoCapitalize={'none'}
          autoCorrect={false}
        />
        {defaultSecureTextEntry && (
          <TouchableOpacity style={styles.exposePasswordButton} onPress={() => setSecureTextEntry((prev) => !prev)}>
            <Icon name={secureTextEntry ? 'eye' : 'eye-off'} style={styles.eyeIcon} />
          </TouchableOpacity>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: StyleVars.borderRadius,
    flexDirection: 'row',
  },
  input: {
    height: 57,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 22,
    paddingHorizontal: 15,
    color: 'white',
    flex: 1,
  },
  exposePasswordButton: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  eyeIcon: {
    color: 'rgba(255, 255, 255, .5)',
    fontSize: 23,
    marginRight: 10,
  },
});

export default AuthorityField;
