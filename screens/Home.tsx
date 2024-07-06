import CreatePasswordModal from '@/components/CreatePasswordModal';
import PasswordList from '@/components/PasswordList';
import useAuthStore from '@/store/auth';
import useEditorStore from '@/store/editor';
import usePasswordsStore from '@/store/passwords';
import StyleVars from '@/styles/styleVars';
import { Password } from '@/utils/types';
import { NavigationProp } from '@react-navigation/native';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  navigation: NavigationProp<any, any>;
}

const Home = ({ navigation }: Props) => {
  const setSelectedPassword = useEditorStore((state) => state.setSelectedPassword);
  const { passwords, isFetching, fetch: fetchPasswords, paginate: paginatePasswords } = usePasswordsStore();
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (token) {
      fetchPasswords(undefined, true);
    }
  }, [fetchPasswords, token]);

  const handlePasswordPress = (password: Password) => {
    setSelectedPassword(password);
    navigation.navigate('Editor');
  };

  return (
    <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']}>
      <PasswordList
        passwords={passwords}
        fetching={isFetching}
        onPasswordSelect={handlePasswordPress}
        onEndReached={paginatePasswords}
        onRefresh={fetchPasswords}
      />
      <CreatePasswordModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleVars.bgDark,
    paddingHorizontal: StyleVars.screenPadding,
    paddingTop: 20,
  },
});

export default Home;
