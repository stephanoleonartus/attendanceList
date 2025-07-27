import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Employee = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('/api/users/employees/');
            setEmployees(response.data);
        } catch (error) {
            console.error('Failed to fetch employees', error);
        }
    };

    return (
        <div>
            <h3>Employees</h3>
            <ul>
                {employees.map((employee) => (
                    <li key={employee.id}>{employee.user.username}</li>
                ))}
            </ul>
        </div>
    );
};

export default Employee;
