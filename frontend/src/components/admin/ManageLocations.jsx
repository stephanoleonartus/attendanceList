import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';

const ManageLocation = () => {
  const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState({
    name: '',
    address: '',
    radius: 100, // in meters
    coordinates: { lat: 0, lng: 0 }
  });
  const { user } = useAuth();

  const handleAddLocation = () => {
    // TODO: Implement location addition
    console.log('Adding location:', newLocation);
  };

  return (
    <div className="manage-location">
      <h2>Manage Locations</h2>
      <div className="location-form">
        <h3>Add New Location</h3>
        <input
          type="text"
          placeholder="Location Name"
          value={newLocation.name}
          onChange={(e) => setNewLocation({...newLocation, name: e.target.value})}
        />
        <input
          type="text"
          placeholder="Address"
          value={newLocation.address}
          onChange={(e) => setNewLocation({...newLocation, address: e.target.value})}
        />
        <input
          type="number"
          placeholder="Radius (meters)"
          value={newLocation.radius}
          onChange={(e) => setNewLocation({...newLocation, radius: e.target.value})}
        />
        <button onClick={handleAddLocation}>Add Location</button>
      </div>
      <div className="location-list">
        <h3>Existing Locations</h3>
        {locations.length === 0 ? (
          <p>No locations added yet</p>
        ) : (
          <ul>
            {locations.map((loc) => (
              <li key={loc.id}>
                {loc.name} - {loc.address} (Radius: {loc.radius}m)
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ManageLocation;