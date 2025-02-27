import { useState } from 'react';
import Button from '../../components/button';
import TextInput from '../../components/form/textInput';
import useAuth from '../../hooks/useAuth';
import CredentialsCard from '../../components/credentials';
import './register.css';

const Register = () => {
  const { onRegister } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&?*])[A-Za-z\d!@#$%&?*]{8,}$/;

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = async () => {
    if (!emailRegex.test(formData.email)) {
      return false;
    }
    return true;
  };

  const validatePassword = async () => {
    if (!passwordRegex.test(formData.password)) {
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    const validEmail = await validateEmail();
    const validPassword = validatePassword();
    if (validEmail && validPassword) {
      onRegister(formData.email, formData.password);
    }
    console.log('invalid email or password');
  };

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
            <TextInput
              value={formData.password}
              onChange={onChange}
              name="password"
              label={'Password *'}
              type={'password'}
            />
          </form>
          <Button text="Sign up" onClick={handleRegister} classes="green width-full" />
        </div>
      </CredentialsCard>
    </div>
  );
};

export default Register;
