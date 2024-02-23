import Button from '@/components/Button';
import Input from '@/components/Input';
import ErrorModal from '@/components/ErrorModal';
import Modal from '@/components/Modal';
import useEditorStore from '@/store/editor';
import usePasswordsStore from '@/store/passwords';
import Api from '@/utils/api';
import simplifyUrl from '@/utils/simplifyUrl';
import React, { useRef, useState } from 'react';
import { Keyboard, StyleProp, StyleSheet, TextInput, ViewStyle } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

interface Props {
  triggerStyle: StyleProp<ViewStyle>;
}

const CreatePasswordModal = ({ triggerStyle }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorOpenTrigger, setErrorOpenTrigger] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorTitle, setErrorTitle] = useState('');
  const { query, fetch: fetchPasswords } = usePasswordsStore();
  const setSelectedPassword = useEditorStore((state) => state.setSelectedPassword);
  const websiteField = useRef<TextInput>(null);
  const navigation = useNavigation<NavigationProp<any>>();

  const createPassword = async () => {
    Keyboard.dismiss();

    if (name.trim().length < 3) {
      setErrorTitle('Invalid name');
      setErrorMessage('Name must be at least 3 characters');
      return setErrorOpenTrigger((prev) => prev + 1);
    }

    if (!simplifyUrl(website)) {
      setErrorTitle('Invalid website');
      setErrorMessage('"Website" field has wrong value, make sure you provide a valid domain name');
      return setErrorOpenTrigger((prev) => prev + 1);
    }

    setIsLoading(true);

    try {
      const newPassword = await Api.create(name, website);
      await fetchPasswords(query);
      setIsOpen(false);
      setSelectedPassword(newPassword);
      navigation.navigate('Editor');
    } catch (e) {
      setErrorTitle('Oops!');
      setErrorMessage(
        'Something went wrong trying to create password. If you keep getting this message, try again later.'
      );
    } finally {
      setIsLoading(false);
      setName('');
      setWebsite('');
    }
  };

  return (
    <>
      <Modal
        open={isOpen}
        onClose={isLoading ? undefined : () => setIsOpen(false)}
        title="Create password"
        sheetContentStyle={styles.container}
      >
        <Input
          value={name}
          onChangeText={(name) => setName(name)}
          iconName="lock-closed"
          placeholder="Name"
          returnKeyType="next"
          autoCapitalize='words'
          onSubmitEditing={() => websiteField.current?.focus()}
          autoFocus
        />
        <Input
          value={website}
          onChangeText={(website) => setWebsite(website)}
          iconName="globe-outline"
          placeholder="Website"
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          ref={websiteField}
          onSubmitEditing={createPassword}
        />
        <Button loading={isLoading} onPress={createPassword}>
          Create
        </Button>
      </Modal>
      <ErrorModal title={errorTitle} message={errorMessage} openTrigger={errorOpenTrigger} />
      <Button onPress={() => setIsOpen(true)} style={triggerStyle} iconName="add" />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 15,
    alignItems: 'center',
  },
});

export default CreatePasswordModal;
