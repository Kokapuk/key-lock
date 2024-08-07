import Button from '@/components/Button';
import StyleVars from '@/styles/styleVars';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ReactNode } from 'react';
import { Image, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  title: string;
  caption: string;
  children: ReactNode;
  actionTitle: string;
  question: string;
  alternateAuthTitle: string;
  alternateAuthScreen: string;
  error: string | null;
  loading: boolean;
  onSubmit(): void;
}

const Authority = ({
  title,
  caption,
  children: fields,
  actionTitle,
  question,
  alternateAuthTitle,
  alternateAuthScreen,
  error,
  loading,
  onSubmit,
}: Props) => {
  const navigation = useNavigation<NavigationProp<any>>();

  const handleActionPress = () => {
    Keyboard.dismiss();
    onSubmit();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="position">
        <Image style={styles.icon} source={require('../assets/icon.png')} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.caption}>{caption}</Text>
        <View style={styles.fieldsContainer}>{fields}</View>
        <Button
          onPress={handleActionPress}
          containerStyle={styles.buttonContainer}
          style={styles.button}
          titleStyle={styles.buttonTitleStyle}
          loading={loading}
        >
          {actionTitle}
        </Button>
        <View style={styles.alternativeActionContainer}>
          <Text style={styles.question}>{question}</Text>
          <TouchableOpacity onPress={() => navigation.navigate(alternateAuthScreen)}>
            <Text style={styles.alternateActionTitle}>{alternateAuthTitle}</Text>
          </TouchableOpacity>
        </View>
        {!!error && (
          <Animated.Text
            entering={FadeIn.duration(StyleVars.animationDuration)}
            exiting={FadeOut.duration(StyleVars.animationDuration)}
            style={styles.error}
          >
            {error}
          </Animated.Text>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: StyleVars.screenPadding,
  },
  icon: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
    height: 100,
    width: 100,
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 27,
    textAlign: 'center',
    marginBottom: 4,
  },
  caption: {
    color: 'rgba(255, 255, 255, .5)',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 19,
    textAlign: 'center',
    marginBottom: 28,
  },
  fieldsContainer: {
    gap: 16,
    marginBottom: 22,
  },
  buttonContainer: {
    marginBottom: 33,
  },
  button: {
    height: 56,
  },
  buttonTitleStyle: {
    fontWeight: '600',
  },
  alternativeActionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
  },
  question: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 16,
    color: 'white',
  },
  alternateActionTitle: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 16,
    color: StyleVars.accent,
  },
  error: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 16,
    color: StyleVars.danger,
    textAlign: 'center',
    marginTop: 5,
  },
});

export default Authority;
