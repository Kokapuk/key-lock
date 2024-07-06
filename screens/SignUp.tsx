import { useRef, useState } from 'react';
import AuthorityField from '../components/AuthorityField';
import Authority from './Authority';
import Validator from '@/utils/validator';
import Api from '@/utils/api';
import { TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = () => {
  const [error, setError] = useState<string | null>(null);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const handleSubmit = async () => {
    const loginIssue = Validator.getLoginIssue(login);
    const passwordIssue = Validator.getPasswordIssue(password);
    const confirmPasswordIssue = password !== confirmPassword ? 'Passwords do not match' : null;
    setError(loginIssue ?? passwordIssue ?? confirmPasswordIssue);

    if (loginIssue || passwordIssue || confirmPasswordIssue) {
      return;
    }

    setLoading(true);

    try {
      await Api.auth(login, password, 'signUp');
      await AsyncStorage.setItem('login', login);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Authority
      title="Create an Account"
      caption="Sign up now to get started with an account."
      actionTitle="Sign Up"
      question="Already have an account?"
      alternateAuthTitle="Sign In"
      alternateAuthScreen="Sign In"
      error={error}
      onSubmit={handleSubmit}
      loading={loading}
    >
      <AuthorityField
        label="Login"
        returnKeyType="next"
        keyboardType="visible-password"
        maxLength={12}
        value={login}
        onChangeText={(login) => setLogin(login)}
        onSubmitEditing={() => passwordInputRef.current?.focus()}
      />
      <AuthorityField
        ref={passwordInputRef}
        label="Password"
        secureTextEntry
        maxLength={32}
        returnKeyType="done"
        value={password}
        onChangeText={(password) => setPassword(password)}
        onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
      />
      <AuthorityField
        ref={confirmPasswordInputRef}
        label="Confirm Password"
        secureTextEntry
        maxLength={32}
        returnKeyType="done"
        value={confirmPassword}
        onChangeText={(password) => setConfirmPassword(password)}
        onSubmitEditing={handleSubmit}
      />
    </Authority>
  );
};

export default SignUp;
