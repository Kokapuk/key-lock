import debounce from 'lodash/debounce';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Input from './Input';
import { StyleProp, ViewStyle } from 'react-native';

interface Props {
  totalCount?: number;
  inputStyle?: StyleProp<ViewStyle>;
  initialQuery?: string;
  onQueryUpdate(query: string): void;
}

const Search = ({ totalCount, inputStyle, initialQuery, onQueryUpdate }: Props) => {
  const [query, setQuery] = useState(initialQuery ?? '');
  const updateQuery = useCallback(
    debounce((query: string) => onQueryUpdate(query), 500),
    [onQueryUpdate]
  );
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    updateQuery(query);
  }, [query]);

  return (
    <Input
      value={query}
      onChangeText={(query) => setQuery(query)}
      onClear={() => setQuery('')}
      style={inputStyle}
      autoCapitalize='none'
      placeholder={totalCount ? `Search vault (${totalCount})` : 'Search vault'}
      returnKeyType="search"
      iconName="search"
    />
  );
};

export default Search;
