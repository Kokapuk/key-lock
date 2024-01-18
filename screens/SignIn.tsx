import { NavigationProp } from '@react-navigation/native';
import { useState } from 'react';
import AuthorityField from '../components/AuthorityField';
import Authority from './Authority';

interface Props {
  navigation: NavigationProp<any, any>;
}

const SignIn = ({ navigation }: Props) => {
  const [error, setError] = useState<string | null>(null);

  return (
    <Authority
      title="Log in to your Account"
      caption="Welcome back, please enter your details."
      actionTitle="Sign In"
      question="Don't have an account?"
      alternateActionTitle="Sign Up"
      error={error}
      onSubmit={() => navigation.navigate('Sign Up')}
    >
      <AuthorityField label="Email Address" />
      <AuthorityField label="Password" secureTextEntry />
    </Authority>
  );
};

export default SignIn;
