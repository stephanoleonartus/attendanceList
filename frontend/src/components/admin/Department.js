import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Department = () => {
    const [departments, setDepartments] = useState([]);
    const [name, setName] = useState('');

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const response = await axios.get('/api/users/departments/');
            setDepartments(response.data);
        } catch (error) {
            console.error('Failed to fetch departments', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/users/departments/', { name });
            fetchDepartments();
            setName('');
        } catch (error) {
            console.error('Failed to create department', error);
        }
    };

    return (
        <div>
            <h3>Departments</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Department Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button type="submit">Add Department</button>
            </form>
            <ul>
                {departments.map((department) => (
                    <li key={department.id}>{department.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Department;
