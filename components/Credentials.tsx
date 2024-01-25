import useEditorStore from '@/store/editor';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Field from './Field';

const Credentials = () => {
  const draftPassword = useEditorStore((st) => st.draftPassword);

  if (!draftPassword) {
    return;
  }

  return (
    <FlatList
      data={draftPassword.credentials.fields}
      renderItem={(itemInfo) => <Field field={itemInfo.item} />}
      keyExtractor={(item) => item._id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListFooterComponent={
        <>
          <View style={styles.separator} />
          <Field isWebsite field={{ _id: '', title: 'Website', value: draftPassword.website, isPassword: false }} />
        </>
      }
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 40,
  },
});

export default Credentials;
