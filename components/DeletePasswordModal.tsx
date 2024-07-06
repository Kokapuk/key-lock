import useEditorStore from '@/store/editor';
import usePasswordsStore from '@/store/passwords';
import Api from '@/utils/api';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import Button from './Button';
import Modal from './Modal';

interface Props {
  triggerStyle: StyleProp<ViewStyle>;
  triggerIconStyle: StyleProp<TextStyle>;
}

const DeletePasswordModal = ({ triggerStyle, triggerIconStyle }: Props) => {
  const [isOpen, setOpen] = useState(false);
  const { selectedPassword, draftPassword, setLoading, isLoading } = useEditorStore();
  const { query, fetch: fetchPasswords } = usePasswordsStore();
  const navigation = useNavigation<NavigationProp<any>>();

  if (!selectedPassword || !draftPassword) {
    return null;
  }

  const removePassword = async () => {
    setOpen(false);
    setLoading(true);

    try {
      setOpen(false);

      await Api.remove(draftPassword._id);
      await fetchPasswords(query);

      navigation.navigate('Home');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onPress={() => setOpen(true)}
        loading={isLoading}
        style={triggerStyle}
        iconStyle={triggerIconStyle}
        iconName="trash"
      >
        Delete
      </Button>
      <Modal open={isOpen} onClose={() => setOpen(false)} title="Confirm action">
        <Text style={styles.question}>
          Are you sure you want to delete <Text style={styles.bold}>{selectedPassword.name}</Text>?
        </Text>
        <View style={styles.actions}>
          <Button style={styles.lowAttentionButton} onPress={removePassword}>
            Yes
          </Button>
          <Button onPress={() => setOpen(false)}>No</Button>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  question: {
    color: 'white',
    fontSize: 18,
    marginBottom: 25,
    textAlign: 'center',
  },
  bold: {
    fontWeight: '700',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 35,
  },
  lowAttentionButton: {
    backgroundColor: 'rgba(255, 255, 255, .065)',
  },
});

export default DeletePasswordModal;
