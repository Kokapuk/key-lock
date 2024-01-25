import Credentials from '@/components/Credentials';
import PasswordTitle from '@/components/PasswordTitle';
import useEditorStore from '@/store/editor';
import StyleVars from '@/styles/styleVars';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Editor = () => {
  const selectedPassword = useEditorStore((state) => state.selectedPassword);

  if (!selectedPassword) {
    return null;
  }

  return (
    <SafeAreaView edges={['right', 'bottom', 'left']} style={styles.container}>
      <PasswordTitle />
      <View style={styles.separator} />
      <Credentials />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: StyleVars.screenPadding,
    paddingTop: 25,
    flex: 1
  },
  separator: {
    marginVertical: 25,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, .15)',
  },
});

export default Editor;
