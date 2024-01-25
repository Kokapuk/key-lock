import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const BackButton = () => {
  const navigation = useNavigation<NavigationProp<any, any>>();

  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
      <Icon style={styles.icon} name="arrow-back" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginRight: 'auto',
  },
  icon: {
    fontSize: 20,
    color: 'rgba(255, 255, 255, .75)',
    padding: 4
  },
});

export default BackButton;
