import StyleVars from '@/styles/styleVars';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const templateTitles = ['Email', 'Username', 'Name', 'Login', 'Phone Number', 'Password'];

interface Props {
  onSelect(title: string): void;
}

const FieldTitleSelector = ({ onSelect }: Props) => {
  return (
    <View style={styles.container}>
      {templateTitles.map((item) => (
        <TouchableOpacity key={item} style={styles.button} onPress={() => onSelect(item)}>
          <Text style={styles.buttonTitle}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  button: {
    backgroundColor: StyleVars.bgLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
  },
  buttonTitle: {
    fontSize: 15,
    color: 'white',
  },
});

export default FieldTitleSelector;
