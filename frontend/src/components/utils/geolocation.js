export const checkLocation = async () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser'));
        return;
      }
  
      // TODO: Replace with actual work location coordinates
      const workLocation = {
        latitude: -6.2088, // Example: Jakarta coordinates
        longitude: 106.8456,
        radius: 100 // meters
      };
  
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          
          // Calculate distance between user and work location
          const distance = calculateDistance(
            userLat, 
            userLng, 
            workLocation.latitude, 
            workLocation.longitude
          );
          
          resolve(distance <= workLocation.radius);
        },
        (error) => {
          reject(new Error('Unable to retrieve your location'));
        }
      );
    });
  };
  
  // Helper function to calculate distance between two coordinates (Haversine formula)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Earth radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;
  
    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    return R * c; // Distance in meters
  };