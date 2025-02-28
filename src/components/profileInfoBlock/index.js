import React from 'react'

function ProfileInfoBlock({title, dataList}) {
  
  
  return (
    <>
      <div className='profileInfoContents'>
        <hr className='hrstyle' />
        <h3>{title}</h3>
        {/* NOTE: A Edit Photo button is not required for a Profile View page... Thus removed... */}
        {/* <div >
            <label htmlFor='photo' className='profileLabel'>Photo</label>
            <ProfileCircle name='photo' initials={`${userData.firstName[0]}${userData.lastName[0]}`} menuEnabled={false} diameterPx={56}/>
            </div> */}
        {/* <p>Profile</p> */}
        { dataList.map((x, index) => {
          let classList = x.classList !== undefined ? x.classList : [];
          return (
            <div key={index} className='profileInfoContentsEntry'>
              <label htmlFor={x.name} className='profileLabel'>{x.labelVal}</label>
              <p name={x.name} className={"profileLabelValue "+classList.join(" ")}>{x.dataVal}</p>
            </div>
          );
        }) }
      </div>
    </>

  )
}

export default ProfileInfoBlock;