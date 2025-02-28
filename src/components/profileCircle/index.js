import { useState } from 'react';
import AddIcon from '../../assets/icons/addIcon';
import CohortIcon from '../../assets/icons/cohortIcon';
import CohortIconFill from '../../assets/icons/cohortIcon-fill';
import DeleteIcon from '../../assets/icons/deleteIcon';
import MonitorIcon from '../../assets/icons/monitorIcon';
import ProfileIcon from '../../assets/icons/profileIcon';
import SquareBracketsIcon from '../../assets/icons/squareBracketsIcon';
import Menu from '../menu';
import MenuItem from '../menu/menuItem';
import './style.css';

const ProfileCircle = ({ initials, menuEnabled=true, diameterPx=undefined}) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isMenuEnabled, setmenuEnabled] = useState(menuEnabled);
  const pxToStr = (px) => {
    return (px !== undefined) ? `${px}px` : "inital";
  }

  return (
    <div className="profile-circle" onClick={() => setIsMenuVisible(!isMenuVisible)} >
      { isMenuEnabled && isMenuVisible && <CascadingMenu />}

      <div className="profile-icon" style={{width:pxToStr(diameterPx), height:pxToStr(diameterPx)}} >
        <p style={{
          height: "inherit",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          fontSize: pxToStr(diameterPx/2 - diameterPx/7)
        }}>{initials}</p>
      </div>
    </div>
  );
};

const CascadingMenu = () => {
  return (
    <Menu className="profile-circle-menu">
      <MenuItem icon={<ProfileIcon />} text="Profile" />
      <MenuItem icon={<AddIcon />} text="Add note" />

      <MenuItem icon={<CohortIcon />} text="Move to cohort">
        <MenuItem icon={<SquareBracketsIcon />} text="Software Development">
          <MenuItem icon={<CohortIconFill />} text="Cohort 1" />
          <MenuItem icon={<CohortIconFill />} text="Cohort 2" />
          <MenuItem icon={<CohortIconFill />} text="Cohort 3" />
        </MenuItem>

        <MenuItem icon={<MonitorIcon />} text="Frontend Development">
          <MenuItem icon={<CohortIconFill />} text="Cohort 1" />
          <MenuItem icon={<CohortIconFill />} text="Cohort 2" />
          <MenuItem icon={<CohortIconFill />} text="Cohort 3" />
        </MenuItem>
      </MenuItem>

      <MenuItem icon={<DeleteIcon />} text="Delete student" />
    </Menu>
  );
};

export default ProfileCircle;
