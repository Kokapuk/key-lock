import usePasswordsStore from '@/store/passwords';
import StyleVars from '@/styles/styleVars';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Search from './Search';

const SearchHeader = () => {
  const { totalCount, fetch: fetchPasswords } = usePasswordsStore();

  return (
    <SafeAreaView style={styles.header} edges={['top', 'right', 'left']}>
      <View style={styles.container}>
        <Search totalCount={totalCount} onQueryUpdate={fetchPasswords} inputStyle={styles.input} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: StyleVars.screenPadding,
    paddingHorizontal: StyleVars.screenPadding,
  },
  container: {
    height: 35,
    flexDirection: 'row',
    gap: 10,
  },
  input: {
    flex: 1,
  },
  addButton: {
    height: '100%',
    paddingHorizontal: 0,
    width: 40,
  },
});

export default SearchHeader;
