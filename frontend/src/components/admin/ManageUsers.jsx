import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'employee',
    position: ''
  });
  const { user } = useAuth();

  useEffect(() => {
    // TODO: Fetch users from API
    const mockUsers = [
      { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'admin', position: 'Administrator' },
      { id: 2, name: 'Manager User', email: 'manager@example.com', role: 'employer', position: 'Manager' },
      { id: 3, name: 'Employee User', email: 'employee@example.com', role: 'employee', position: 'Developer' }
    ];
    setUsers(mockUsers);
  }, []);

  const handleAddUser = () => {
    // TODO: Implement user addition
    console.log('Adding user:', newUser);
  };

  return (
    <div className="manage-user">
      <h2>Manage Users</h2>
      <div className="user-form">
        <h3>Add New User</h3>
        <input
          type="text"
          placeholder="Full Name"
          value={newUser.name}
          onChange={(e) => setNewUser({...newUser, name: e.target.value})}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({...newUser, email: e.target.value})}
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({...newUser, role: e.target.value})}
        >
          <option value="employee">Employee</option>
          <option value="employer">Manager</option>
          <option value="admin">Admin</option>
        </select>
        <input
          type="text"
          placeholder="Position"
          value={newUser.position}
          onChange={(e) => setNewUser({...newUser, position: e.target.value})}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>
      <div className="user-list">
        <h3>Existing Users</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{u.position}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;