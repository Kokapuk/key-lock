import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from './Modal';
import Input from './Input';
import Button from './Button';
import Animated, { Easing, FadeIn, FadeOut } from 'react-native-reanimated';
import StyleVars from '@/styles/styleVars';
import { Field, Password } from '@/utils/types';
import useEditorStore from '@/store/editor';
import { Types } from 'mongoose';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

function AddFieldModal() {
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
      <AnimatedTouchableOpacity
        style={styles.button}
        onPress={() => setOpen(true)}
        entering={FadeIn.duration(StyleVars.animationDuration).easing(Easing.out(Easing.ease))}
        exiting={FadeOut.duration(StyleVars.animationDuration).easing(Easing.in(Easing.ease))}
      >
        <Icon name="add" style={styles.buttonIcon} />
      </AnimatedTouchableOpacity>
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
              iconName="lock-closed"
              placeholder="Title"
              onSubmitEditing={createField}
            />
            <Button style={styles.createButton} onPress={createField}>
              Create
            </Button>
          </View>
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 5,
  },
  buttonIcon: {
    fontSize: 22,
    color: 'rgba(255, 255, 255, .5)',
  },
  form: {
    gap: 15,
  },
  createButton: {
    width: 'auto',
  },
});

export default AddFieldModal;
