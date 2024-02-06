import useEditorStore from '@/store/editor';
import StyleVars from '@/styles/styleVars';
import { Image, StyleSheet, TextInput, View } from 'react-native';
import Animated, { Easing, FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';
import AddFieldModal from './AddFieldModal';
import IntegrationModal from './IntegrationModal';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const PasswordTitle = () => {
  const { isEditing, selectedPassword, draftPassword, setDraftPassword } = useEditorStore();

  if (!selectedPassword || !draftPassword) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: `https://www.google.com/s2/favicons?domain=${selectedPassword.website}&sz=128` }}
      />
      <AnimatedTextInput
        style={styles.input}
        value={draftPassword.name}
        placeholderTextColor={StyleVars.placeholder}
        onChangeText={(name) => setDraftPassword((prev) => prev && { ...prev, name })}
        placeholder="Title"
        editable={isEditing}
        selectionColor={StyleVars.accent}
        layout={LinearTransition.duration(StyleVars.animationDuration).easing(Easing.inOut(Easing.ease))}
      />
      {isEditing && (
        <Animated.View
          style={styles.buttons}
          entering={FadeIn.duration(StyleVars.animationDuration).easing(Easing.out(Easing.ease))}
          exiting={FadeOut.duration(StyleVars.animationDuration).easing(Easing.in(Easing.ease))}
        >
          <IntegrationModal triggerStyle={styles.button} triggerIconStyle={styles.buttonIcon} />
          <AddFieldModal triggerStyle={styles.button} triggerIconStyle={styles.buttonIcon} />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 25,
  },
  image: {
    height: 48,
    width: 48,
    borderRadius: StyleVars.borderRadius,
  },
  input: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    gap: 7,
  },
  button: {
    padding: 5,
  },
  buttonIcon: {
    fontSize: 22,
    color: 'rgba(255, 255, 255, .5)',
  },
});

export default PasswordTitle;
