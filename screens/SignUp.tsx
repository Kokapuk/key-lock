import { useState } from 'react';
import AuthorityField from '../components/AuthorityField';
import Authority from './Authority';

const SignUp = () => {
  const [error, setError] = useState<string | null>(null);

  return (
    <Authority
      title="Create an Account"
      caption="Sign up now to get started with an account."
      actionTitle="Sign Up"
      question="Already have an account?"
      alternateActionTitle="Sign In"
      error={error}
      onSubmit={() => {}}
    >
      <AuthorityField label="Email Address" />
      <AuthorityField label="Password" secureTextEntry />
      <AuthorityField label="Confirm Password" secureTextEntry />
    </Authority>
  );
};

export default SignUp;
