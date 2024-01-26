import useEditorStore from '@/store/editor';
import StyleVars from '@/styles/styleVars';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from './Button';

const EditorHeader = () => {
  const navigation = useNavigation<NavigationProp<any, any>>();

  const { selectedPassword, isEditing, draftPassword, setEditing, setDraftPassword, savePassword } = useEditorStore();

  if (!selectedPassword || !draftPassword) {
    return null;
  }

  const handleCancel = () => {
    setDraftPassword(JSON.parse(JSON.stringify(selectedPassword)));
    setEditing(false);
  };

  return (
    <SafeAreaView style={styles.header} edges={['top', 'right', 'left']}>
      {isEditing ? (
        <>
          <TouchableOpacity style={[styles.iconButton, styles.separatedButton]} onPress={handleCancel}>
            <Icon style={styles.iconButtonIcon} name="close" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon style={styles.iconButtonIcon} name="checkmark" onPress={savePassword} />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity style={[styles.iconButton, styles.separatedButton]} onPress={() => navigation.goBack()}>
            <Icon style={styles.iconButtonIcon} name="arrow-back" />
          </TouchableOpacity>
          <Button style={styles.button} iconStyle={styles.buttonIcon} iconName="trash">
            Delete
          </Button>
          <Button
            style={styles.button}
            iconStyle={styles.buttonIcon}
            iconName="pencil"
            onPress={() => setEditing(true)}
          >
            Edit
          </Button>
        </>
      )}
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
  iconButton: {
    padding: 5,
  },
  iconButtonIcon: {
    fontSize: 20,
    color: 'rgba(255, 255, 255, 1)',
  },
  separatedButton: {
    marginRight: 'auto',
  },
});

export default EditorHeader;
