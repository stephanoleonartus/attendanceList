import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/auth/AuthContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import RoleBasedLayout from './components/pages/RoleBasedLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import EmployeeDashboard from './components/employee/EmployeeDashboard';
import EmployerDashboard from './components/employer/EmployerDashboard';
import Spinner from './components/pages/Spinner';
import SignAttendance from './components/employee/SignAttendance';
import AttendanceHistory from './components/employee/AttendanceHistory';
import Profile from './components/employee/Profile';

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin Routes */}
      <Route
        path="/admin/*"
        element={
          <RoleBasedLayout allowedRoles={['admin']}>
            <Routes>
              <Route path="dashboard" element={<AdminDashboard />} />
              {/* Add other admin routes here */}
            </Routes>
          </RoleBasedLayout>
        }
      />

      {/* Employer Routes */}
      <Route
        path="/employer/*"
        element={
          <RoleBasedLayout allowedRoles={['employer']}>
            <Routes>
              <Route path="dashboard" element={<EmployerDashboard />} />
              {/* Add other employer routes here */}
            </Routes>
          </RoleBasedLayout>
        }
      />

      {/* Employee Routes */}
      <Route
        path="/employee/*"
        element={
          <RoleBasedLayout allowedRoles={['employee']}>
            <Routes>
              <Route path="dashboard" element={<EmployeeDashboard />} />
              <Route path="attendance" element={<SignAttendance />} />
              <Route path="history" element={<AttendanceHistory />} />
              <Route path="profile" element={<Profile />} />
            </Routes>
          </RoleBasedLayout>
        }
      />

      <Route
        path="/"
        element={
          user ? (
            <Navigate to={`/${user.role}/dashboard`} replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
};

export default App;
