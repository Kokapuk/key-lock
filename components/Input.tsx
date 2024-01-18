import React from 'react';
import { StyleProp, StyleSheet, Text, TextInput, TextInputProps, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from './Button';
import StyleVars from '../styles/styleVars';

interface Props {
  style?: StyleProp<ViewStyle>;
}

const Input = ({
  style,
  ...props
}: Props & Omit<TextInputProps, 'style' | 'placeholderTextColor' | 'selectionColor'>) => {
  return (
    <View style={[styles.container, style]}>
      <Icon style={styles.icon} name="search" />
      <TextInput
        {...props}
        style={styles.input}
        placeholderTextColor="rgba(255, 255, 255, 0.25)"
        selectionColor={StyleVars.accent}
        cursorColor={StyleVars.accent}
      />
      <Button
        style={styles.clearButton}
        containerStyle={styles.clearButtonContainer}
        iconStyle={styles.clearIcon}
        iconName="close"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingLeft: 10,
    height: 35,
    gap: 10,
    borderRadius: StyleVars.borderRadius,
    overflow: 'hidden',
  },
  icon: {
    height: '100%',
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.25)',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  input: {
    flex: 1,
    color: 'white',
    padding: 0,
    fontSize: 14,
  },
  clearButtonContainer: {
    borderRadius: 0,
  },
  clearButton: {
    height: '100%',
    backgroundColor: 'transparent',
    width: 40,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  clearIcon: {
    color: 'rgba(255, 255, 255, 0.25)',
  },
});

export default Input;
