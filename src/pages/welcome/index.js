import { useState } from 'react';
import Stepper from '../../components/stepper';
import useAuth from '../../hooks/useAuth';
import StepOne from './stepOne';
import StepTwo from './stepTwo';
import './style.css';

const Welcome = () => {
  const { onCreateProfile } = useAuth();

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    githubUsername: '',
    bio: ''
  });

  const [errors, setErrors] = useState({});

  const onChange = (event) => {
    const { name, value } = event.target;

    setProfile({
      ...profile,
      [name]: value
    });
  };

  const validate = () => { // Form validation
    let tempErrors = {};
    if (!profile.firstName || !profile.lastName) {
      tempErrors.firstName = 'Fill in the required fields';
      setErrors(tempErrors);
      return true;
    }
    else {
      tempErrors = {};
      return false;
    }


  };

  const onComplete = () => {
    onCreateProfile(profile.firstName, profile.lastName, profile.githubUsername, profile.bio);
  };

  return (
    <main className="welcome">
      <div className="welcome-titleblock">
        <h1 className="h2">Welcome to Cohort Manager</h1>
        <p className="text-blue1">Create your profile to get started</p>
      </div>

      <Stepper header={<WelcomeHeader />} onComplete={onComplete} validate={validate}>
        <StepOne data={profile} setData={onChange} errors={errors} />
        <StepTwo data={profile} setData={onChange} />
      </Stepper>
    </main>
  );
};

const WelcomeHeader = () => {
  return (
    <div className="welcome-cardheader">
      <h2>Create profile</h2>
      <p className="text-blue1">Tell us about yourself to create your profile</p>
    </div>
  );
};

export default Welcome;
