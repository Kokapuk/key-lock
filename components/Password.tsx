import StyleVars from '@/styles/styleVars';
import { Password as PasswordType } from '@/utils/types';
import { useMemo } from 'react';
import { Image, Pressable, PressableProps, StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

const AnimatedImage = Animated.createAnimatedComponent(Image);

interface Props {
  password: PasswordType;
  onPress?: PressableProps['onPress'];
}

const Password = ({ password, ...props }: Props) => {
  const firstFieldValue = useMemo(
    () => password.credentials.fields?.find((item) => !item.isPassword)?.value,
    [password.credentials.fields],
  );
  const caption = useMemo(
    () =>
      firstFieldValue
        ? firstFieldValue.substring(0, Math.floor(firstFieldValue.length / 2)) +
        '*'.repeat(firstFieldValue.length - Math.floor(firstFieldValue.length / 2))
        : password.website,
    [firstFieldValue, password.website],
  );

  return (
    <View style={styles.container}>
      <Pressable {...props} style={styles.button} android_ripple={{ color: 'rgba(255, 255, 255, 0.2)' }} disabled={!props.onPress}>
        <Image
          style={styles.image}
          source={{ uri: `https://www.google.com/s2/favicons?domain=${password.website}&sz=128` }}
        />
        <View style={styles.details}>
          <Text style={styles.title}>{password.name}</Text>
          <Text style={styles.caption}>{caption}</Text>
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
    borderRadius: StyleVars.borderRadius,
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
