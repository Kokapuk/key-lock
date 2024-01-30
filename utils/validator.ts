const minLoginLength = 3;
const minPasswordLength = 6;

const getLoginIssue = (string: string): string | null => {
  if (string.trim().length < minLoginLength) {
    return `Login must be at least ${minLoginLength} characters`;
  }

  if (!/^[a-zA-Z0-9_-]+$/.test(string.trim())) {
    return 'Login can contain only latin characters, numbers, underscore and dash';
  }

  return null;
};

const getPasswordIssue = (string: string): string | null => {
  if (string.length < minPasswordLength) {
    return `Password must be at least ${minPasswordLength} characters`;
  }

  return null;
}

const Validator = { getLoginIssue, getPasswordIssue };
export default Validator;
