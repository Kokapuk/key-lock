import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from './Button';
import Input from './Input';
import StyleVars from '../styles/styleVars';

const Header = () => {
  return (
    <SafeAreaView style={styles.header} edges={['top']}>
      <View style={styles.container}>
        <Input style={styles.searchBox} placeholder="Search vault" returnKeyType="search" />
        <Button style={styles.addButton} iconName="add" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: StyleVars.bgDark,
    paddingTop: 15,
    paddingHorizontal: StyleVars.screenHorizontalPadding,
  },
  container: {
    height: 35,
    flexDirection: 'row',
    gap: 10,
  },
  searchBox: {
    height: '100%',
    flex: 1,
  },
  addButton: {
    height: '100%',
    paddingHorizontal: 0,
    width: 40,
  },
});

export default Header;
