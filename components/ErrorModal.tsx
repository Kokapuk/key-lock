import Button from '@/components/Button';
import Modal from '@/components/Modal';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text } from 'react-native';


interface Props {
  title: string;
  message: string;
  openTrigger: any;
}

const ErrorModal = ({ title, message, openTrigger }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const initialMount = useRef(true);

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
      return;
    }

    setIsOpen(true);
  }, [openTrigger]);

  return (
    <Modal title={title}
           open={isOpen}
           onClose={() => setIsOpen(false)}
           sheetContentStyle={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <Button onPress={() => setIsOpen(false)}>Ok</Button>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 15,
    alignItems: 'center',
  },
  message: {
    color: 'white',
    fontSize: 16,
  },
});

export default ErrorModal;