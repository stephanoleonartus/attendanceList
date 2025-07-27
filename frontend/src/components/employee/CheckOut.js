import React, { useState } from 'react';
import axios from 'axios';

const CheckOut = () => {
    const [photo, setPhoto] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('photo', photo);

        try {
            await axios.post('/api/attendance/check-out/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // Handle successful check-out
        } catch (error) {
            console.error('Check-out failed', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Check Out</h3>
            <input
                type="file"
                onChange={(e) => setPhoto(e.target.files[0])}
            />
            <button type="submit">Check Out</button>
        </form>
    );
};

export default CheckOut;
