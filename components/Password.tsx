import React from 'react';
import { Image, Pressable, PressableProps, StyleSheet, Text, View } from 'react-native';
import StyleVars from '../styles/styleVars';
import { Password as PasswordType } from '../utils/types';

interface Props {
  password: PasswordType;
  onPress?: PressableProps['onPress'];
}

const Password = ({ password, ...props }: Props) => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} android_ripple={{ color: 'rgba(255, 255, 255, 0.2)' }} {...props}>
        <Image
          style={styles.image}
          source={{ uri: `https://www.google.com/s2/favicons?domain=${password.website}&sz=128` }}
        />
        <View style={styles.details}>
          <Text style={styles.title}>{password.name}</Text>
          <Text style={styles.caption}>{password.website}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: StyleVars.borderRadiusLarge,
  },
  button: {
    width: '100%',
    gap: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 40,
    width: 40,
  },
  details: {
    gap: 2,
  },
  title: {
    fontSize: 19,
    lineHeight: 19,
    fontWeight: '700',
    color: 'white',
  },
  caption: {
    fontSize: 13,
    lineHeight: 13,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.5)',
  },
});

export default Password;
