import { useEffect, useState } from 'react';
import Button from '../../components/button';
import TextInput from '../../components/form/textInput';
import useAuth from '../../hooks/useAuth';
import CredentialsCard from '../../components/credentials';
import './register.css';

const Register = () => {
  const { onRegister } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [validForm, setvalidForm] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&?*])[A-Za-z\d!@#$%&?*]{8,}$/;

  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    if (!emailRegex.test(email)) {
      setEmailError('Email must follow the format: abc@abc.abc');
      return false;
    }
    setEmailError(null);
    return true;
  };

  const validatePassword = (password) => {
    if (!passwordRegex.test(password)) {
      setPasswordError(
        'Password must be at least 8 characters long, contain an uppercase letter, a number, and a special character'
      );
      return false;
    }
    setPasswordError(null);
    return true;
  };

  useEffect(() => {
    const validEmail = validateEmail(formData.email);
    const validPassword = validatePassword(formData.password);
    setvalidForm(validEmail && validPassword);
  }, [formData]);

  return (
    <div className="bg-blue register credentialpage">
      <CredentialsCard
        title="Register"
        socialLinksTitle="Or sign up with"
        altButtonTitle="Already a user?"
        altButtonLink="/login"
        altButtonText="Log in"
      >
        <div className="register-form">
          <form>
            <TextInput
              value={formData.email}
              onChange={onChange}
              type="email"
              name="email"
              label={'Email *'}
            />
            {emailError && <p>{emailError}</p>}
            <TextInput
              value={formData.password}
              onChange={onChange}
              name="password"
              label={'Password *'}
              type={'password'}
            />
            {passwordError && <p>{passwordError}</p>}
          </form>
          <Button
            text="Sign up"
            onClick={() => onRegister(formData.email, formData.password)}
            classes="green width-full"
            disabled={!validForm}
          />
        </div>
      </CredentialsCard>
    </div>
  );
};

export default Register;
