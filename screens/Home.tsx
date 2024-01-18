import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Password from '../components/Password';
import StyleVars from '../styles/styleVars';

const Home = () => {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={Array(20).fill(0)}
        renderItem={() => (
          <Password password={{ _id: '0', credentials: { fields: [] }, name: 'Discord', website: 'discord.com' }} />
        )}
        keyExtractor={(_, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleVars.bgDark,
    paddingHorizontal: StyleVars.screenHorizontalPadding,
    paddingVertical: 20,
  },
  separator: {
    height: 10,
  },
});

export default Home;
