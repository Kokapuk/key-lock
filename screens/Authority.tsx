import { ReactNode } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeOut } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import StyleVars from '../styles/styleVars';

interface Props {
  title: string;
  caption: string;
  children: ReactNode;
  actionTitle: string;
  question: string;
  alternateActionTitle: string;
  error: string | null;
  onSubmit(): void;
}

const Authority = ({ title, caption, children: fields, actionTitle, question, alternateActionTitle, error, onSubmit }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.icon} source={require('../assets/icon.png')} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.caption}>{caption}</Text>
      <View style={styles.fieldsContainer}>{fields}</View>
      <Button onPress={onSubmit} containerStyle={styles.buttonContainer} style={styles.button} titleStyle={styles.buttonTitleStyle}>
        {actionTitle}
      </Button>
      <View style={styles.alternativeActionContainer}>
        <Text style={styles.question}>{question}</Text>
        <TouchableOpacity>
          <Text style={styles.alternateActionTitle}>{alternateActionTitle}</Text>
        </TouchableOpacity>
      </View>
      {!!error && (
        <Animated.Text entering={FadeInDown.duration(200)} exiting={FadeOut.duration(200)} style={styles.error}>
          {error}
        </Animated.Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    // backgroundColor: StyleVars.bgDark,
    paddingHorizontal: StyleVars.screenHorizontalPadding,
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
    gap: 2,
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
