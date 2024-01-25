import StyleVars from '@/styles/styleVars';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from './BackButton';
import Button from './Button';

const EditorHeader = () => {
  return (
    <SafeAreaView style={styles.header} edges={['top', 'right', 'left']}>
      <BackButton />
      <Button style={styles.button} iconStyle={styles.buttonIcon} iconName="trash">
        Delete
      </Button>
      <Button style={styles.button} iconStyle={styles.buttonIcon} iconName="pencil">
        Edit
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
    paddingTop: StyleVars.screenPadding,
    paddingHorizontal: StyleVars.screenPadding,
  },
  button: {
    paddingHorizontal: 7,
    paddingVertical: 5,
    backgroundColor: 'rgba(255, 255, 255, .065)',
  },
  buttonIcon: {
    color: 'rgba(255, 255, 255, .5)',
    fontSize: 16,
  },
});

export default EditorHeader;
