import AuthorityField from '@/components/AuthorityField';
import Validator from '@/utils/validator';
import { useRef, useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import Authority from './Authority';
import Api from '@/utils/api';

const SignIn = () => {
  const [error, setError] = useState<string | null>(null);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const passwordInputRef = useRef<TextInput>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const loginIssue = Validator.getLoginIssue(login);
    const passwordIssue = Validator.getPasswordIssue(password);
    setError(loginIssue ?? passwordIssue);

    if (loginIssue || passwordIssue) {
      return;
    }

    setLoading(true);

    try {
      await Api.auth(login.trim(), password, 'signIn');
      // localStorage.setItem('login', login);
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
      title="Log in to your Account"
      caption="Welcome back, please enter your details."
      actionTitle="Sign In"
      question="Don't have an account?"
      alternateAuthTitle="Sign Up"
      alternateAuthScreen="Sign Up"
      error={error}
      loading={loading}
      onSubmit={handleSubmit}
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
        onSubmitEditing={handleSubmit}
      />
    </Authority>
  );
};

export default SignIn;
