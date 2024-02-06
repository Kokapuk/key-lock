import useEditorStore from '@/store/editor';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Password from './Password';

const Integration = () => {
  const draftPassword = useEditorStore((state) => state.draftPassword);

  if (!draftPassword?.credentials.integration) {
    throw new Error('Either integration or drafted password it self is null or undefined');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Integration</Text>
      <Password password={draftPassword.credentials.integration} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default Integration;
