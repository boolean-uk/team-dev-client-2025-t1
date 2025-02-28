// import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserProfileData } from '../../service/apiClient';
import ProfileCircle from '../../components/profileCircle';
import ProfileInfoBlock from '../../components/profileInfoBlock';

function ProfileView() {
  const { id } = useParams();

  const [userData, setUserData] = useState(null);
  const [userBasicData, setUserBasicData] = useState([]);
  const [userBioData, setUserBioData] = useState([]);
  useEffect((x) => {
    if (userData === null) {
      const fetchProfileData = async () => {
        const recivedData = await getUserProfileData(id);
        setUserData(recivedData);
        setUserBasicData([
          { name: 'firstName', labelVal: 'First Name', dataVal: recivedData.firstName },
          { name: 'lastName', labelVal: 'Last Name', dataVal: recivedData.lastName },
          { name: 'userName', labelVal: 'User Name', dataVal: recivedData.userName },
          { name: 'githubUrl', labelVal: 'Github Username', dataVal: recivedData.githubUrl }
        ]);
        setUserBioData([
          { name: 'bio', labelVal: 'Bio', dataVal: recivedData.bio, classList: ['textField'] }
        ]);
      };
      fetchProfileData();
    }
  }, []);

  if (userData !== null) {
    console.log(userData);
    return (
      <>
        <div className="outerProfileInfo">
          <h2 className="ProfilePageTitle">Profile</h2>
          <div className="profileInfo">
            <div className="ProfileCircleWithInfo">
              <ProfileCircle
                initials={`${userData.firstName[0]}${userData.lastName[0]}`}
                menuEnabled={false}
                diameterPx={80}
              />
              <span>
                <h3>
                  {userData.firstName}
                  {userData.lastName}
                </h3>
                <p>
                  {userData.firstName}
                  {userData.lastName}
                </p>
              </span>
            </div>
            <div className="profileInfoBlockContainer">
              <ProfileInfoBlock title={'Basic info'} dataList={userBasicData}></ProfileInfoBlock>
              <ProfileInfoBlock title={'Bio'} dataList={userBioData}></ProfileInfoBlock>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <p>Loading</p>
      </>
    );
  }
}

export default ProfileView;
