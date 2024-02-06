import useEditorStore from '@/store/editor';
import StyleVars from '@/styles/styleVars';
import generateRandomString from '@/utils/generateRandomString';
import { Field as FieldType, Password } from '@/utils/types';
import * as Clipboard from 'expo-clipboard';
import * as Linking from 'expo-linking';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { Easing, FadeIn, FadeOut } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

interface Props {
  field: FieldType;
  isWebsite?: boolean;
}

const Field = ({ field, isWebsite }: Props) => {
  const { selectedPassword, isEditing, setDraftPassword } = useEditorStore();

  const handleChange = (value: string) => {
    setDraftPassword((prev) => {
      if (!prev) {
        return prev;
      }

      const prevState: Password = JSON.parse(JSON.stringify(prev));

      if (!prevState.credentials.fields) {
        return prev;
      }

      const index = prevState.credentials.fields.findIndex((item) => item._id === field._id);
      prevState.credentials.fields[index].value = value;

      return prevState;
    });
  };

  const handleWebsiteChange = (value: string) => {
    setDraftPassword(
      (prev) =>
        prev && {
          ...prev,
          website: value,
        }
    );
  };

  const toggleExposed = () => {
    if (!isEditing && !selectedPassword?.credentials.fields?.find((item) => item._id === field._id)?.isPassword) {
      return;
    }

    setDraftPassword((prev) => {
      const prevState: Password = JSON.parse(JSON.stringify(prev));

      if (!prevState.credentials.fields) {
        return prev;
      }

      const index = prevState.credentials.fields.findIndex((item) => item._id === field._id);
      prevState.credentials.fields[index].isPassword = !prevState.credentials.fields[index].isPassword;

      return prevState;
    });
  };

  const handleRemove = () => {
    setDraftPassword((prev) => {
      const prevState: Password = JSON.parse(JSON.stringify(prev));

      if (!prevState.credentials.fields) {
        return prev;
      }

      prevState.credentials.fields = prevState.credentials.fields.filter((item) => item._id !== field._id);

      return prevState;
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>{field.title}</Text>
        <TextInput
          onChangeText={(text) => (isWebsite ? handleWebsiteChange(text) : handleChange(text))}
          selectionColor={StyleVars.accent}
          style={styles.input}
          value={field.value}
          autoCapitalize="none"
          autoCorrect={false}
          editable={isEditing}
          secureTextEntry={field.isPassword}
        />
      </View>
      {!isWebsite && isEditing && (
        <>
          <AnimatedTouchableOpacity
            style={styles.button}
            onPress={handleRemove}
            entering={FadeIn.duration(StyleVars.animationDuration).easing(Easing.inOut(Easing.ease))}
            exiting={FadeOut.duration(StyleVars.animationDuration).easing(Easing.inOut(Easing.ease))}
          >
            <Icon style={styles.buttonIcon} name="trash" />
          </AnimatedTouchableOpacity>
          <AnimatedTouchableOpacity
            style={styles.button}
            onPress={() => handleChange(generateRandomString())}
            entering={FadeIn.duration(StyleVars.animationDuration).easing(Easing.inOut(Easing.ease))}
            exiting={FadeOut.duration(StyleVars.animationDuration).easing(Easing.inOut(Easing.ease))}
          >
            <Icon style={styles.buttonIcon} name="key" />
          </AnimatedTouchableOpacity>
        </>
      )}
      {!isWebsite &&
        (isEditing || selectedPassword?.credentials.fields?.find((item) => item._id === field._id)?.isPassword) && (
          <AnimatedTouchableOpacity
            style={styles.button}
            onPress={toggleExposed}
            entering={FadeIn.duration(StyleVars.animationDuration).easing(Easing.inOut(Easing.ease))}
            exiting={FadeOut.duration(StyleVars.animationDuration).easing(Easing.inOut(Easing.ease))}
          >
            <Icon style={styles.buttonIcon} name={field.isPassword ? 'eye' : 'eye-off'} />
          </AnimatedTouchableOpacity>
        )}
      {isWebsite && field.value && (
        <AnimatedTouchableOpacity
          style={styles.button}
          onPress={() => Linking.openURL(`http://${field.value}`)}
          entering={FadeIn.duration(StyleVars.animationDuration).easing(Easing.inOut(Easing.ease))}
          exiting={FadeOut.duration(StyleVars.animationDuration).easing(Easing.inOut(Easing.ease))}
        >
          <Icon style={styles.buttonIcon} name="open-outline" />
        </AnimatedTouchableOpacity>
      )}
      <TouchableOpacity style={styles.button} onPress={() => Clipboard.setStringAsync(field.value)}>
        <Icon style={styles.buttonIcon} name="copy" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    gap: 5,
    flex: 1,
  },
  title: {
    fontSize: 14,
    lineHeight: 17,
    color: 'rgba(255, 255, 255, .5)',
  },
  input: {
    fontSize: 14,
    lineHeight: 17,
    height: 17,
    color: 'white',
  },
  button: {
    padding: 10,
  },
  buttonIcon: {
    fontSize: 17,
    color: 'rgba(255, 255, 255, .5)',
  },
});

export default Field;
