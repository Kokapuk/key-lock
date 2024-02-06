import ErrorModal from '@/components/ErrorModal';
import useEditorStore from '@/store/editor';
import StyleVars from '@/styles/styleVars';
import simplifyUrl from '@/utils/simplifyUrl';
import validateHostname from '@/utils/validateHostname';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Keyboard, StyleSheet } from 'react-native';
import Animated, { Easing, FadeIn, FadeOut, LayoutAnimationConfig } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from './Button';
import DeletePasswordModal from './DeletePasswordModal';
import IconButton from './IconButton';


const EditorHeader = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const { selectedPassword, isEditing, draftPassword, setEditing, setDraftPassword, savePassword, isLoading } =
    useEditorStore();
  const [invalidCredentialsTrigger, setInvalidCredentialsTrigger] = useState(0);

  if (!selectedPassword || !draftPassword) {
    return null;
  }

  const handleCancel = () => {
    setDraftPassword(JSON.parse(JSON.stringify(selectedPassword)));
    setEditing(false);
  };

  const handleSavePassword = () => {
    Keyboard.dismiss();

    if (!validateHostname(simplifyUrl(draftPassword.website))) {
      setInvalidCredentialsTrigger(prev => prev + 1);
      return;
    }

    setDraftPassword(prev => prev ? ({ ...prev, website: simplifyUrl(prev.website) }) : undefined);
    savePassword();
  };

  return (
    <>
      <SafeAreaView style={styles.header} edges={['top', 'right', 'left']}>
        <LayoutAnimationConfig skipEntering>
          {isEditing ? (
            <Animated.View
              key='editing'
              style={styles.container}
              entering={FadeIn.delay(StyleVars.animationDuration)
                .duration(StyleVars.animationDuration)
                .easing(Easing.inOut(Easing.ease))}
              exiting={FadeOut.duration(StyleVars.animationDuration).easing(Easing.inOut(Easing.ease))}
            >
              <IconButton
                disabled={isLoading}
                style={[styles.iconButton, styles.separatedButton]}
                onPress={handleCancel}
                iconName='close'
                iconStyle={styles.iconButtonIcon}
              />
              <IconButton
                style={styles.iconButton}
                iconStyle={styles.iconButtonIcon}
                iconName='checkmark'
                onPress={handleSavePassword}
                loading={isLoading}
              />
            </Animated.View>
          ) : (
            <Animated.View
              key='viewing'
              style={styles.container}
              entering={FadeIn.delay(StyleVars.animationDuration)
                .duration(StyleVars.animationDuration)
                .easing(Easing.inOut(Easing.ease))}
              exiting={FadeOut.duration(StyleVars.animationDuration).easing(Easing.inOut(Easing.ease))}
            >
              <IconButton
                disabled={isLoading}
                style={[styles.iconButton, styles.separatedButton]}
                onPress={() => navigation.goBack()}
                iconName='arrow-back'
                iconStyle={styles.iconButtonIcon}
              />
              <DeletePasswordModal triggerIconStyle={styles.buttonIcon} triggerStyle={styles.button} />
              <Button
                disabled={isLoading}
                style={styles.button}
                iconStyle={styles.buttonIcon}
                iconName='pencil'
                onPress={() => setEditing(true)}
              >
                Edit
              </Button>
            </Animated.View>
          )}
        </LayoutAnimationConfig>
      </SafeAreaView>
      <ErrorModal message='"Website" field has wrong value, make sure you provide a valid domain name'
                  openTrigger={invalidCredentialsTrigger} />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: StyleVars.screenPadding,
    paddingHorizontal: StyleVars.screenPadding,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
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
