import StyleVars from '@/styles/styleVars';
import { forwardRef } from 'react';
import { StyleProp, StyleSheet, TextInput, TextInputProps, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from './Button';

interface Props {
  style?: StyleProp<ViewStyle>;
  iconName?: string;
  onClear?(): void;
}

const Input = forwardRef<TextInput, Props & Omit<TextInputProps, 'style' | 'placeholderTextColor' | 'selectionColor'>>(
  ({ style, iconName, onClear, ...props }, ref) => {
    return (
      <View style={[styles.container, style]}>
        {iconName && <Icon style={styles.icon} name={iconName} />}
        <TextInput
          {...props}
          ref={ref}
          style={styles.input}
          placeholderTextColor={StyleVars.placeholder}
          selectionColor={StyleVars.accent}
          cursorColor={StyleVars.accent}
        />
        {props.returnKeyType === 'search' && !!props.value && (
          <Button
            onPress={onClear}
            style={styles.clearButton}
            containerStyle={styles.clearButtonContainer}
            iconStyle={styles.clearIcon}
            iconName="close"
          />
        )}
      </View>
    );
  }
);

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
    color: StyleVars.placeholder,
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
