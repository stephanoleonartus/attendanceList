import React from 'react';
import { useAuth } from '../auth/AuthContext';
import { NavLink } from 'react-router-dom';

const SideBar = () => {
  const { user } = useAuth();

  const adminLinks = [
    { path: '/admin/dashboard', label: 'Dashboard' },
    { path: '/admin/manage-users', label: 'Manage Users' },
    { path: '/admin/manage-locations', label: 'Manage Locations' },
    { path: '/admin/working-hours', label: 'Working Hours' },
    { path: '/admin/settings', label: 'System Settings' }
  ];

  const employerLinks = [
    { path: '/employer/dashboard', label: 'Dashboard' },
    { path: '/employer/today-attendance', label: "Today's Attendance" },
    { path: '/employer/team-management', label: 'Team Management' },
    { path: '/employer/reports', label: 'Reports' }
  ];

  const employeeLinks = [
    { path: '/employee/dashboard', label: 'Dashboard' },
    { path: '/employee/attendance', label: 'Sign Attendance' },
    { path: '/employee/history', label: 'Attendance History' },
    { path: '/employee/profile', label: 'Profile' }
  ];

  const getLinks = () => {
    if (user?.role === 'admin') return adminLinks;
    if (user?.role === 'employer') return employerLinks;
    return employeeLinks;
  };

  return (
    <aside className="sidebar">
      <nav>
        <ul>
          {getLinks().map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;