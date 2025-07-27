import React from 'react';

const ProfileComponent = ({ user }) => {
  return (
    <div className="user-info">
      <span>{user.username}</span>
    </div>
  );
};

export default ProfileComponent;
