import useEditorStore from '@/store/editor';
import { Field, Password } from '@/utils/types';
import { Types } from 'mongoose';
import React, { useState } from 'react';
import { StyleProp, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from './Button';
import Input from './Input';
import Modal from './Modal';

interface Props {
  triggerStyle: StyleProp<ViewStyle>;
  triggerIconStyle: StyleProp<TextStyle>;
}

function AddFieldModal({triggerStyle, triggerIconStyle}: Props) {
  const [isOpen, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const setDraftPassword = useEditorStore((state) => state.setDraftPassword);

  const createField = () => {
    if (title.trim() === '') {
      return;
    }

    setDraftPassword((prev) => {
      const prevState: Password = JSON.parse(JSON.stringify(prev));

      if (!prevState.credentials.fields) {
        prevState.credentials.fields = [];
      }

      const field: Field = {
        _id: new Types.ObjectId().toString(),
        title: title,
        isPassword: title.toLocaleLowerCase().includes('password'),
        value: '',
      };
      prevState.credentials.fields.push(field);
      return prevState;
    });

    setTitle('');
    setOpen(false);
  };

  return (
    <>
      <TouchableOpacity style={triggerStyle} onPress={() => setOpen(true)}>
        <Icon name="add" style={triggerIconStyle} />
      </TouchableOpacity>
      <Modal
        open={isOpen}
        onClose={() => setOpen(false)}
        title="Add field"
        children={
          <View style={styles.form}>
            <Input
              value={title}
              onChangeText={(title) => setTitle(title)}
              autoFocus
              autoCapitalize='words'
              iconName="lock-closed"
              placeholder="Title"
              onSubmitEditing={createField}
            />
            <Button onPress={createField}>Create</Button>
          </View>
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 15,
  },
});

export default AddFieldModal;
