import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';

const TeamManagement = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // TODO: Fetch team members from API
    const mockMembers = [
      { id: 1, name: 'John Doe', email: 'john@example.com', position: 'Developer' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', position: 'Designer' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', position: 'Tester' },
    ];
    setTeamMembers(mockMembers);
    setLoading(false);
  }, []);

  if (loading) return <p>Loading team members...</p>;

  return (
    <div className="team-management">
      <h2>Team Management</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teamMembers.map((member) => (
            <tr key={member.id}>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.position}</td>
              <td>
                <button>Edit</button>
                <button>View Attendance</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamManagement;