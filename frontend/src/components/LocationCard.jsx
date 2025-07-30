import React, { useState, useEffect } from 'react';

// Location Card Component
export default function LocationCard({ userLocation, allowedLocation }) {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationVerified, setLocationVerified] = useState(false);
  const [locationError, setLocationError] = useState('');

  useEffect(() => {
    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          setCurrentLocation(location);

          // Verify location against allowed location
          if (allowedLocation) {
            const distance = calculateDistance(
              location.latitude,
              location.longitude,
              allowedLocation.latitude,
              allowedLocation.longitude
            );

            // Allow 100 meters tolerance
            setLocationVerified(distance <= 0.1);
          }
        },
        (error) => {
          setLocationError('Unable to get location. Please enable GPS.');
          console.error('Location error:', error);
        }
      );
    } else {
      setLocationError('Geolocation is not supported by this browser.');
    }
  }, [allowedLocation]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  };

  return (
    <div className="card">
      <h3>📍 Location Verification</h3>

      <div className="location-info">
        <div className="location-status">
          <div className="location-name">
            {allowedLocation?.name || 'Main Office'}
          </div>
          <div className="location-address">
            {allowedLocation?.address || '123 Business St, City, State'}
          </div>
        </div>

        {currentLocation && (
          <div className="location-coordinates">
            <div className="coordinate-item">
              <span className="coord-label">Latitude</span>
              <span className="coord-value">
                {currentLocation.latitude.toFixed(6)}
              </span>
            </div>
            <div className="coordinate-item">
              <span className="coord-label">Longitude</span>
              <span className="coord-value">
                {currentLocation.longitude.toFixed(6)}
              </span>
            </div>
          </div>
        )}

        {locationVerified && (
          <div className="location-verify">
            <span className="verify-icon">✅</span>
            Location verified - You are at the correct workplace
          </div>
        )}

        {!locationVerified && currentLocation && (
          <div className="error-message">
            ⚠️ You are not at the designated workplace location
          </div>
        )}

        {locationError && (
          <div className="error-message">
            {locationError}
          </div>
        )}
      </div>
    </div>
  );
}
