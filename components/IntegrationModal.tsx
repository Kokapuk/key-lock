import useAuthStore from '@/store/auth';
import useEditorStore from '@/store/editor';
import { limitPerPage } from '@/store/passwords';
import Api from '@/utils/api';
import { Password } from '@/utils/types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleProp, StyleSheet, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from './Modal';
import PasswordList from './PasswordList';
import Search from './Search';

interface Props {
  triggerStyle: StyleProp<ViewStyle>;
  triggerIconStyle: StyleProp<TextStyle>;
}

const IntegrationModal = ({ triggerStyle, triggerIconStyle }: Props) => {
  const { draftPassword, selectedPassword, setDraftPassword } = useEditorStore();
  const [isOpen, setIsOpen] = useState(false);
  const [totalCount, setTotalCount] = useState<number | undefined>(undefined);
  const [passwords, setPasswords] = useState<Password[]>([]);
  const [isFetching, setFetching] = useState(true);
  const [isFetchFailed, setFetchFailed] = useState(false);
  const [query, setQuery] = useState('');
  const page = useRef(1);

  const fetchPasswords = useCallback(
    async (query = '') => {
      if (isFetchFailed || !useAuthStore.getState().token) {
        return;
      }

      setFetching(true);
      setPasswords([]);

      try {
        const [totalCount, newPasswords] = await Api.findAll(query, limitPerPage, 1);
        setPasswords(newPasswords);
        setTotalCount(totalCount);
        setQuery(query);
      } catch {
        setFetchFailed(true);
      } finally {
        setFetching(false);
        page.current = 1;
      }
    },
    [isFetchFailed]
  );

  useEffect(() => {
    if (!isOpen || passwords.length) {
      return;
    }

    fetchPasswords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchPasswords, isOpen]);

  const paginatePasswords = useCallback(async () => {
    if (isFetchFailed || isFetching || !useAuthStore.getState().token || passwords.length >= (totalCount as number)) {
      return;
    }

    setFetching(true);

    try {
      const [totalCount, newPasswords] = await Api.findAll(query, limitPerPage, page.current + 1);
      setPasswords((prev) => [...prev, ...newPasswords]);
      setTotalCount(totalCount);
      page.current++;
    } catch {
      setPasswords([]);
      setFetchFailed(true);
    } finally {
      setFetching(false);
    }
  }, [isFetchFailed, isFetching, passwords.length, query, totalCount]);

  if (!selectedPassword || !draftPassword) {
    return null;
  }

  const handleIntegrationSelect = (integration: Password | undefined) => {
    setDraftPassword((prev) => {
      const prevState: Password = JSON.parse(JSON.stringify(prev));

      prevState.credentials.integration = integration;
      return prevState;
    });

    setIsOpen(false);
  };

  return (
    <>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Select integration"
        sheetStyle={styles.modal}
        sheetContentStyle={styles.modalContent}
      >
        <Search initialQuery={query} totalCount={totalCount ? totalCount - 1 : undefined} onQueryUpdate={fetchPasswords} />
        <PasswordList
          passwords={passwords.filter((item) => item._id !== selectedPassword?._id)}
          onPasswordSelect={handleIntegrationSelect}
          onEndReached={paginatePasswords}
          fetching={isFetching}
        />
      </Modal>
      <TouchableOpacity
        onPress={() => (draftPassword.credentials.integration ? handleIntegrationSelect(undefined) : setIsOpen(true))}
        style={triggerStyle}
      >
        <Icon name={draftPassword.credentials.integration ? 'unlink' : 'link'} style={triggerIconStyle} />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    height: '80%',
  },
  modalContent: {
    gap: 15,
  },
});

export default IntegrationModal;
