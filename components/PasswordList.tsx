import StyleVars from '@/styles/styleVars';
import { Password as PasswordType } from '@/utils/types';
import { ActivityIndicator, FlatList, FlatListProps, StyleSheet, View } from 'react-native';
import Password from './Password';

interface Props {
  passwords: PasswordType[];
  paginating?: boolean;
  onPasswordPress(password: PasswordType): void;
}

const PasswordList = ({
  passwords,
  paginating,
  onPasswordPress,
  ...props
}: Props &
  Omit<
    FlatListProps<PasswordType>,
    'data' | 'renderItem' | 'keyExtractor' | 'onEndReachedThreshold' | 'ItemSeparatorComponent' | 'ListFooterComponent'
  >) => {
  return (
    <FlatList
      data={passwords}
      renderItem={(info) => <Password onPress={() => onPasswordPress(info.item)} password={info.item} />}
      keyExtractor={(_, index) => index.toString()}
      onEndReachedThreshold={1}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListFooterComponent={
        paginating
          ? () => <ActivityIndicator color={StyleVars.accent} size={40} style={styles.activityIndicator} />
          : undefined
      }
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  activityIndicator: {
    marginTop: 15,
  },
});

export default PasswordList;
