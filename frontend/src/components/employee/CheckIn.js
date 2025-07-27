import React, { useState } from 'react';
import axios from 'axios';

const CheckIn = () => {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [photo, setPhoto] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('latitude', latitude);
        formData.append('longitude', longitude);
        formData.append('photo', photo);

        try {
            await axios.post('/api/attendance/check-in/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // Handle successful check-in
        } catch (error) {
            console.error('Check-in failed', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Check In</h3>
            <input
                type="text"
                placeholder="Latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
            />
            <input
                type="text"
                placeholder="Longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
            />
            <input
                type="file"
                onChange={(e) => setPhoto(e.target.files[0])}
            />
            <button type="submit">Check In</button>
        </form>
    );
};

export default CheckIn;
