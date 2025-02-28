import FullLogo from '../../assets/fullLogo';
import useAuth from '../../hooks/useAuth';
import './style.css';
import Card from '../card';
import ProfileIcon from '../../assets/icons/profileIcon';
import CogIcon from '../../assets/icons/cogIcon';
import LogoutIcon from '../../assets/icons/logoutIcon';
// import { NavLink, Link } from 'react-router-dom'; // NOTE: NavLink require page reload... stinky?
import { Link } from 'react-router-dom'; // NOTE: NavLink require page reload... stinky?
import { useContext, useState } from 'react';
import { LoginContext } from '../../App';

const Header = () => {
  const { token, onLogout } = useAuth();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const { loggedInAs } = useContext(LoginContext);

  const onClickProfileIcon = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  if (!token) {
    return null;
  }

  const showIfLogin = () => {
    if (loggedInAs === null || loggedInAs.firstName == undefined) return <></>;
    return (
      <>
        <section className="post-details">
          <Link to={`/profile/${loggedInAs.id}`} onClick={onClickProfileIcon}>
            <div className="profile-icon">
              <p>{`${loggedInAs.firstName[0]}${loggedInAs.lastName[0]}`}</p>
            </div>
          </Link>

          <div className="post-user-name">
            <p>{`${loggedInAs.firstName} ${loggedInAs.lastName}`}</p>
            {/* <small>Software Developer, Cohort 3</small> */}
            <small>
              {loggedInAs.occupation}, {loggedInAs.cohortId}
            </small>
          </div>
        </section>
      </>
    );
  };
  const showIfLoginProfileIcon = () => {
    if (loggedInAs === null || loggedInAs.firstName == undefined) return <></>;
    console.log('here:');
    console.log(loggedInAs);
    return (
      <div className="profile-icon" onClick={onClickProfileIcon}>
        <p>{`${loggedInAs.firstName[0]}${loggedInAs.lastName[0]}`}</p>
      </div>
    );
  };
  const showIfLoginListOption = () => {
    if (loggedInAs === null || loggedInAs.firstName == undefined) return <></>;
    return (
      <li>
        <Link to={`/profile/${loggedInAs.id}`} onClick={onClickProfileIcon}>
          <ProfileIcon /> <p>Profile</p>
        </Link>
      </li>
    );
  };
  return (
    <header>
      <FullLogo textColour="white" />

      {showIfLoginProfileIcon()}

      {isMenuVisible && (
        <div className="user-panel">
          <Card>
            {showIfLogin()}

            <section className="user-panel-options border-top">
              <ul>
                {showIfLoginListOption()}
                <li>
                  <Link to="/">
                    <CogIcon /> <p>Settings &amp; Privacy</p>
                  </Link>
                </li>
                <li>
                  <Link to="#" onClick={onLogout}>
                    <LogoutIcon /> <p>Log out</p>
                  </Link>
                </li>
              </ul>
            </section>
          </Card>
        </div>
      )}
    </header>
  );
};

export default Header;
