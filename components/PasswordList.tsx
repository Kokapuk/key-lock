import StyleVars from '@/styles/styleVars';
import { Password as PasswordType } from '@/utils/types';
import { ActivityIndicator, FlatListProps, StyleSheet, Text, View } from 'react-native';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import Password from './Password';

interface Props {
  passwords: PasswordType[];
  fetching?: boolean;
  onPasswordSelect(password: PasswordType): void;
  onRefresh?(): void;
}

const PasswordList = ({
  passwords,
  fetching,
  onPasswordSelect,
  onRefresh,
  ...props
}: Props &
  Omit<
    FlatListProps<PasswordType>,
    'data' | 'renderItem' | 'keyExtractor' | 'onEndReachedThreshold' | 'ItemSeparatorComponent' | 'ListFooterComponent'
  >) => {

  return (
    <FlatList
      data={passwords}
      renderItem={(info) => <Password onPress={() => onPasswordSelect(info.item)} password={info.item} />}
      keyExtractor={(_, index) => index.toString()}
      onEndReachedThreshold={1}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListFooterComponent={
        fetching
          ? () => <ActivityIndicator color={StyleVars.accent} size={40} style={styles.activityIndicator} />
          : undefined
      }
      refreshControl={
        fetching !== undefined && onRefresh ? (
          <RefreshControl
            refreshing={fetching}
            onRefresh={onRefresh}
            progressBackgroundColor="white"
            colors={[StyleVars.accent]}
          />
        ) : undefined
      }
      ListEmptyComponent={fetching ? undefined : () => <Text style={styles.emptyPlaceholder}>Nothing found</Text>}
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
  emptyPlaceholder: {
    textAlign: 'center',
    color: 'rgba(255, 255, 255, .5)',
    fontSize: 16,
  },
});

export default PasswordList;
