import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Designation = () => {
    const [designations, setDesignations] = useState([]);
    const [name, setName] = useState('');

    useEffect(() => {
        fetchDesignations();
    }, []);

    const fetchDesignations = async () => {
        try {
            const response = await axios.get('/api/users/designations/');
            setDesignations(response.data);
        } catch (error) {
            console.error('Failed to fetch designations', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/users/designations/', { name });
            fetchDesignations();
            setName('');
        } catch (error) {
            console.error('Failed to create designation', error);
        }
    };

    return (
        <div>
            <h3>Designations</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Designation Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button type="submit">Add Designation</button>
            </form>
            <ul>
                {designations.map((designation) => (
                    <li key={designation.id}>{designation.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Designation;
