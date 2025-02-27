import React from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function ProfileView() {
  const { id } = useParams();
  console.log(id);

  return (
    <>
      <p>Profile</p>
      <div>Profile</div>

    </>
  );
}

export default ProfileView;
