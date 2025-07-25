import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    position: user?.position || '',
    phone: user?.phone || ''
  });

  const handleSave = () => {
    // TODO: Save profile changes
    console.log('Saving profile:', profile);
  };

  return (
    <div className="profile">
      <h2>My Profile</h2>
      <div className="profile-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({...profile, name: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({...profile, email: e.target.value})}
            disabled
          />
        </div>
        <div className="form-group">
          <label>Position:</label>
          <input
            type="text"
            value={profile.position}
            onChange={(e) => setProfile({...profile, position: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="tel"
            value={profile.phone}
            onChange={(e) => setProfile({...profile, phone: e.target.value})}
          />
        </div>
        <button onClick={handleSave}>Save Changes</button>
      </div>
    </div>
  );
};

export default Profile;