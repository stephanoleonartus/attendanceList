import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AttendancePolicy = () => {
    const [policies, setPolicies] = useState([]);
    const [name, setName] = useState('');
    const [file, setFile] = useState(null);

    useEffect(() => {
        fetchPolicies();
    }, []);

    const fetchPolicies = async () => {
        try {
            const response = await axios.get('/api/administration/policies/');
            setPolicies(response.data);
        } catch (error) {
            console.error('Failed to fetch policies', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('policy_document', file);

        try {
            await axios.post('/api/administration/policies/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            fetchPolicies();
            setName('');
            setFile(null);
        } catch (error) {
            console.error('Failed to create policy', error);
        }
    };

    return (
        <div>
            <h3>Attendance Policies</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Policy Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <button type="submit">Add Policy</button>
            </form>
            <ul>
                {policies.map((policy) => (
                    <li key={policy.id}>
                        <a href={policy.policy_document} target="_blank" rel="noopener noreferrer">
                            {policy.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AttendancePolicy;
