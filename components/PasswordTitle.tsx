import useEditorStore from '@/store/editor';
import StyleVars from '@/styles/styleVars';
import { Image, StyleSheet, TextInput, View } from 'react-native';
import Animated, { Easing, LinearTransition } from 'react-native-reanimated';
import AddFieldModal from './AddFieldModal';

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
      {isEditing && <AddFieldModal />}
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
});

export default PasswordTitle;
